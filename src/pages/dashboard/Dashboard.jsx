import React, { useState } from "react";
import { useEffect } from "react";
import { MdHomeRepairService } from "react-icons/md";
import VoucherService from "../../APIServices/VoucherAPI";
import BarChart from "../../components/barChart/BarChart";
import DoughnutChart from "../../components/doughnutChart/DoughnutChart";
import HorizontalBarChart from "../../components/horizontalBarChart/HorizontalBarChart";
import LineChart from "../../components/lineChart/LineChart";
import PieChart from "../../components/pieChart/PieChart";
import "./dashboard.scss";

function Dashboard() {
  const [dashboardTopResponse, setDashboardTopResponse] = useState({});
  const [allServices, setAllServices] = useState(null);
  const [allItems, setAllItems] = useState(null);
  const [itemIncome, setItemIncome] = useState(true);
  const [options, setOptions] = useState("today");
  const [totalProfit, setTotalProfit] = useState(0);
  const [pieChartData, setPieChartData] = useState(null);
  const [horizontalBarChartData, setHorizontalBarChartData] = useState(null);
  const [weeklyChartData, setWeeklyChartData] = useState(null);

  useEffect(() => {
    const fetchVoucherWeeklyChart = async () => {
      const resp = await VoucherService.Get_VoucherWeeklyChart();

      setWeeklyChartData({
        labels: resp["Vouche Weekly Chart"].map((weekData) => {
          const newDateFormat = new Date(weekData["Date"])
            .toISOString()
            .split("T")[0];
          weekData.Date = newDateFormat;
          return weekData.Date;
        }),
        datasets: [
          {
            label: "Weekly Data",
            borderColor: "rgb(53, 162, 235)",
            data: resp?.["Vouche Weekly Chart"].map(
              (weekData) => weekData.Total
            ),
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(255, 159, 64, 0.5)",
              "rgba(255, 205, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(201, 203, 207, 0.5)",
            ],
          },
        ],
      });
    };

    const fetchGetSales = async () => {
      const resp = await VoucherService.GetSales(options);
      setHorizontalBarChartData({
        labels: resp?.gp_chart?.map((gpChart) => gpChart.Category),
        datasets: [
          {
            label: "General Purchase Breakdown",
            data: resp?.gp_chart?.map((gpChart) => gpChart.Total),
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(255, 159, 64, 0.5)",
              "rgba(255, 205, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(201, 203, 207, 0.5)",
            ],
          },
        ],
      });
      setPieChartData({
        labels: ["emp salary", "genearl purchases"],
        datasets: [
          {
            label: "Services",
            data: [resp["emp salary"], resp["general purchase"]],
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(255, 159, 64, 0.5)",
              "rgba(255, 205, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(201, 203, 207, 0.5)",
            ],
          },
        ],
      });
      setPieChartData({
        labels: ["emp salary", "genearl purchases"],
        datasets: [
          {
            label: "Services",
            data: [resp["emp salary"], resp["general purchase"]],
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(255, 159, 64, 0.5)",
              "rgba(255, 205, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(201, 203, 207, 0.5)",
            ],
          },
        ],
      });
      const filterdResponse = Object.keys(resp).filter(
        (key) =>
          key !== "emp salary" &&
          key !== "general purchase" &&
          key !== "gp_chart"
      );
      const newObj = {};
      filterdResponse.forEach((key) => {
        newObj[key] = resp[key];
      });
      setDashboardTopResponse(newObj);
    };

    const fetchItemProfit = async () => {
      const resp = await VoucherService.Get_ItemProfit(options);
      setTotalProfit(resp["item profit total"] + resp["service total"]);
      setAllServices({
        labels: resp?.service.map((ser) => ser.name),
        datasets: [
          {
            label: "Services",
            data: resp?.service.map((ser) => ser.price),
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(255, 159, 64, 0.5)",
              "rgba(255, 205, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(201, 203, 207, 0.5)",
            ],
          },
        ],
      });
      setAllItems({
        response: resp,
        itemResponse: {
          labels: resp?.item.map((itm) => itm.name),
          datasets: [
            {
              label: "Items",
              data: resp.item.map((itm) => itm.total_price),
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(255, 159, 64, 0.5)",
                "rgba(255, 205, 86, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(54, 162, 235, 0.5)",
                "rgba(153, 102, 255, 0.5)",
                "rgba(201, 203, 207, 0.5)",
              ],
            },
          ],
        },
      });
    };

    fetchVoucherWeeklyChart();
    fetchGetSales();
    fetchItemProfit();
  }, [options]);

  const switchHandle = () => {
    setItemIncome((prev) => !prev);
    itemIncome
      ? setAllItems((prev) => ({
          ...prev,
          itemResponse: {
            labels: prev?.response?.item.map((itm) => itm.name),
            datasets: [
              {
                label: "Items",
                data: prev.response.item.map((itm) => itm.profit),
                backgroundColor: [
                  "rgba(255, 99, 132, 0.5)",
                  "rgba(255, 159, 64, 0.5)",
                  "rgba(255, 205, 86, 0.5)",
                  "rgba(75, 192, 192, 0.5)",
                  "rgba(54, 162, 235, 0.5)",
                  "rgba(153, 102, 255, 0.5)",
                  "rgba(201, 203, 207, 0.5)",
                ],
              },
            ],
          },
        }))
      : setAllItems((prev) => ({
          ...prev,
          itemResponse: {
            labels: prev?.response?.item.map((itm) => itm.name),
            datasets: [
              {
                label: "Items",
                data: prev?.response?.item.map((itm) => itm.total_price),
                backgroundColor: [
                  "rgba(255, 99, 132, 0.5)",
                  "rgba(255, 159, 64, 0.5)",
                  "rgba(255, 205, 86, 0.5)",
                  "rgba(75, 192, 192, 0.5)",
                  "rgba(54, 162, 235, 0.5)",
                  "rgba(153, 102, 255, 0.5)",
                  "rgba(201, 203, 207, 0.5)",
                ],
              },
            ],
          },
        }));
  };

  return (
    <div className="dashboard_wrapper">
      <div className="filter-container">
        <div className="radio-container" onClick={() => setOptions("today")}>
          <p>Today</p>
          <input type="radio" checked={options === "today"} />
        </div>
        <div className="radio-container" onClick={() => setOptions("week")}>
          <p>Previous Week</p>
          <input type="radio" checked={options === "week"} />
        </div>
        <div className="radio-container" onClick={() => setOptions("month")}>
          <p>Month</p>
          <input type="radio" checked={options === "month"} />
        </div>
        <div className="radio-container" onClick={() => setOptions("all")}>
          <p>All</p>
          <input type="radio" checked={options === "all"} />
        </div>
      </div>
      <div className="dashboard_top">
        {Object?.keys(dashboardTopResponse).map((objKey, index) => (
          <div className="dashboard_count" key={index}>
            <div className="dashboard_countLeft">
              <p>{dashboardTopResponse[objKey]}</p>
              <h3>{objKey}</h3>
            </div>
            <MdHomeRepairService className="dashboard_countIcon" />
          </div>
        ))}
        <div className="dashboard_count">
          <div className="dashboard_countLeft">
            <p>{totalProfit}</p>
            <h3>Total Profit</h3>
          </div>
          <MdHomeRepairService className="dashboard_countIcon" />
        </div>
      </div>

      <>
        <div className="charts_wrapper">
          {allItems ? (
            <div className="chart_wrapper">
              <p>
                {itemIncome
                  ? allItems?.response["item total"]
                  : allItems?.response["item profit total"]}
              </p>
              <button
                onClick={() => {
                  switchHandle();
                }}
              >
                Switch
              </button>
              <DoughnutChart chartData={allItems?.itemResponse} />
              <h3>{itemIncome ? "Item Income" : "Item Profit"}</h3>
            </div>
          ) : null}
          {allServices ? (
            <div className="chart_wrapper">
              <BarChart chartData={allServices} />
            </div>
          ) : null}

          {pieChartData ? (
            <div className="chart_wrapper">
              <PieChart chartData={pieChartData} />
              <h3>Cost breakdown</h3>
            </div>
          ) : null}
          {horizontalBarChartData ? (
            <div className="chart_wrapper">
              <HorizontalBarChart chartData={horizontalBarChartData} />
            </div>
          ) : null}
        </div>
      </>

      {weeklyChartData ? (
        <div className="chart_wrapper_bottom">
          <LineChart chartData={weeklyChartData} />
        </div>
      ) : null}
    </div>
  );
}

export default Dashboard;

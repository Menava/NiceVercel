import React, { useState } from "react";
import { useEffect } from "react";
import { MdHomeRepairService } from "react-icons/md";
import VoucherService from "../../APIServices/VoucherAPI";
import BarChart from "../../components/barChart/BarChart";
import DoughnutChart from "../../components/doughnutChart/DoughnutChart";
import LineChart from "../../components/lineChart/LineChart";

import "./dashboard.scss";

function Dashboard() {
  const [dashboarDetails, setDashboardDetails] = useState(null);
  const [dashboardTopResponse, setDashboardTopResponse] = useState({});
  const [allServices, setAllServices] = useState(null);
  const [allItems, setAllItems] = useState(null);
  const [itemIncome, setItemIncome] = useState(true);
  const [options, setOptions] = useState("today");
  const [totalProfit, setTotalProfit] = useState(0);
  useEffect(() => {
    VoucherService.GetSales(options).then((resp) =>
      setDashboardTopResponse(resp)
    );
    VoucherService.Get_ItemProfit(options).then((resp) => {
      console.log(resp);
      setTotalProfit(resp["item profit total"] + resp["service total"]);
      setAllServices({
        labels: resp.service.map((ser) => ser.name),
        datasets: [
          {
            label: "Services",
            data: resp.service.map((ser) => ser.price),
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
          labels: resp.item.map((itm) => itm.name),
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
    });
  }, [options]);

  const switchHandle = () => {
    setItemIncome((prev) => !prev);

    itemIncome
      ? setAllItems((prev) => ({
          ...prev,
          itemResponse: {
            labels: prev.response.item.map((itm) => itm.name),
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
            labels: prev.response.item.map((itm) => itm.name),
            datasets: [
              {
                label: "Items",
                data: prev.response.item.map((itm) => itm.total_price),
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
      {allServices ? (
        <>
          {/* <div className="charts_wrapper">
            <div className="chart_wrapper">
              <LineChart chartData={allServices} />
              <h3>Monthly income</h3>
            </div>
            <div className="chart_wrapper">
              <BarChart chartData={allServices} />
              <h3>Monthly income</h3>
            </div>
          </div> */}
          <button
            onClick={() => {
              console.log("switchHandle");
              switchHandle();
            }}
          >
            Switch
          </button>
          <div className="charts_wrapper">
            <div className="chart_wrapper">
              <DoughnutChart chartData={allItems.itemResponse} />
              <h3>{itemIncome ? "Item Income" : "Item Profit"}</h3>
            </div>
            <div className="chart_wrapper">
              <DoughnutChart chartData={allServices} />
              <h3>Service Income</h3>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Dashboard;

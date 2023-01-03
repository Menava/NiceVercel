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
  const [allServices, setAllServices] = useState(null);
  const [allItems, setAllItems] = useState(null);
  const [itemIncome, setItemIncome] = useState(true);
  useEffect(() => {
    VoucherService.Get_ItemProfit().then((resp) => {
      console.log("resp", resp);
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
  }, []);

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
      <div className="dashboard_top">
        <div className="dashboard_count">
          <div className="dashboard_countLeft">
            <p>50000</p>
            <h3>Today Income</h3>
          </div>
          <MdHomeRepairService className="dashboard_countIcon" />
        </div>
        <div className="dashboard_count">
          <div className="dashboard_countLeft">
            <p>400+</p>
            <h3>Customer</h3>
          </div>
          <MdHomeRepairService className="dashboard_countIcon" />
        </div>
        <div className="dashboard_count">
          <div className="dashboard_countLeft">
            <p>400+</p>
            <h3>Customer</h3>
          </div>
          <MdHomeRepairService className="dashboard_countIcon" />
        </div>
        <div className="dashboard_count">
          <div className="dashboard_countLeft">
            <p>400+</p>
            <h3>Customer</h3>
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

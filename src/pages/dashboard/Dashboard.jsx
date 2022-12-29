import React, { useState } from "react";
import { MdHomeRepairService } from "react-icons/md";
import BarChart from "../../components/barChart/BarChart";
import DoughnutChart from "../../components/doughnutChart/DoughnutChart";
import LineChart from "../../components/lineChart/LineChart";

import "./dashboard.scss";

const monthlyData = [
  { month: "October", saleTotal: 70000000 },
  { month: "January", saleTotal: 30000000 },
  { month: "Febuary", saleTotal: 20000000 },
  { month: "March", saleTotal: 50000000 },
  { month: "Apirl", saleTotal: 90000000 },
  { month: "May", saleTotal: 170000000 },
  { month: "June", saleTotal: 80000000 },
];

function Dashboard() {
  const [monthlySales, setMonthlySales] = useState({
    labels: monthlyData.map((month) => month.month),
    datasets: [
      {
        label: "Monthly Income Graph",
        data: monthlyData.map((month) => month.saleTotal),
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
      <div className="charts_wrapper">
        <div className="chart_wrapper">
          <LineChart chartData={monthlySales} />
          <h3>Monthly income</h3>
        </div>
        <div className="chart_wrapper">
          <BarChart chartData={monthlySales} />
          <h3>Monthly income</h3>
        </div>
      </div>
      <div className="charts_wrapper">
        <div className="chart_wrapper">
          <BarChart chartData={monthlySales} />
          <h3>Monthly income</h3>
        </div>
        <div className="chart_wrapper">
          <DoughnutChart chartData={monthlySales} />
          <h3>Monthly income</h3>
        </div>
      </div>
      <div>hello</div>
    </div>
  );
}

export default Dashboard;

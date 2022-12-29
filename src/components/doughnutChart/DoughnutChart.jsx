import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function DoughnutChart({ chartData }) {
  const options = {
    responsive: true, // Make it responsive
    maintainAspectRatio: false,
  };

  return <Doughnut data={chartData} options={options} className="chart" />;
}

export default DoughnutChart;

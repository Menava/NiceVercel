import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData }) {
  const options = {
    responsive: true, // Make it responsive
    maintainAspectRatio: false,
  };
  return <Line data={chartData} options={options} className="chart" />;
}

export default LineChart;

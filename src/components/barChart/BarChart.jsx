import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartData }) {
  const options = {
    responsive: true, // Make it responsive
    maintainAspectRatio: false,
  };

  return <Bar data={chartData} options={options} className="chart" />;
}

export default BarChart;

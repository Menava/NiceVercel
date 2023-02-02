import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartData }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ffffff",
        },
      },
    },
    scales: {
      yAxes: {
        ticks: {
          color: "#ffffff",
        },
      },
      xAxes: {
        ticks: {
          color: "#ffffff",
        },
      },
    },
  };
  return <Bar data={chartData} options={options} className="chart" />;
}

export default BarChart;

import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData }) {
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
  return <Line data={chartData} options={options} className="chart" />;
}

export default LineChart;

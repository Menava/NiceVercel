import React from "react";
import { Bar } from "react-chartjs-2";

function HorizontalBarChart({ chartData }) {
  const options = {
    indexAxis: "y",
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

export default HorizontalBarChart;

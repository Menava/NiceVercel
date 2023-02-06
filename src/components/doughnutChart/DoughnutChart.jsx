import React from "react";
import { Doughnut } from "react-chartjs-2";

function DoughnutChart({ chartData }) {
  const options = {
    responsive: true, // Make it responsive
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: "white",
        },
      },
    },
  };

  return <Doughnut data={chartData} options={options} className="chart" />;
}

export default DoughnutChart;

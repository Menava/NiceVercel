import React from "react";
import { Pie } from "react-chartjs-2";

function PieChart({ chartData }) {
  const options = {
    responsive: true, // Make it responsive
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
  };

  return <Pie data={chartData} options={options} className="chart" />;
}

export default PieChart;

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./index.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  scales: {
    x: {
      type: "category", // Specify 'category' scale for X-axis
    },
  },
};

type PropsT = {
  symbol?: string;
  chartData: any;
};

const StockChart = ({ symbol, chartData }: PropsT) => {
  return (
    <>
      {chartData ? (
        // @ts-ignore
        <Line options={options} data={chartData} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default StockChart;

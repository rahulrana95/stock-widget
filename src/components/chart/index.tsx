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
import dummyResponse from "./data.json";

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
};

const StockChart = ({ symbol }: PropsT) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = dummyResponse;
      const chartData = parseData(data);
      // @ts-ignore
      setChartData(chartData);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };
  // @ts-ignore
  const parseData = (data) => {
    const timestamps = data.chart.result[0].timestamp;
    const prices = data.chart.result[0].indicators.quote[0].close;

    const chartData = {
      // @ts-ignore
      labels: timestamps.map((ts) => new Date(ts).getMinutes()),
      datasets: [
        {
          label: "Stock Price",
          data: prices,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          cubicInterpolationMode: "monotone", // Apply cubic interpolation
          pointRadius: 0, // Disable point markers
          pointHoverRadius: 20, // Disable point markers on hover
        },
      ],
    };

    return chartData;
  };

  return (
    <div>
      {chartData ? (
        // @ts-ignore
        <Line options={options} data={chartData} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default StockChart;

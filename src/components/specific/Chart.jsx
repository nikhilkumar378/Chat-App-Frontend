/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { purple } from "@mui/material/colors";
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
} from "chart.js";
import React from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { getLast7Days } from "../../lib/features";
import { purpleLight } from "../constants/color";

ChartJS.register(
  CategoryScale,
  Tooltip,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  
);

const labels = getLast7Days();

const lineChartoptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },

    title: {
      display: false,
    },
  },

  scales: {
    x: {
      grid: {
        display: false,
      },
    },

    y: {
      beginAtzero: true,
      grid: {
        display: false,
      },
    },
  },
};

const LineChart = ({ value = [] }) => {
  const data = {
    labels,

    datasets: [
      {
        data: value,
        label: "Messages",
        fill: true,
        backgroundColor: purpleLight,
        borderColor: purple,
      },
    ],
  };

  return <Line data={data} options={lineChartoptions} />;
};

const doughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },

   
  },
  cutout: 120,
};

const DoughnutChart = ({ value = [], labels = [] }) => {
  // const data = {
  //   labels:["Single Chat", "Group Chat"],

  //   datasets: [
  //     {
  //       data: [23,24],
  //       label: "Total Chats vs Group Chats",

  //       backgroundColor: [purpleLight, orange],
  //       borderColor: [purple, orange],
  //     }
  //   ],
  // };

  const data = {
    labels: ["Single Chat", "Group Chat"],
    datasets: [
      {
        label: "Total Chats Vs Group Chats",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <Doughnut
      data={data}
      options={doughnutChartOptions}
      style={{ zIndex: 10 }}
    />
  );
};

export { DoughnutChart, LineChart };


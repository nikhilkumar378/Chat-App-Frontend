/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  plugins,
  
} from "chart.js";
import { orange, purple } from "@mui/material/colors";
import { purpleLight } from "../constants/color";
import { getLast7Days } from "../../lib/features";

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
  plugins

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
        label: "Revenue",
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
  plugins:{
    legend:{
      display :false
    },

    title:{
      display: false
    }
  }, 
  cutout: 120
}




const DoughnutChart = ({ value=[], labels=[] }) => {
 
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
    labels: [
      'Single Chat',
      'Group Chat',
    ],
    datasets: [{
      label: 'Total Chats Vs Group Chats',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  return <Doughnut data={data}  options={doughnutChartOptions}   style={{zIndex:10}} />
};

export { LineChart, DoughnutChart };

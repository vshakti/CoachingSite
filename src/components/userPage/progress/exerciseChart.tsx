"use client";

import { useTrackingExerciseContext } from "@/lib/context/exerciseTracking";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { useState } from "react";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
);

const ExerciseChart = () => {
  const { trackedExercise } = useTrackingExerciseContext();
  const [timeRange, setTimeRange] = useState("30days");

  const parseDate = (dateString: any) => {
    const [day, month, yearAndTime] = dateString.split("/");
    const [year, time] = yearAndTime.split(" ");
    const [hour, minute, second] = time.split(":");
    const [secondPart] = second.split(",");

    return new Date(year, month - 1, day, hour, minute, secondPart);
  };

  const formatDate = (date: any) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const filterDataByTimeRange = (data: any, range: any) => {
    const now = new Date();
    let startDate;

    switch (range) {
      case "30days":
        startDate = new Date(now.setDate(now.getDate() - 30));
        break;
      case "6months":
        startDate = new Date(now.setMonth(now.getMonth() - 6));
        break;
      case "alltime":
        return data;
      default:
        return data;
    }

    return data.filter((d: any) => parseDate(d.trainingDay) >= startDate);
  };

  const filteredProgression = filterDataByTimeRange(
    trackedExercise.exerciseProgression,
    timeRange,
  );

  const labels = filteredProgression.map((p: any) =>
    formatDate(parseDate(p.trainingDay)),
  );
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Top Weight",
        data: filteredProgression.map((p: any) => Math.max(...p.weight)),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 1)",
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const dayData = filteredProgression[context.dataIndex];

            const weights = dayData.weight.join(", ");
            const feedback = dayData.feedback || "No feedback available";

            return [`Weights: ${weights}`, `Feedback: ${feedback}`];
          },
        },
      },
    },
    hover: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
          color: "#9ca5a7",
          font: {
            size: 16,
          },
        },
        ticks: {
          color: "#9ca5a7",
        },
      },
      y: {
        title: {
          display: true,
          text: "Weight",
          color: "#9ca5a7",
          font: {
            size: 16,
          },
        },
        ticks: {
          color: "#9ca5a7",
        },
      },
    },
    layout: {
      padding: 20,
    },
    responsive: true,
  };

  return (
    <div className="flex flex-col items-center justify-between gap-4 p-3">
      <div className="flex w-full flex-row items-center justify-center gap-5 bg-gradient-to-r from-zinc-950/0 via-zinc-950/75 to-zinc-950/0 p-2">
        <button
          className={`rounded-md px-10 py-1 ${
            timeRange === "30days" && trackedExercise.exerciseProgression.length
              ? "bg-gradient-to-r from-neutral-950/0 via-cyan-600 to-neutral-950/0 text-white"
              : "bg-gradient-to-r from-zinc-950/0 via-neutral-950 to-zinc-950/0 text-neutral-500"
          }`}
          onClick={() => setTimeRange("30days")}
        >
          30 D
        </button>
        <button
          className={`px-10 py-1 ${
            timeRange === "6months"
              ? "bg-gradient-to-r from-neutral-950/0 via-cyan-600 to-neutral-950/0 text-white"
              : "bg-gradient-to-r from-zinc-950/0 via-neutral-950 to-zinc-950/0 text-neutral-500"
          }`}
          onClick={() => setTimeRange("6months")}
        >
          6 M
        </button>
        <button
          className={`px-10 py-1 ${
            timeRange === "alltime"
              ? "bg-gradient-to-r from-neutral-950/0 via-cyan-600 to-neutral-950/0 text-white"
              : "bg-gradient-to-r from-zinc-950/0 via-neutral-950 to-zinc-950/0 text-neutral-500"
          }`}
          onClick={() => setTimeRange("alltime")}
        >
          MAX
        </button>
      </div>
      <div className="h-max w-5/6 bg-gradient-to-r from-zinc-950/0 via-zinc-950/75 to-zinc-950/0">
        {!filteredProgression.length ? (
          <Line data={data} options={options} className="opacity-35" />
        ) : (
          <Line data={data} options={options} className="h-96" />
        )}
      </div>
    </div>
  );
};

export default ExerciseChart;

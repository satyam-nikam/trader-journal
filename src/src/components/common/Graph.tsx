"use client";

import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type GraphType = "line" | "bar" | "area" | "pie" | "donut";

interface GraphProps {
  type?: GraphType;
  series: any[];
  options?: Record<string, any>;
  height?: number | string;
  className?: string;
}

export default function Graph({
  type = "line",
  series,
  options,
  height = 320,
  className = "",
}: GraphProps) {
  const mergedOptions = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: "#94a3b8",
      background: "transparent",
      sparkline: { enabled: false },
    },
    colors: ["#22c55e", "#f59e0b", "#38bdf8", "#a78bfa"],
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth" as const,
      width: type === "bar" ? 0 : 2,
    },
    grid: {
      borderColor: "rgba(148, 163, 184, 0.16)",
      strokeDashArray: 4,
    },
    legend: {
      labels: { colors: "#cbd5e1" },
    },
    tooltip: {
      theme: "dark" as const,
    },
    xaxis: {
      labels: {
        style: { colors: "#94a3b8" },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: "#94a3b8" },
      },
    },
    fill: {
      type: "gradient" as const,
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.25,
        stops: [0, 100],
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "48%",
        borderRadius: 8,
      },
    },
    ...options,
  };

  return (
    <div className={className}>
      <ApexChart
        type={type}
        series={series}
        options={mergedOptions}
        height={height}
      />
    </div>
  );
}

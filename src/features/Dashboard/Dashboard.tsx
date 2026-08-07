"use client";

import { useMemo, useState } from "react";
import { FiArrowUpRight, FiArrowDownRight, FiDollarSign, FiBarChart2, FiTrendingUp, FiTarget, FiShield } from "react-icons/fi";
import Graph from "@/components/common/Graph";
import useUserStore from "@/store/UserStore";
import { useGetDashboardData } from "@/hooks/useDashboard";

const FILTERS = [
  { key: "10trades", label: "Last 10 trades" },
  { key: "30trades", label: "Last 30 trades" },
  { key: "30days", label: "Last 30 days trades" },
  { key: "3months", label: "Last 3 months trades" },
  { key: "6months", label: "Last 6 months trades" },
  { key: "1year", label: "Last 1 year trades" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

type TradePoint = {
  label: string;
  pnl: number;
  winRate: number;
  risk: number;
};

const analyticsData: Record<FilterKey, { stats: Record<string, any>; chartData: TradePoint[] }> = {
  "10trades": {
    stats: {
      profitableTrades: 7,
      lossTrades: 3,
      capitalUsed: 12500,
      netPnL: 1840,
      bestTrade: { amount: 3200, percent: 26.4 },
      worstTrade: { amount: -1180, percent: -9.8 },
      streak: { value: 4, type: "winning" },
    },
    chartData: [
      { label: "T1", pnl: 420, winRate: 62, risk: 1.2 },
      { label: "T2", pnl: -180, winRate: 41, risk: 1.8 },
      { label: "T3", pnl: 930, winRate: 74, risk: 1.1 },
      { label: "T4", pnl: 310, winRate: 69, risk: 1.3 },
      { label: "T5", pnl: -250, winRate: 38, risk: 1.9 },
      { label: "T6", pnl: 760, winRate: 72, risk: 1.05 },
      { label: "T7", pnl: 540, winRate: 66, risk: 1.2 },
      { label: "T8", pnl: 120, winRate: 59, risk: 1.4 },
      { label: "T9", pnl: -420, winRate: 33, risk: 2.1 },
      { label: "T10", pnl: 880, winRate: 78, risk: 1.0 },
    ],
  },
  "30trades": {
    stats: {
      profitableTrades: 19,
      lossTrades: 11,
      capitalUsed: 38200,
      netPnL: 5120,
      bestTrade: { amount: 6120, percent: 31.2 },
      worstTrade: { amount: -2140, percent: -12.4 },
      streak: { value: 6, type: "winning" },
    },
    chartData: [
      { label: "W1", pnl: 680, winRate: 63, risk: 1.4 },
      { label: "W2", pnl: -220, winRate: 45, risk: 1.7 },
      { label: "W3", pnl: 950, winRate: 71, risk: 1.1 },
      { label: "W4", pnl: 1100, winRate: 76, risk: 1.0 },
      { label: "W5", pnl: -360, winRate: 37, risk: 2.0 },
      { label: "W6", pnl: 720, winRate: 67, risk: 1.3 },
      { label: "W7", pnl: 430, winRate: 61, risk: 1.5 },
      { label: "W8", pnl: 1500, winRate: 81, risk: 0.9 },
      { label: "W9", pnl: -600, winRate: 29, risk: 2.3 },
      { label: "W10", pnl: 890, winRate: 73, risk: 1.2 },
    ],
  },
  "30days": {
    stats: {
      profitableTrades: 14,
      lossTrades: 6,
      capitalUsed: 24800,
      netPnL: 3380,
      bestTrade: { amount: 4860, percent: 24.7 },
      worstTrade: { amount: -1620, percent: -10.9 },
      streak: { value: 3, type: "losing" },
    },
    chartData: [
      { label: "D1", pnl: 410, winRate: 60, risk: 1.3 },
      { label: "D2", pnl: 560, winRate: 68, risk: 1.1 },
      { label: "D3", pnl: -180, winRate: 46, risk: 1.7 },
      { label: "D4", pnl: 730, winRate: 72, risk: 1.0 },
      { label: "D5", pnl: 220, winRate: 64, risk: 1.2 },
      { label: "D6", pnl: -330, winRate: 41, risk: 2.0 },
      { label: "D7", pnl: 890, winRate: 79, risk: 0.95 },
      { label: "D8", pnl: 640, winRate: 70, risk: 1.1 },
      { label: "D9", pnl: -210, winRate: 39, risk: 1.9 },
      { label: "D10", pnl: 1020, winRate: 83, risk: 0.9 },
    ],
  },
  "3months": {
    stats: {
      profitableTrades: 41,
      lossTrades: 22,
      capitalUsed: 73000,
      netPnL: 9340,
      bestTrade: { amount: 7820, percent: 34.5 },
      worstTrade: { amount: -2940, percent: -15.2 },
      streak: { value: 5, type: "winning" },
    },
    chartData: [
      { label: "M1", pnl: 520, winRate: 61, risk: 1.4 },
      { label: "M2", pnl: 840, winRate: 69, risk: 1.2 },
      { label: "M3", pnl: -290, winRate: 44, risk: 1.8 },
      { label: "M4", pnl: 1280, winRate: 78, risk: 1.0 },
      { label: "M5", pnl: 610, winRate: 66, risk: 1.3 },
      { label: "M6", pnl: -440, winRate: 35, risk: 2.2 },
      { label: "M7", pnl: 970, winRate: 74, risk: 1.1 },
      { label: "M8", pnl: 1080, winRate: 75, risk: 1.0 },
      { label: "M9", pnl: -220, winRate: 49, risk: 1.8 },
      { label: "M10", pnl: 1420, winRate: 82, risk: 0.95 },
    ],
  },
  "6months": {
    stats: {
      profitableTrades: 73,
      lossTrades: 41,
      capitalUsed: 121000,
      netPnL: 14680,
      bestTrade: { amount: 9980, percent: 38.1 },
      worstTrade: { amount: -4120, percent: -18.4 },
      streak: { value: 7, type: "winning" },
    },
    chartData: [
      { label: "J1", pnl: 760, winRate: 64, risk: 1.3 },
      { label: "J2", pnl: 990, winRate: 70, risk: 1.2 },
      { label: "J3", pnl: -310, winRate: 43, risk: 1.9 },
      { label: "J4", pnl: 1320, winRate: 79, risk: 1.0 },
      { label: "J5", pnl: 850, winRate: 68, risk: 1.2 },
      { label: "J6", pnl: -480, winRate: 37, risk: 2.1 },
      { label: "J7", pnl: 1140, winRate: 77, risk: 1.05 },
      { label: "J8", pnl: 1210, winRate: 80, risk: 0.98 },
      { label: "J9", pnl: -360, winRate: 40, risk: 2.0 },
      { label: "J10", pnl: 1480, winRate: 84, risk: 0.92 },
    ],
  },
  "1year": {
    stats: {
      profitableTrades: 132,
      lossTrades: 87,
      capitalUsed: 215000,
      netPnL: 24210,
      bestTrade: { amount: 12850, percent: 42.6 },
      worstTrade: { amount: -6030, percent: -21.5 },
      streak: { value: 8, type: "winning" },
    },
    chartData: [
      { label: "Y1", pnl: 890, winRate: 66, risk: 1.2 },
      { label: "Y2", pnl: 1180, winRate: 71, risk: 1.1 },
      { label: "Y3", pnl: -410, winRate: 41, risk: 1.9 },
      { label: "Y4", pnl: 1560, winRate: 81, risk: 0.96 },
      { label: "Y5", pnl: 980, winRate: 69, risk: 1.15 },
      { label: "Y6", pnl: -520, winRate: 38, risk: 2.0 },
      { label: "Y7", pnl: 1360, winRate: 77, risk: 1.02 },
      { label: "Y8", pnl: 1440, winRate: 79, risk: 0.99 },
      { label: "Y9", pnl: -380, winRate: 43, risk: 1.85 },
      { label: "Y10", pnl: 1620, winRate: 85, risk: 0.9 },
    ],
  },
};

const statCards = [
  { key: "profitableTrades", title: "Profitable trades", icon: FiTrendingUp, accent: "from-emerald-500 to-lime-500", textColor: "text-emerald-600" },
  { key: "lossTrades", title: "Loss trades", icon: FiArrowDownRight, accent: "from-rose-500 to-orange-500", textColor: "text-rose-600" },
  { key: "capitalUsed", title: "Capital used", icon: FiDollarSign, accent: "from-sky-500 to-cyan-500", textColor: "text-sky-600" },
  { key: "netPnL", title: "Net profit / loss", icon: FiBarChart2, accent: "from-violet-500 to-fuchsia-500", textColor: "text-violet-600" },
  { key: "bestTrade", title: "Best trade", icon: FiTarget, accent: "from-amber-500 to-yellow-500", textColor: "text-amber-600" },
  { key: "worstTrade", title: "Worst trade", icon: FiShield, accent: "from-slate-600 to-slate-500", textColor: "text-slate-600" },
  { key: "streak", title: "Current streak", icon: FiArrowUpRight, accent: "from-indigo-500 to-blue-500", textColor: "text-indigo-600" },
] as const;

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Dashboard() {
  const { UserID } = useUserStore();
  const { data: dashboardData, isPending: isLoadingDashboard, refetch } = useGetDashboardData({ userId: UserID, startDate: "2026-01-01", endDate: "2026-12-31", tradeCount: 10 });
  const [selectedFilter, setSelectedFilter] = useState<FilterKey>("30days");
  console.log("Dashboard data from API:", dashboardData);

  const currentData = useMemo(() => analyticsData[selectedFilter], [selectedFilter]);

  const pnlSeries = [{
    name: "P/L",
    data: currentData.chartData.map((item) => item.pnl),
  }];

  const winSeries = [{
    name: "Win rate",
    data: currentData.chartData.map((item) => item.winRate),
  }];

  const riskSeries = [{
    name: "Risk",
    data: currentData.chartData.map((item) => item.risk),
  }];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_32%),linear-gradient(135deg,#f8fbff_0%,#f5f7fb_100%)] p-4 sm:p-6 lg:p-6">
      <div className="flex flex-col gap-6">
        <header className="rounded-3xl border border-slate-200/80 bg-violet-300 p-5 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.2)] backdrop-blur sm:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="w-[35%]">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Trader Analytics</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Performance overview</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Review your recent trading pulse with a polished snapshot of P/L, risk, streaks, and momentum.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 w-[65%]">
              {FILTERS.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setSelectedFilter(filter.key)}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition-all ${selectedFilter === filter.key
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => {
            const value = currentData.stats[card.key as keyof typeof currentData.stats];
            const renderValue = () => {
              if (card.key === "capitalUsed") return formatCurrency(value as number);
              if (card.key === "bestTrade" || card.key === "worstTrade") {
                const trade = value as { amount: number; percent: number };
                return (
                  <div className="flex flex-col gap-1">
                    <span className="text-lg font-semibold text-slate-900">{formatCurrency(trade.amount)}</span>
                    <span className="text-sm text-slate-500">{trade.percent}%</span>
                  </div>
                );
              }
              if (card.key === "streak") {
                const streak = value as { value: number; type: string };
                return (
                  <div className="flex flex-col gap-1">
                    <span className="text-lg font-semibold text-slate-900">{streak.value} {streak.type}</span>
                    <span className="text-sm text-slate-500">trades in a row</span>
                  </div>
                );
              }
              if (card.key === "netPnL") {
                const pnl = value as number;
                const isPositive = pnl >= 0;
                return (
                  <div className={`flex items-center gap-1 text-lg font-semibold ${isPositive ? "text-emerald-600" : "text-rose-600"}`}>
                    {isPositive ? <FiArrowUpRight /> : <FiArrowDownRight />}
                    {formatCurrency(pnl)}
                  </div>
                );
              }
              return <span className="text-lg font-semibold text-slate-900">{value as number}</span>;
            };

            const Icon = card.icon;
            return (
              <div key={card.key} className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-base text-slate-800 font-semibold">{card.title}</p>
                    <div className="mt-3">{renderValue()}</div>
                  </div>
                  <div className={`rounded-2xl bg-linear-to-br ${card.accent} p-3 text-white`}>
                    <Icon size={20} />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Profit / loss trend</h2>
                <p className="text-sm text-slate-500">Bar chart for realized P/L across the selected window.</p>
              </div>
              <div className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">Live mock data</div>
            </div>
            <Graph
              type="bar"
              series={pnlSeries}
              options={{
                chart: { id: "pnl-chart" },
                xaxis: { categories: currentData.chartData.map((item) => item.label) },
                title: { text: "Amount (USD)", align: "left" as const },
                colors: ["#10b981"],
              }}
              height={320}
            />
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Win rate pulse</h2>
              <p className="text-sm text-slate-500">Momentum and consistency are reflected in this trend line.</p>
            </div>
            <Graph
              type="line"
              series={winSeries}
              options={{
                chart: { id: "win-rate-chart" },
                xaxis: { categories: currentData.chartData.map((item) => item.label) },
                title: { text: "Win rate (%)", align: "left" as const },
                colors: ["#6366f1"],
              }}
              height={320}
            />
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Risk profile</h2>
              <p className="text-sm text-slate-500">A quick look at the average risk per trade for the active selection.</p>
            </div>
            <Graph
              type="area"
              series={riskSeries}
              options={{
                chart: { id: "risk-chart" },
                xaxis: { categories: currentData.chartData.map((item) => item.label) },
                title: { text: "Risk factor", align: "left" as const },
                colors: ["#f59e0b"],
              }}
              height={280}
            />
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-linear-to-br from-slate-900 via-slate-800 to-indigo-900 p-5 text-white shadow-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_40%)]" />
            <div className="relative">
              <h2 className="text-lg font-semibold">Signal summary</h2>
              <p className="mt-2 text-sm text-slate-300">A compact summary of the selected analytics window.</p>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm">
                  <span className="text-sm text-slate-300">Win / loss mix</span>
                  <span className="font-semibold">{currentData.stats.profitableTrades} / {currentData.stats.lossTrades}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm">
                  <span className="text-sm text-slate-300">Average trade size</span>
                  <span className="font-semibold">{formatCurrency(Math.round(currentData.stats.capitalUsed / Math.max(currentData.stats.profitableTrades + currentData.stats.lossTrades, 1)))}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm">
                  <span className="text-sm text-slate-300">Momentum</span>
                  <span className="font-semibold capitalize">{currentData.stats.streak.type}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

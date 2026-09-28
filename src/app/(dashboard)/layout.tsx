"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MainContent from "@/components/layout/MainContent";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import useUserStore from "@/store/UserStore";
import CalculatorWidget from "@/components/common/TradingCalculator/CalculatorWidget";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { UserID } = useUserStore();

  useEffect(() => {
    if (UserID <= 0) {
      router.replace("/login");
    }
  }, [UserID, router]);

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      <Sidebar />
      <Navbar />
      {UserID > 0 && <CalculatorWidget />}

      <MainContent>{children}</MainContent>
    </div>
  );
}
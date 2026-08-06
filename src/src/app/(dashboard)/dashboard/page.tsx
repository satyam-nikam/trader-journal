"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "@/features/Dashboard/Dashboard";
import useUserStore from "@/store/UserStore";

export default function DashboardPage() {
  const router = useRouter();
  const { UserID } = useUserStore();

  useEffect(() => {
    if (UserID <= 0) {
      router.replace("/login");
    }
  }, [UserID, router]);

  return <Dashboard />;
}

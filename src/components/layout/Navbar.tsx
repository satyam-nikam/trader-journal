"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { IoChevronDown } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import useUserStore from "@/store/UserStore";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { resetUser } = useUserStore();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  const menuList = [
    { name: "Analytics", url: "/dashboard" },
    { name: "Trades", url: "/trades" },
    { name: "Strategies", url: "/strategies" },
    { name: "Rule Book", url: "/rulebook" },
  ];

  const getActiveMenuName = () => {
    const active = menuList.find(
      (item) => pathname === item.url || pathname.startsWith(`${item.url}/`),
    );
    return active?.name || "Overview";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = async () => {
    setIsProfileMenuOpen(false);
    resetUser();
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
  };

  return (
    <header className="fixed left-64 right-0 top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-5 py-1">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            Workspace
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">
            {getActiveMenuName()}
          </h1>
        </div>

        <div className="relative" ref={profileMenuRef}>
          <button
            type="button"
            onClick={() => setIsProfileMenuOpen((prev) => !prev)}
            className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-900 px-2 py-2 text-white shadow-sm transition hover:shadow-md"
          >
            <Image
              src="/cat.png"
              alt="Profile"
              width={36}
              height={36}
              className="h-8 w-8 rounded-full border border-slate-700 object-cover"
            />
            <div className="pr-1 text-left">
              <p className="text-sm font-semibold">User Name</p>
              <p className="text-xs text-slate-400">Premium trader</p>
            </div>
            <IoChevronDown
              size={18}
              className={`transition-transform ${
                isProfileMenuOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 top-14 w-72 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                <div className="flex items-center gap-3">
                  <Image
                    src="/cat.png"
                    alt="Profile"
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full border border-slate-200 object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">User Name</p>
                    <p className="text-sm text-slate-500">user@example.com</p>
                  </div>
                </div>
                <div className="mt-3 rounded-xl bg-white p-3 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Account
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    Pro Trader Plan
                  </p>
                  <p className="text-sm text-slate-500">Last sync 2 mins ago</p>
                </div>
              </div>

              <button
                type="button"
                onClick={logout}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <MdLogout size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

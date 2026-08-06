"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IoBarChartOutline,
  IoDocumentTextOutline,
  IoLayersOutline,
  IoSwapHorizontalOutline,
} from "react-icons/io5";

export default function Sidebar() {
  const pathname = usePathname();

  const menuList = [
    {
      name: "Analytics",
      url: "/dashboard",
      icon: <IoBarChartOutline size={18} />,
    },
    {
      name: "Trades",
      url: "/trades",
      icon: <IoSwapHorizontalOutline size={18} />,
    },
    {
      name: "Strategies",
      url: "/strategies",
      icon: <IoLayersOutline size={18} />,
    },
    {
      name: "Rule Book",
      url: "/rulebook",
      icon: <IoDocumentTextOutline size={18} />,
    },
  ];

  const isActiveLink = (url: string) => {
    return pathname === url || pathname.startsWith(`${url}/`);
  };

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-200 bg-slate-950 text-slate-100 shadow-[10px_0_30px_rgba(15,23,42,0.12)]">
      <div className="border-b border-slate-800/80 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 text-sm font-semibold shadow-lg">
            TJ
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide text-white">
              Trader Journal
            </p>
            <p className="text-xs text-slate-400">Track smart. Trade calm.</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-3 py-5">
        <div className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
          Navigation
        </div>
        <nav className="flex flex-col gap-2">
          {menuList.map((item) => {
            const active = isActiveLink(item.url);
            return (
              <Link
                key={item.name}
                href={item.url}
                className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                    active ? "bg-slate-900 text-white" : "bg-slate-900/70 text-slate-300"
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-800/80 p-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Today
          </p>
          <p className="mt-1 text-sm font-semibold text-white">Focus on discipline</p>
          <p className="mt-1 text-sm text-slate-400">
            Keep your rules visible and your trades review-ready.
          </p>
        </div>
      </div>
    </aside>
  );
}

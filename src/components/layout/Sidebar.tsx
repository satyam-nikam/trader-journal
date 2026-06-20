"use client";

import Link from "next/link";

export default function Sidebar() {

  const menuList = [
    {
      name: "Analytics",
      url: "/dashboard",
    },
    {
      name: "Trades",
      url: "/trades",
    },
    {
      name: "Strategies",
      url: "/strategies",
    },
    {
      name: "Rule Book",
      url: "/rulebook",
    },
  ];
  return (
    <aside className="w-64 bg-[#ffffff] h-screen fixed left-0 top-0 shadow-sm border-r border-gray-200 z-50">
      <nav className="h-16 border-b border-gray-200 shadow-sm p-2 items-center flex justify-center">
        <h1 className="text-2xl font-bold text-center text-[#2c2c2c]">
          Trader Journal
        </h1>
      </nav>
      <div className="h-full p-4 flex flex-col gap-5">
        {menuList.map((item) => (
          <Link
            key={item.name}
            href={item.url}
            className="flex items-center gap-2 font-semibold text-[#2c2c2c]"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </aside>
  );
}

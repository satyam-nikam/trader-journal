"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";

export default function Navbar() {
  const pathname = usePathname();

  const menuList = [
    { name: "Analytics", url: "/dashboard" },
    { name: "Trades", url: "/trades" },
    { name: "Strategies", url: "/strategies" },
    { name: "Rule Book", url: "/rulebook" },
  ];

  const getActiveMenuName = () => {
    const active = menuList.find(item => pathname === item.url || pathname.startsWith(item.url + "/"));
    return active?.name || "";
  };

  return (
    <header className="w-auto h-16 bg-[#ffffff] shadow-sm border-b border-gray-200 fixed top-0 left-64 right-0 z-40">
      <div className="flex items-center justify-between h-full px-4 py-1">
        <h1 className="font-bold text-2xl text-[#2c2c2c]">{getActiveMenuName()}</h1>
        <div className="flex items-center gap-1">
            <div className="flex items-center gap-2 bg-[#2c2c2c] px-3 py-2 rounded-full">
          <Image
            src="/cat.png"
            alt="Profile"
            width={36}
            height={36}
            className="w-8 h-8 rounded-full"
          />
          <h2 className="text-[#ffffff] font-semibold text-base">User Name</h2>
        </div>
        <div className="bg-[#2c2c2c] px-3 py-3 rounded-full"><IoIosArrowDown color="#ffffff" size={20}/></div>
        </div>
      </div>
    </header>
  );
}

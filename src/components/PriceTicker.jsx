"use client";
import Marquee from "react-fast-marquee";
import { toBn } from "@/lib/utils";

export default function PriceTicker({ products }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="bg-gray-50 border-b border-gray-200 py-2">
      <Marquee pauseOnHover={true} speed={40} gradient={false}>
        {products.map((item, index) => (
          <div key={index} className="inline-flex items-center gap-2 text-xs font-medium text-gray-700 mx-6">
            <span>{item.icon || "🛒"}</span>
            <span>{item.name}</span>
            <span>{toBn(item.price)} টাকা/{item.unit?.replace("প্রতি ", "") || "কেজি"}</span>
            <span className={item.change > 0 ? "text-red-500" : item.change < 0 ? "text-green-600" : "text-gray-400"}>
              {item.change > 0 ? "▲" : item.change < 0 ? "▼" : "—"} {toBn(Math.abs(item.change || 0))}%
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
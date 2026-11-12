"use client";
import Marquee from "react-fast-marquee";
import { toBn } from "@/lib/utils";

export default function PriceTicker({ products }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-xl py-2 px-3">
      <Marquee pauseOnHover speed={45}>
        {products.map((p) => {
          const pct = p.change?.pct || 0;
          const isUp = pct > 0;
          const isDown = pct < 0;
          return (
            <span key={p.id} className="mx-4 text-xs flex items-center gap-1.5">
              <span>{p.image}</span>
              <span className="font-semibold text-gray-800">{p.nameBn}:</span>
              <span className="font-bold text-green-800">{toBn(p.today)}৳</span>
              <span className={isUp ? "text-red-600" : isDown ? "text-green-600" : "text-gray-400"}>
                ({isUp ? "▲" : isDown ? "▼" : "—"} {toBn(Math.abs(pct))}%)
              </span>
            </span>
          );
        })}
      </Marquee>
    </div>
  );
}
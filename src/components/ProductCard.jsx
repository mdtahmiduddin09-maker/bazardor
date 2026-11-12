import Link from "next/link";
import { toBn } from "@/lib/utils";

export default function ProductCard({ product }) {
  const isUp = product.change > 0;
  const isDown = product.change < 0;

  return (
    <Link
      href={`/product/${product.id || product._id}`}
      className="bg-white rounded-2xl p-4 border border-gray-200 hover:shadow-md transition flex flex-col justify-between"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          {product.icon || "🧺"}
        </div>
        <div>
          <h3 className="font-bold text-gray-900">{product.name}</h3>
          <p className="text-xs text-gray-500">{product.unit || "প্রতি কেজি"}</p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-end justify-between">
        <div>
          <span className="text-xs text-gray-400 block">আজকের দাম</span>
          <span className="text-lg font-bold text-gray-900">{toBn(product.price)} টাকা</span>
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded ${
            isUp ? "text-red-600 bg-red-50" : isDown ? "text-green-700 bg-green-50" : "text-gray-500 bg-gray-100"
          }`}
        >
          <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
          <span>{toBn(Math.abs(product.change || 0))}%</span>
        </div>
      </div>
    </Link>
  );
}
"use client";
import { useEffect, useState } from "react";
import PriceTicker from "@/components/PriceTicker";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const topRisers = [...products].filter((p) => p.change > 0).sort((a, b) => b.change - a.change).slice(0, 6);
  const topFallers = [...products].filter((p) => p.change < 0).sort((a, b) => a.change - b.change).slice(0, 6);

  return (
    <div>
      <PriceTicker products={products} />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        <section className="bg-green-50 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between border border-green-100">
          <div className="max-w-lg space-y-4">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
              মঙ্গলবার, ৬ অক্টোবর, ২০২৬
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              আজকের বাজারের দাম এক নজরে
            </h2>
            <p className="text-gray-600 text-sm">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <div>
              <a
                href="#সব-পণ্য"
                className="inline-block px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-medium text-sm rounded-xl"
              >
                সব পণ্য দেখুন
              </a>
            </div>
          </div>
          <div className="mt-6 md:mt-0 text-8xl">🧺</div>
        </section>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-32 bg-gray-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {topRisers.length > 0 && (
              <section className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">
                  <span className="text-red-500">▲</span> আজ দাম বেড়েছে
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topRisers.map((item) => (
                    <ProductCard key={item.id} product={item} />
                  ))}
                </div>
              </section>
            )}

            {topFallers.length > 0 && (
              <section className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">
                  <span className="text-green-600">▼</span> আজ দাম কমেছে
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topFallers.map((item) => (
                    <ProductCard key={item.id} product={item} />
                  ))}
                </div>
              </section>
            )}

            <section id="সব-পণ্য" className="space-y-4 pt-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">সব পণ্য</h3>
                <p className="text-xs text-gray-500">প্রতিদিনের বাজারদরের পূর্ণ তালিকা</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
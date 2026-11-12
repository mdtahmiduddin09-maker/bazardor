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
      .then((result) => {
        const items = Array.isArray(result) ? result : result.data || [];
        setProducts(items);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const topGainers = [...products]
    .filter((p) => (p.change?.pct || 0) > 0)
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const topLosers = [...products]
    .filter((p) => (p.change?.pct || 0) < 0)
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <main className="max-w-6xl mx-auto px-4 py-6 space-y-10">
      <PriceTicker products={products} />

      <section className="bg-green-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            আজকের বাজার আপডেট
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="text-sm text-gray-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#all-products"
            className="inline-block mt-2 px-6 py-3 bg-green-700 hover:bg-green-800 text-white text-sm font-semibold rounded-xl"
          >
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="text-7xl md:text-8xl">🧺</div>
      </section>

      {loading ? (
        <div className="text-center py-10 text-gray-500">পণ্য লোড হচ্ছে...</div>
      ) : (
        <>
          {topGainers.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">দাম বেড়েছে (শীর্ষ ৬)</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {topGainers.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </section>
          )}

          {topLosers.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">দাম কমেছে (শীর্ষ ৬)</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {topLosers.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </section>
          )}

          <section id="all-products" className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">সব পণ্য</h2>
              <p className="text-xs text-gray-500">প্রতিদিনের বাজারদরের পূর্ণ তালিকা</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
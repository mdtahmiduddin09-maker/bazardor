"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { toBn, toEn } from "@/lib/utils";

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("default");

  useEffect(() => {
    setLoading(true);
    fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, [slug]);

  const sorted = [...products].sort((a, b) => {
    if (sort === "low") return toEn(a.price) - toEn(b.price);
    if (sort === "high") return toEn(b.price) - toEn(a.price);
    return 0;
  });

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="h-32 bg-gray-200 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <h2 className="text-xl font-bold">কোনো পণ্য পাওয়া যায়নি</h2>
        <Link href="/" className="inline-block px-5 py-2.5 bg-green-700 text-white rounded-xl text-sm">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200">
        <div>
          <h2 className="text-xl font-bold capitalize">{slug}</h2>
          <p className="text-xs text-gray-500">মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে</p>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">সাজান:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 bg-white text-sm"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((item) => (
          <ProductCard key={item.id || item._id} product={item} />
        ))}
      </div>
    </main>
  );
}
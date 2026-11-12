"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toBn } from "@/lib/utils";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("বিস্তারিত দেখতে আগে সাইন ইন করুন");
      router.push("/signin");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session) {
      fetch(`https://openapi.programming-hero.com/api/bazardor/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id, session]);

  if (isPending || loading) {
    return <div className="text-center py-20 text-gray-500">লোড হচ্ছে...</div>;
  }

  if (!product) {
    return (
      <div className="text-center py-20 space-y-3">
        <p>পণ্যটি খুঁজে পাওয়া যায়নি</p>
        <Link href="/" className="text-green-700 underline text-sm">হোম পেজে ফিরে যান</Link>
      </div>
    );
  }

  const markets = product.markets || [
    { market: "কারওয়ান বাজার", city: "ঢাকা", min: product.price - 2, max: product.price + 3, avg: product.price },
    { market: "সদর বাজার", city: "রাজশাহী", min: product.price - 4, max: product.price + 1, avg: product.price - 2 },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-4xl">
            {product.icon || "🧺"}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-xs text-gray-500">{product.unit} · {product.category}</p>
            <p className="text-xs text-green-700 mt-1">আজকের বাজারদরের বিস্তারিত বিবরণ</p>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-xl text-right">
          <span className="text-xs text-gray-500 block">আজকের দাম</span>
          <span className="text-2xl font-bold text-green-800">{toBn(product.price)} টাকা</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
          <span className="text-xs text-gray-400">সর্বনিম্ন দাম</span>
          <p className="text-lg font-bold text-green-700 mt-1">{toBn(product.min_price || product.price - 2)} টাকা</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
          <span className="text-xs text-gray-400">সর্বাধিক দাম</span>
          <p className="text-lg font-bold text-red-600 mt-1">{toBn(product.max_price || product.price + 5)} টাকা</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
          <span className="text-xs text-gray-400">গড় দাম</span>
          <p className="text-lg font-bold text-gray-800 mt-1">{toBn(product.price)} টাকা</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <h3 className="font-bold p-4 border-b border-gray-200">বাজারভিত্তিক আজকের দাম</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs">
              <tr>
                <th className="p-3">বাজার</th>
                <th className="p-3">বিভাগ</th>
                <th className="p-3">সর্বনিম্ন</th>
                <th className="p-3">সর্বাধিক</th>
                <th className="p-3">গড়</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {markets.map((m, idx) => (
                <tr key={idx}>
                  <td className="p-3 font-medium">{m.market}</td>
                  <td className="p-3 text-gray-500">{m.city}</td>
                  <td className="p-3 text-green-600">{toBn(m.min)} টাকা</td>
                  <td className="p-3 text-red-600">{toBn(m.max)} টাকা</td>
                  <td className="p-3 font-bold">{toBn(m.avg)} টাকা</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
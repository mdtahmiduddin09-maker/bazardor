"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "লগইন ব্যর্থ হয়েছে");
    } else {
      toast.success("সফলভাবে লগইন হয়েছে");
      router.push("/");
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 px-4">
      <div className="bg-white p-8 rounded-3xl border border-gray-200 text-center">
        <h2 className="text-2xl font-bold">সাইন ইন</h2>
        <p className="text-xs text-gray-500 mt-1">বিস্তারিত দাম দেখতে অ্যাকাউন্টে ঢুকুন</p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4 text-left">
          <div>
            <label className="text-xs font-medium block mb-1">ইমেইল</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium block mb-1">পাসওয়ার্ড</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-700 hover:bg-green-800 text-white font-medium rounded-xl text-sm"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </button>
        </form>

        <div className="my-5 text-xs text-gray-400">অথবা</div>

        <div className="flex gap-3">
          <button
            onClick={() => authClient.signIn.social({ provider: "google" })}
            className="flex-1 py-2.5 border border-gray-300 rounded-xl text-xs font-medium hover:bg-gray-50"
          >
            Google দিয়ে চলুন
          </button>
          <button
            onClick={() => authClient.signIn.social({ provider: "github" })}
            className="flex-1 py-2.5 border border-gray-300 rounded-xl text-xs font-medium hover:bg-gray-50"
          >
            GitHub দিয়ে চলুন
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="text-green-700 font-semibold underline">
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </div>
  );
}
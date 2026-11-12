"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const { data: session } = authClient.useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    await authClient.updateUser({ name });
    setLoading(false);
    toast.success("তথ্য আপডেট হয়েছে");
    router.push("/profile");
  };

  return (
    <main className="max-w-md mx-auto py-12 px-4">
      <div className="bg-white p-6 rounded-2xl border border-gray-200">
        <h2 className="text-xl font-bold mb-4">তথ্য আপডেট করুন</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="text-xs font-medium block mb-1">নাম</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-green-700 text-white rounded-xl text-sm font-medium"
          >
            {loading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
          </button>
        </form>
      </div>
    </main>
  );
}
"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();

  if (!session) {
    return (
      <div className="text-center py-20">
        লগইন করা নেই। <Link href="/signin" className="underline text-green-700">সাইন ইন করুন</Link>
      </div>
    );
  }

  return (
    <main className="max-w-xl mx-auto py-12 px-4 space-y-6">
      <h2 className="text-2xl font-bold">আমার প্রোফাইল</h2>
      <div className="bg-white p-6 rounded-2xl border border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-green-700 text-white rounded-full flex items-center justify-center text-xl font-bold">
            {session.user.name?.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold">{session.user.name}</h3>
            <p className="text-xs text-gray-500">{session.user.email}</p>
          </div>
        </div>
        <Link
          href="/profile/update"
          className="px-4 py-2 bg-green-50 text-green-700 rounded-xl text-xs font-semibold hover:bg-green-100"
        >
          তথ্য আপডেট
        </Link>
      </div>
    </main>
  );
}
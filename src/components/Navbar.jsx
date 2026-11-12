"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useState } from "react";

const categories = [
  { name: "চাল", slug: "chal", icon: "🍚" },
  { name: "ডাল", slug: "dal", icon: "🫘" },
  { name: "তেল", slug: "tel", icon: "🫙" },
  { name: "সবজি", slug: "sobji", icon: "🥬" },
  { name: "মাছ", slug: "mach", icon: "🐟" },
  { name: "মাংস", slug: "mangsho", icon: "🍗" },
  { name: "ডিম-দুধ", slug: "dim-dudh", icon: "🥛" },
  { name: "মসলা", slug: "moshla", icon: "🌶️" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("সাইন আউট সফল হয়েছে");
    setOpen(false);
    router.push("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-700 text-white rounded-xl flex items-center justify-center text-xl">
            🛒
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-900">বাজার দর</h1>
            <p className="text-xs text-gray-500">মঙ্গলবার, ৬ অক্টোবর, ২০২৬</p>
          </div>
        </Link>

        <div className="relative">
          {session?.user ? (
            <div>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50"
              >
                <div className="w-7 h-7 rounded-full bg-green-700 text-white flex items-center justify-center text-sm font-bold">
                  {session.user.name?.charAt(0)}
                </div>
                <span className="text-sm font-medium hidden sm:inline">{session.user.name}</span>
                <span className="text-xs">▼</span>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 p-2 z-50">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="font-semibold text-sm">{session.user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg mt-1"
                  >
                    👤 আমার প্রোফাইল
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    ↩ সাইন আউট
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/signin" className="text-sm font-medium text-gray-700 hover:text-green-700">
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white text-sm font-medium rounded-lg"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-100 overflow-x-auto py-2">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-2 min-w-max">
          {categories.map((cat) => {
            const active = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                  active ? "bg-green-700 text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
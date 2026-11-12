import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto my-24 text-center px-4 space-y-4">
      <span className="text-6xl">🔍</span>
      <h2 className="text-2xl font-bold">পৃষ্ঠাটি খুঁজে পাওয়া যায়নি (৪০৪)</h2>
      <p className="text-xs text-gray-500">আপনি ভুল লিংকে প্রবেশ করেছেন।</p>
      <Link
        href="/"
        className="inline-block px-5 py-2.5 bg-green-700 text-white text-xs font-semibold rounded-xl"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto my-24 text-center px-4 space-y-4">
      <span className="text-6xl">🔍</span>
      <h2 className="text-2xl font-bold">পৃষ্ঠাটি খুঁজে পাওয়া যায়নি (৪০৪)</h2>
      <p className="text-xs text-gray-500">আপনি ভুল লিংকে প্রবেশ করেছেন।</p>
      <Link
        href="/"
        className="inline-block px-5 py-2.5 bg-green-700 text-white text-xs font-semibold rounded-xl"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
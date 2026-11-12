import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const font = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "দৈনন্দিন বাজারদর মনিটরিং অ্যাপ্লিকেশন",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className={`${font.className} bg-gray-50 text-gray-900 min-h-screen flex flex-col justify-between`}>
        <Toaster position="top-right" />
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
"use client";
import { useRouter } from "next/navigation";
import { FaSwimmer } from "react-icons/fa"; // Swimming icon
import { useState } from "react";
import Login from "../app/components/Login";
import FloatingCogsIcon from "../app/components/FloatingCogsIcon";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDiveIn = () => {
    setLoading(true);
    router.push("/quiz");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen relative bg-[url('/flashnotes_bg.jpg')] bg-cover bg-center bg-no-repeat">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      )}

      {/* Login Component */}
      <Login />

      {/* Welcome Message */}
      <h1 className="text-3xl font-bold mb-4 text-black">Welcome to Gamified!</h1>

      {/* Dive In Button */}
      <button
        onClick={handleDiveIn}
        className="bg-gray-800 bg-opacity-100 backdrop-blur-none text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-700 transition-all duration-300 ease-in-out flex items-center gap-2 relative z-10"
      >
        Dive In! <FaSwimmer className="text-3xl" />
      </button>

      <div className="mt-4 z-40 border-2 border-gray-600 w-[90%] max-w-md bg-[#0F172A] rounded-xl px-4 py-3 flex items-center justify-center">
        <p className="text-white text-center text-sm">
          Education is the most powerful weapon which can transform the future.— A.P.J. Abdul Kalam
        </p>
      </div>

      {/* Floating Cogs Icon */}
      <FloatingCogsIcon />
    </div>
  );
}

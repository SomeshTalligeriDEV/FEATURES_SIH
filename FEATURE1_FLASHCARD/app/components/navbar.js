"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import AccountPopup from "./accpopup"; // Import the Account Panel

export default function Navbar() {
  const router = useRouter();
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo with right padding */}
        <div className="logo">
          <button
            onClick={() => router.push("/")}
            className="text-2xl font-bold pr-6"
          >
            Gamified
          </button>
        </div>

        {/* Right Side - Premium, About Us & Account */}
        <div className="flex gap-6 items-center">
          <div className="nav-button">
            <button
              onClick={() => router.push("/premium")}
              className="hover:text-blue-400 transition pr-5 font-semibold"
            >
              Premium
            </button>
          </div>
          <div className="nav-button pr-5">
            <button onClick={() => setIsAccountOpen(true)}>
              <FaUser className="text-2xl hover:text-blue-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Account Popup */}
      <AccountPopup
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />
    </nav>
  );
}

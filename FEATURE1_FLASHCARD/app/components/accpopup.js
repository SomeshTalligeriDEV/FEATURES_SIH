"use client";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../utils/firebaseConfig";

export default function AccountPopup({ isOpen, onClose }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-[#0a1d37] text-white p-8 rounded-2xl w-[90%] max-w-md shadow-2xl relative text-center flex flex-col items-center border border-blue-700">
        <button
          className="absolute top-4 right-5 text-2xl text-gray-400 hover:text-red-400 transition duration-200"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 border-b border-blue-600 pb-3 w-full">
          Account Details
        </h2>
        {user ? (
          <div className="space-y-4 text-base md:text-lg text-left w-full px-2">
            <p>
              <span className="font-medium text-blue-400">User ID:</span>{" "}
              <span className="text-gray-300">{user.email}</span>
            </p>
            <p>
              <span className="font-medium text-blue-400">Premium Status:</span>{" "}
              <span className="text-gray-300">No</span>
            </p>
            <p>
              <span className="font-medium text-blue-400">API Key:</span>{" "}
              <span className="text-gray-300">••••••••</span>
            </p>
          </div>
        ) : (
          <p className="text-red-400 text-lg">Not logged in</p>
        )}
      </div>
    </div>
  );
}

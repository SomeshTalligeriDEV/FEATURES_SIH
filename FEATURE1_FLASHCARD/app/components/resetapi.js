"use client";
import { useState } from "react";

export default function ResetApiModal({ setShowResetModal, setShowApiModal }) {
  const [newApiKey, setNewApiKey] = useState("");

  const handleReset = () => {
    if (!newApiKey.trim()) {
      alert("Please enter a new API key.");
      return;
    }

    localStorage.setItem("geminiApiKey", newApiKey.trim());
    setShowResetModal(false);
    setShowApiModal(false);
    alert("API key has been reset!");
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[1000]"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative bg-gray-900 text-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl border border-gray-700">
        {/* ❌ Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
          onClick={() => setShowResetModal(false)}
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-3">Reset Gemini API Key</h2>
        <p className="text-sm text-gray-300 mb-4">
          You can update your Gemini API key here. It will only be stored in
          your browser.
        </p>

        <input
          type="text"
          value={newApiKey}
          onChange={(e) => setNewApiKey(e.target.value)}
          className="w-full p-2 border border-gray-500 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="Enter new API key"
        />

        <button
          onClick={handleReset}
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-500 transition"
        >
          Save New API Key
        </button>
      </div>
    </div>
  );
}

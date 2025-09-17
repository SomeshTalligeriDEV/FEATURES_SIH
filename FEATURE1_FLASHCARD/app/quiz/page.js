"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UploadSection from "@/app/components/upload/uploadsection";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "@/app/utils/firebaseConfig";
import FloatingCogsIcon from "@/app/components/FloatingCogsIcon";
import ResetApiModal from "@/app/components/resetapi";

export default function QuizPage() {
  const router = useRouter();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);

  const auth = getAuth(app);
  const db = getFirestore(app);

  // Check localStorage for Gemini API key on load, and set modal visibility accordingly
  useEffect(() => {
    const storedKey = localStorage.getItem("gemini_api_key");
    if (!storedKey) {
      setShowApiModal(true); // Show modal if no API key is stored
    }
  }, []);

  // Auth check for premium
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) return;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      const isUserPremium = userData?.premium || false;
      setIsPremium(isUserPremium);
    });
    return () => unsubscribe();
  }, []);

  const handleApiKeySubmit = () => {
    if (!apiKeyInput.trim()) return alert("Please enter your API key.");
    const trimmedKey = apiKeyInput.trim();
    localStorage.setItem("gemini_api_key", trimmedKey); // Save the API key in localStorage
    setShowApiModal(false); // Hide the modal after submission
  };

  return (
    <div className="flex h-screen flex-col md:flex-row relative">
      <FloatingCogsIcon />

      {/* API KEY MODAL */}
      {showApiModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-gray-900 rounded-2xl p-6 w-[90%] max-w-md shadow-xl text-white">
            <h2 className="text-xl font-semibold mb-3 text-center">
              Enter your Gemini API Key
            </h2>
            <p className="text-sm text-gray-300 mb-4 text-center">
              Don’t worry — it’s stored only in your browser (localStorage).
            </p>
            <input
              type="text"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              className="w-full p-2 rounded-lg mb-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste your Gemini API key here"
            />
            <button
              onClick={handleApiKeySubmit}
              className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-500 transition"
            >
              Save & Continue
            </button>
          </div>
        </div>
      )}

      {/* Sidebar Toggle Button */}
      <button
        className="absolute top-4 left-4 md:hidden bg-gray-700 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-600 transition z-[50]"
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`w-64 bg-gray-800 text-white p-4 shadow-xl z-[1000] transform md:translate-x-0 transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:block fixed h-full z-30 flex flex-col`}
      >
        <div className="flex justify-between items-center mb-4 z-[2000]">
          <h2 className="text-lg font-bold">Upload Slot</h2>
          <button
            className="md:hidden bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-400 transition"
            onClick={() => setSidebarOpen(false)}
          >
            ✖
          </button>
        </div>
        <div className="p-3 my-2 rounded-lg bg-gray-700 flex justify-between items-center shadow-md">
          {selectedSubject === "loading" ? (
            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
          ) : (
            <span>{selectedSubject || "Empty"}</span>
          )}

          {selectedSubject && (
            <button
              className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-400 transition"
              onClick={() => setSelectedSubject(null)}
            >
              Remove
            </button>
          )}
        </div>
        <UploadSection setSelectedSubject={setSelectedSubject} />
      </aside>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow bg-[url('/insidebg.jpg')] bg-cover bg-center bg-no-repeat min-h-screen p-6 md:p-12 text-center">
        <div className="border-2 border-gray-600 bg-[#FFFFFF] rounded-xl px-8 py-4 mb-8">
            <h1 className="text-4xl font-bold text-black">
              Ready to Learn?
            </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
          <button
            className="bg-green-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-green-500 transition shadow-md w-full z-10"
            disabled={!selectedSubject}
            onClick={() => router.push("/quiz/quizarena")}
          >
            MCQ Mode
          </button>
          <button
            className="bg-purple-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-purple-500 transition shadow-md w-full z-10"
            disabled={!selectedSubject}
            onClick={() => router.push("/quiz/flashcards")}
          >
            Flashcards
          </button>
        </div>
        <div className="mt-4 z-40 border-2 border-gray-600 w-full md:w-[calc(50%+1rem)] max-w-md bg-[#0F172A] rounded-xl px-4 py-3 flex items-center justify-center">
          <p className="text-white text-center text-sm">
            Through questions comes knowledge, and through repetition memory grows strong.
          </p>
        </div>
      </div>

      {/* Reset API Key Button */}
      <button
        onClick={() => setShowResetModal(true)}
        className="fixed bottom-4 md:bottom-8 right-4 md:right-8 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-500 transition z-40"
      >
        Reset API Key
      </button>

      {/* Reset API Modal */}
      {showResetModal && (
        <ResetApiModal
          setShowResetModal={setShowResetModal}
          setShowApiModal={setShowApiModal}
        />
      )}
    </div>
  );
}

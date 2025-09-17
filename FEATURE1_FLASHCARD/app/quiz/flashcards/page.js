"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FlashcardsPage() {
  const router = useRouter();
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedText = localStorage.getItem("extracted_text");
    if (storedText) {
      fetchFlashcards(storedText);
    } else {
      setLoading(false); // nothing to fetch
    }
  }, []);

  const fetchFlashcards = async (text) => {
    setLoading(true);
    try {
      const apiKey = localStorage.getItem("gemini_api_key");
      if (!apiKey) {
        console.error(
          "Missing API Key. Please enter your API key in settings."
        );
        setLoading(false);
        return;
      }

      const response = await fetch("/api/genflash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, apiKey }),
      });

      const responseText = await response.text();
      if (!response.ok || !responseText.trim()) {
        throw new Error("Flashcard fetch failed.");
      }

      let responseData = JSON.parse(responseText);
      setFlashcards(responseData.flashcards || []);
    } catch (error) {
      console.error(" Error fetching flashcards:", error);
    }
    setLoading(false);
  };

  const handleNext = () => {
    if (flashcards.length > 0) {
      setIsFlipped(false);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    }
  };

  const handlePrev = () => {
    if (flashcards.length > 0) {
      setIsFlipped(false);
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-6 relative">
      <h1 className="text-3xl font-bold mb-6 text-center">Flashcards 📖</h1>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 border-opacity-50"></div>
        </div>
      ) : flashcards.length > 0 ? (
        <div
          className="relative w-full max-w-md h-48 perspective-1000 cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div
            className={`relative w-full h-full rounded-lg shadow-lg transition-transform duration-500 transform-style-3d ${
              isFlipped ? "rotate-y-180" : ""
            }`}
            style={{
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="absolute w-full h-full bg-purple-700 flex flex-col items-center justify-center p-6 rounded-lg text-center"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(0deg)",
              }}
            >
              <p className="text-lg opacity-50">Click to Flip</p>
              <p className="text-xl font-semibold mt-4">
                {flashcards[currentIndex]?.cont1 || "No Content"}
              </p>
            </div>
            <div
              className="absolute w-full h-full bg-purple-900 flex flex-col items-center justify-center p-6 rounded-lg text-center"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <p className="text-xl font-semibold">
                {flashcards[currentIndex]?.cont2 || "No Content"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-400 text-center">
          ⚠ No flashcards available. Please upload a document first.
        </p>
      )}

      <button
        className="mt-6 bg-red-500 px-4 py-2 rounded hover:bg-red-400 w-full max-w-xs"
        onClick={() => router.push("/quiz")}
      >
        Back to Quiz
      </button>

      {flashcards.length > 0 && !loading && (
        <>
          <ChevronLeft
            className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 text-purple-400 cursor-pointer hover:text-purple-300"
            size={40}
            onClick={handlePrev}
          />
          <ChevronRight
            className="absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 text-purple-400 cursor-pointer hover:text-purple-300"
            size={40}
            onClick={handleNext}
          />
        </>
      )}
    </div>
  );
}

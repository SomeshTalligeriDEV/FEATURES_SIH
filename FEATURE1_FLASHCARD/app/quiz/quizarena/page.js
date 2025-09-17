"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function QuizArena() {
  const [apiKey, setApiKey] = useState("");
  const [showApiModal, setShowApiModal] = useState(false);
  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const router = useRouter();

  // Fetch the API key and extracted text on component mount
  useEffect(() => {
    const storedKey = localStorage.getItem("gemini_api_key");
    const storedText = localStorage.getItem("extracted_text");

    if (!storedKey) {
      setShowApiModal(true);
    } else {
      setApiKey(storedKey);
      if (storedText) {
        fetchMcqs(storedKey, storedText, currentPhase);
      }
    }
  }, [currentPhase]);

  // Save the API key and continue the quiz
  const handleSaveApiKey = () => {
    if (apiKey.trim() !== "") {
      localStorage.setItem("gemini_api_key", apiKey);
      setShowApiModal(false);
      const storedText = localStorage.getItem("extracted_text");
      if (storedText) {
        fetchMcqs(apiKey, storedText, currentPhase);
      } else {
        alert("No extracted text found!");
      }
    }
  };

  // Reset the API key
  const resetApiKey = () => {
    localStorage.removeItem("gemini_api_key");
    setApiKey("");
    setShowApiModal(true);
  };

  // Fetch MCQs from the backend
  const fetchMcqs = async (key, text, phase) => {
    if (loading) return; // Prevent multiple fetches at once
    setLoading(true);

    try {
      const response = await fetch("/api/generateMcq/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, apiKey: key, phase }),
      });

      const data = await response.json();
      if (data.mcqs) {
        setMcqs(data.mcqs);
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
      }
    } catch (error) {
      console.error("MCQ Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle option selection
  const handleOptionClick = (option) => {
    if (selectedOption === null) {
      setSelectedOption(option);
    }
  };

  // Move to the next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < mcqs.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setQuizCompleted(true);
    }
  };

  // Move to the next phase of the quiz
  const handleNextPhase = () => {
    setCurrentPhase((prevPhase) => prevPhase + 1);
    setQuizCompleted(false);
    setMcqs([]);
    fetchMcqs(apiKey, localStorage.getItem("extracted_text"), currentPhase + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      {showApiModal && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4 text-center">
              Enter Gemini API Key
            </h2>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full p-2 rounded text-black"
              placeholder="Enter API Key"
            />
            <button
              onClick={handleSaveApiKey}
              className="mt-4 bg-blue-500 w-full px-4 py-2 rounded"
            >
              Save & Continue
            </button>
          </div>
        </div>
      )}

      {!showApiModal && mcqs.length > 0 && !quizCompleted && (
        <div className="mt-8 p-6 bg-gray-800 rounded-lg w-full max-w-md text-center">
          <h2 className="text-lg font-bold mb-4 break-words overflow-hidden text-ellipsis max-h-40 sm:max-h-60">
            {mcqs[currentQuestionIndex]?.question}
          </h2>
          <div className="flex flex-col gap-2">
            {mcqs[currentQuestionIndex]?.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`p-3 rounded text-sm sm:text-base text-center transition-all duration-300
                  ${
                    selectedOption
                      ? option.isCorrect
                        ? "bg-green-500"
                        : option === selectedOption
                        ? "bg-red-500"
                        : "bg-gray-700"
                      : "bg-gray-700 hover:bg-gray-600"
                  }
                `}
                disabled={selectedOption !== null}
              >
                {option.text}
              </button>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleNextQuestion}
              className="bg-blue-500 px-4 py-2 rounded"
              disabled={selectedOption === null}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {quizCompleted && (
        <div className="mt-8 p-6 bg-gray-800 rounded-lg w-full max-w-md text-center">
          <h2 className="text-lg font-bold mb-4">
            Phase {currentPhase} Complete! 🎉
          </h2>
          <button
            onClick={handleNextPhase}
            className="bg-green-500 px-4 py-2 rounded w-full"
          >
            Start Next Phase
          </button>
        </div>
      )}

      {loading && <p className="text-lg">Generating MCQs... ⏳</p>}

      {!showApiModal && (
        <button
          onClick={resetApiKey}
          className="mt-4 bg-red-500 px-4 py-2 rounded w-full max-w-xs"
        >
          Reset API Key
        </button>
      )}
    </div>
  );
}

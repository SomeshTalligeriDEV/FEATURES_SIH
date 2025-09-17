"use client";
import { useState } from "react";

const UploadSection = ({ setSelectedSubject }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Uploading file:", file.name);
      setUploading(true);
      setSelectedSubject("loading"); // showing loader in th slot

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/extractText", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw new Error("Failed to extract text.");
        }

        const data = await res.json();

        if (data.text) {
          localStorage.setItem("extracted_text", data.text);
          localStorage.removeItem("current_phase");
          localStorage.removeItem("quiz_progress");
          setSelectedSubject(file.name);
        } else {
          throw new Error("No text found.");
        }
      } catch (error) {
        console.error("Upload error:", error);
        alert("Failed to extract text.");
        setSelectedSubject(null); // reset
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="p-4 rounded-lg">
      <input
        type="file"
        accept=".pdf"
        className="hidden"
        id="file-upload"
        onChange={handleFileUpload}
      />
      <label
        htmlFor="file-upload"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm cursor-pointer transition hover:bg-blue-400"
      >
        Upload Document
      </label>
    </div>
  );
};

export default UploadSection;

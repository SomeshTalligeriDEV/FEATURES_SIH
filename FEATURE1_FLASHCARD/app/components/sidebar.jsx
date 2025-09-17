
"use client";

import { useState } from "react";


export default function Sidebar({ onSlotSelect }) {
  const [slots, setSlots] = useState([
    { id: 1, name: "Slot 1 (Free)", subject: "", isPremium: false },
    { id: 2, name: "Slot 2", subject: "Premium", isPremium: true },
    { id: 3, name: "Slot 3", subject: "Premium", isPremium: true },
    { id: 4, name: "Slot 4", subject: "Premium", isPremium: true },
    { id: 5, name: "Slot 5", subject: "Premium", isPremium: true },
  ]);

  const handleSlotClick = (slot) => {
    if (!slot.isPremium || slot.subject !== "Premium") {
      onSlotSelect(slot.subject);
    }
  };

  const handleRemoveFile = (slotId) => {
    setSlots((prevSlots) =>
      prevSlots.map((slot) =>
        slot.id === slotId ? { ...slot, subject: "" } : slot
      )
    );
  };

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-lg font-bold mb-4">Subjects</h2>
      <ul>
        {slots.map((slot) => (
          <li
            key={slot.id}
            className={`p-2 my-2 rounded-lg cursor-pointer ${
              slot.isPremium && slot.subject === "Premium"
                ? "bg-gray-600 opacity-50 cursor-not-allowed"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => handleSlotClick(slot)}
          >
            {slot.name}: {slot.subject || "Empty"}
            {slot.subject && slot.subject !== "Premium" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile(slot.id);
                }}
                className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}

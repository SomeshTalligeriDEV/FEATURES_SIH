export default function ProPlanCard() {
  return (
    <div className="bg-black text-white p-6 rounded-2xl border border-purple-500 shadow-lg w-80 mx-auto">
      <h2 className="text-xl font-semibold">Pro</h2>
      <p className="text-sm text-purple-400">Additional features</p>
      <p className="text-3xl font-bold mt-2">$5/m</p>

      <div className="bg-gray-800 text-xs px-2 py-1 inline-block mt-2 rounded">
        ⭐ Most Popular
      </div>

      <ul className="mt-4 space-y-2 text-sm text-gray-300">
        <li>✅ Unlimited MCQ generations</li>
        <li>✅ Access to all 5 slots</li>
        <li>✅ Flashcards for learning</li>
        <li>✅ [Extra Premium Feature]</li>
      </ul>

      <button className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
        Select Plan
      </button>
    </div>
  );
}

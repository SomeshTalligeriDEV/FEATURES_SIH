// "use client";
// import { useState, useEffect } from "react";

// export default function Block({ resetTime }) {
//   const [canTryAgain, setCanTryAgain] = useState(false);

//   const parsedResetTime =
//     typeof resetTime === "string" ? parseInt(resetTime) : resetTime;

//   useEffect(() => {
//     console.log("Reset time raw:", resetTime);

//     if (!resetTime || isNaN(resetTime)) return;

//     const now = Date.now();
//     const timeLeft = resetTime - now;

//     if (timeLeft <= 0) {
//       setCanTryAgain(true);
//       return;
//     }

//     const timer = setTimeout(() => {
//       setCanTryAgain(true);
//     }, timeLeft);

//     return () => clearTimeout(timer);
//   }, [resetTime]);

//   const formattedReset = resetTime
//     ? new Date(resetTime).toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       })
//     : "soon";

//   return (
//     <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 z-50 flex flex-col items-center justify-center text-white">
//       <div className="text-center">
//         <h2 className="text-3xl font-bold mb-4">Upload Limit Reached</h2>
//         <p className="text-lg mb-4">
//           You've hit the free upload limit. <br />
//           Try again at <strong>{formattedReset}</strong>.
//         </p>
//         <button
//           onClick={() => window.location.reload()}
//           disabled={!canTryAgain}
//           className={`px-6 py-3 rounded-xl font-semibold shadow-md transition ${
//             canTryAgain
//               ? "bg-green-600 hover:bg-green-500 text-white"
//               : "bg-gray-600 text-gray-300 cursor-not-allowed"
//           }`}
//         >
//           {canTryAgain ? "Try Again" : "Please wait..."}
//         </button>
//       </div>
//     </div>
//   );
// }

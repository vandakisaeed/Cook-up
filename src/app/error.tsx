// app/error.tsx
"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h2 className="text-2xl font-semibold text-red-600 mb-4">
        Oops! Something went wrong.
      </h2>
      <p className="text-gray-700 mb-6">{error.message || "An unexpected error occurred while fetching data."}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );
}

"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() =>{
        console.error("Error caught by error.tsx:", error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-50 text-gray-800">
            <h1 className="text-3xl font-bold mb-4">Something went wrong...</h1>
            <p className="text-sm text-gray-500 mb-6">
                {error.digest ? `Error ID: ${error.digest}` : "An unexpected error occurred."}
            </p>
            <button
                onClick={() => redirect("/")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                Home
            </button>
        </div>
    )
}
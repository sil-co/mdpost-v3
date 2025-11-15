"use client";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body className="flex items-center justify-center min-h-screen bg-red-50 text-red-700">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Global Error</h2>
          <p>{error.message}</p>
          <button
            onClick={() => reset()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}

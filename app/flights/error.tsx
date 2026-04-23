// Add to existing app/flights/error.tsx
'use client';

import { useEffect } from 'react';

export default function FlightsError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
                Something went wrong!
            </h2>
            <p className="text-gray-600 mb-6">{error.message}</p>
            <button
                onClick={() => reset()}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
                Try again
            </button>
        </div>
    );
}

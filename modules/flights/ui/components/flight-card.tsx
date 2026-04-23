// Presentational component - doesn't know about hooks or services
'use client';

import { Flight } from '../../types/flight';

interface FlightCardProps {
    flight: Flight;
    onSelect: (flightId: string) => void;
}

export function FlightCard({ flight, onSelect }: FlightCardProps) {
    return (
        <div className="p-4 border rounded-lg hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <p className="font-semibold">{flight.from} → {flight.to}</p>
                    <p className="text-sm text-gray-600">{flight.airline}</p>
                </div>
                <p className="text-lg font-bold text-blue-600">${flight.price}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-3">
                <div>
                    <p className="text-xs text-gray-500">Departure</p>
                    <p className="font-semibold">{flight.departure}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="font-semibold">{flight.duration}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">Stops</p>
                    <p className="font-semibold">{flight.stops}</p>
                </div>
            </div>

            <button
                onClick={() => onSelect(flight.id)}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
                Select Flight
            </button>
        </div>
    );
}

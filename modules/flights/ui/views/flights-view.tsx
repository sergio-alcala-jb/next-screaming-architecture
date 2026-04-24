// View component - orchestrates components and connects them with hooks/services
'use client';

import { useEffect, useState } from 'react';
import { Flight, SearchParams } from '../../types/flight';
import { searchFlights } from '../../services/search-flights';
import { useSearchFilter } from '../../hooks/use-search-filter';
import { FlightCard } from '../components/flight-card';
import { FlightFilterComponent } from '../components/flight-filter';

interface FlightsViewProps {
    searchParams: SearchParams;
}

export function FlightsView({ searchParams }: FlightsViewProps) {
    const [allFlights, setAllFlights] = useState<Flight[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedFlight, setSelectedFlight] = useState<string | null>(null);

    const { filters, filteredFlights, updateFilter } = useSearchFilter(allFlights);

    const handleFlightSelect = (flightId: string) => {
        setSelectedFlight(flightId);
        // Navigate to next step or update cart
        console.log('Selected flight:', flightId);
    };

    // Fetch flights when search params change
    useEffect(() => {
        const fetchFlights = async () => {
            try {
                setIsLoading(true);
                const flights = await searchFlights(searchParams);
                setAllFlights(flights);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch flights');
                setAllFlights([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFlights();
    }, [searchParams]);

    if (isLoading) {
        return <div className="p-8 text-center">Loading flights...</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-red-600">Error: {error}</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">
                Flights from {searchParams.from} to {searchParams.to}
            </h1>

            {/* Filter Component */}
            <FlightFilterComponent
                filters={filters}
                onFilterChange={updateFilter}
            />

            {/* Flight Results */}
            <div className="space-y-4">
                <p className="text-gray-600">
                    Showing {filteredFlights.length} of {allFlights.length} flights
                </p>
                {filteredFlights.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        No flights match your criteria
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filteredFlights.map(flight => (
                            <FlightCard
                                key={flight.id}
                                flight={flight}
                                onSelect={handleFlightSelect}
                            />
                        ))}
                    </div>
                )}
            </div>

            {selectedFlight && (
                <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 p-4 rounded">
                    Flight {selectedFlight} added to cart!
                </div>
            )}
        </div>
    );
}

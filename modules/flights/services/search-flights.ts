// Service layer - handles API calls and business logic
import { Flight, SearchParams } from '../types/flight';

export async function searchFlights(params: SearchParams): Promise<Flight[]> {
    // Mock API call
    const response = await fetch(
        `/api/flights?from=${params.from}&to=${params.to}&date=${params.date}`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch flights');
    }

    return response.json();
}

export async function getFlightDetails(flightId: string): Promise<Flight> {
    const response = await fetch(`/api/flights/${flightId}`);

    if (!response.ok) {
        throw new Error('Failed to fetch flight details');
    }

    return response.json();
}

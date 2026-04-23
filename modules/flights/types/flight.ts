// Type definitions for the flights module
export interface Flight {
    id: string;
    from: string;
    to: string;
    departure: string;
    arrival: string;
    price: number;
    airline: string;
    duration: string;
    stops: number;
}

export interface FlightFilter {
    maxPrice: number;
    minStops: number;
    airline?: string;
}

export interface SearchParams {
    from: string;
    to: string;
    date: string;
}

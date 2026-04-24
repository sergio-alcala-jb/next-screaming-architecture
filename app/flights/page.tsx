// How to use in a page - Next.js App Router

import { SearchParams } from "@/modules/flights/types/flight.type";
import { FlightsView } from "@/modules/flights/ui/views/flights.view";

export default function FlightsPage() {
    // Example search parameters (in real app, these would come from URL or user input)
    const searchParams: SearchParams = {
        from: 'JFK',
        to: 'LAX',
        date: '2026-05-01',
    };

    return (
        <main className="min-h-screen bg-white">
            <FlightsView searchParams={searchParams} />
        </main>
    );
}

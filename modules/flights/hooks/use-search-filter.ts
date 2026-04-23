// Custom hook - manages filter state and logic
'use client';

import { useState, useCallback } from 'react';
import { Flight, FlightFilter } from '../types/flight';

export function useSearchFilter(flights: Flight[]) {
    const [filters, setFilters] = useState<FlightFilter>({
        maxPrice: 1000,
        minStops: 0,
    });

    const filteredFlights = useCallback(() => {
        return flights.filter(flight =>
            flight.price <= filters.maxPrice &&
            flight.stops <= filters.minStops &&
            (!filters.airline || flight.airline === filters.airline)
        );
    }, [flights, filters]);

    const updateFilter = useCallback((newFilter: Partial<FlightFilter>) => {
        setFilters(prev => ({ ...prev, ...newFilter }));
    }, []);

    return {
        filters,
        filteredFlights: filteredFlights(),
        updateFilter,
    };
}

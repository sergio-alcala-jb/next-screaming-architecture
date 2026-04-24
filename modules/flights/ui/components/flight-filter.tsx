// Filter component - handles filter UI and communicates with parent
'use client';

import { FlightFilter } from '../../types/flight.type';

interface FlightFilterProps {
    filters: FlightFilter;
    onFilterChange: (filters: Partial<FlightFilter>) => void;
}

export function FlightFilterComponent({ filters, onFilterChange }: FlightFilterProps) {
    return (
        <div className="p-4 bg-gray-50 rounded-lg mb-6">
            <h3 className="font-semibold mb-4">Filter Results</h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Max Price: ${filters.maxPrice}
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="2000"
                        value={filters.maxPrice}
                        onChange={(e) => onFilterChange({ maxPrice: parseInt(e.target.value) })}
                        className="w-full"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Max Stops: {filters.minStops}
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="5"
                        value={filters.minStops}
                        onChange={(e) => onFilterChange({ minStops: parseInt(e.target.value) })}
                        className="w-full"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Airline</label>
                    <select
                        value={filters.airline || ''}
                        onChange={(e) => onFilterChange({ airline: e.target.value || undefined })}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">All Airlines</option>
                        <option value="jetBlue">JetBlue</option>
                        <option value="united">United</option>
                        <option value="southwest">Southwest</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

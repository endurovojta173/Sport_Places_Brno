import { useState } from "react";

// generic manager for filter, it accepts as many filters as needed

 // T extends Record<string, string> means it accepts any object where keys are strings and values are strings.
export function useFilters<T extends Record<string, string>>(initialFilters: T) {
    const [filters, setFilters] = useState<T>(initialFilters);

    // Updates a specific filter key while preserving the rest of the filter state.
    const setFilter = (key: keyof T, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    // Resets all filters back to their initial state.
    const resetFilters = () => {
        setFilters(initialFilters);
    };

    return {filters, setFilter, resetFilters};
}
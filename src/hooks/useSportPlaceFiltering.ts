import { useMemo } from "react";
import { SportPlace } from "@/types/sport-place";

// Extends the base type with the dynamically calculated zone from useNearestZones
type SportPlaceWithZone = SportPlace & { computedZone?: string };

type SportPlaceFilteringOptions = {
    type?: string;
    zone?: string;
    searchQuery?: string;
};

// Extracts a distinct list of sport place types for the dropdown filter
function getUniqueTypes(places: SportPlaceWithZone[]) {
    const types = places.map(place => place.type).filter(Boolean) as string[];
    return Array.from(new Set(types));
}

// Core filtering logic. Returns true only if the place matches all active filters.
function filterSportPlaces(
    places: SportPlaceWithZone[],
    { type, zone, searchQuery }: SportPlaceFilteringOptions
) {
    const normalizedQuery = searchQuery?.trim().toLowerCase();

    return places.filter(place => {
        // Drop place if it doesn't match the selected type (and type isn't "all")
        if (type && type !== "all" && place.type !== type) return false;
        
        // Drop place if it doesn't match the selected zone
        if (zone && zone !== "all" && place.computedZone !== zone) return false;
        
        // Drop place if its title doesn't contain the search query
        if (normalizedQuery && !place.title.toLowerCase().includes(normalizedQuery)) {
            return false;
        }
        
        return true;
    });
}

// Custom hook that orchestrates the filtering and prevents unnecessary recalculations
export function useSportPlaceFiltering(
    places: SportPlaceWithZone[],
    { type, zone, searchQuery }: SportPlaceFilteringOptions
) {
    // useMemo ensures uniqueTypes are recalculated only when the source data changes
    const uniqueTypes = useMemo(() => getUniqueTypes(places), [places]);
    
    // useMemo ensures filtering runs only when the data or active filters change
    const filteredPlaces = useMemo(() => {
        return filterSportPlaces(places, { type, zone, searchQuery });
    }, [places, type, zone, searchQuery]);

    return { uniqueTypes, filteredPlaces };
}
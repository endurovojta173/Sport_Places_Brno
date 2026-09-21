import { useMemo } from "react";
import { SportPlace } from "@/types/sport-place";
import { getDistanceInKm } from "@/utils/distance-between-sport-place-and-public-transport";

// Custom hook that assigns the nearest public transport zone to each sport place.
export function useNearestZones(sportPlaces: SportPlace[], stops: any[] | null) {
    // Ensures we always work with an array, even if the API fails or returns undefined.
    const safePlaces = Array.isArray(sportPlaces) ? sportPlaces : [];

    // useMemo prevents recalculating distances on every render.
    // It only runs again if 'safePlaces' or 'stops' change.
    return useMemo(() => {
        
        // If public transport data is unavailable, we cannot calculate zones.
        // We assign "all" to prevent filtering logic from breaking.
        if (!stops || stops.length === 0) {
            return safePlaces.map(place => ({ ...place, computedZone: "all" }));
        }

        // Iterate through all sport places to find their nearest public transport stop.
        return safePlaces.map(place => {
            let minDistance = Infinity;
            let nearestZone = null;

            // Check distance against every stop to find the absolute closest one.
            for (const stop of stops) {
                const dist = getDistanceInKm(place.latitude, place.longitude, stop.latitude, stop.longitude);
                if (dist < minDistance) {
                    minDistance = dist;
                    nearestZone = stop.zone_id;
                }
            }
            
            // Return a new object containing the original sport place data 
            // enriched with the dynamically calculated zone ID.
            return { ...place, computedZone: String(nearestZone) };
        });
    }, [safePlaces, stops]);
}
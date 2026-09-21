"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import ListFilter from "./ListFilter";
import SportPlaceCard from "./SportPlaceCard";
import { SportPlace } from "@/types/sport-place";
import { useNearestZones } from "@/hooks/useNearestZones";
import { useFilters } from "@/hooks/useFilters";
import { useSportPlaceFiltering } from "@/hooks/useSportPlaceFiltering";
import { fetchSportPlaces } from "@/services/sport-places-api";
import { getCachedPublicTransport } from "@/services/public-transport-api";

export default function FilteredListContainer({ sportPlaces, stops }: { sportPlaces: SportPlace[], stops: any[] | null }) {
    const { filters, setFilter } = useFilters({ type: "all", zone: "all" });
    const [displayLimit, setDisplayLimit] = useState(12);

    const { data: livePlaces, error } = useSWR("sportPlaces", fetchSportPlaces, {
        fallbackData: sportPlaces 
    });

    const { data: liveStops } = useSWR("publicTransport", getCachedPublicTransport, { 
        fallbackData: stops || undefined
    });

    const enrichedPlaces = useNearestZones(livePlaces || [], liveStops || []);
    
    const zoneDisabled = !liveStops || liveStops.length === 0;

    useEffect(() => {
        if (zoneDisabled && filters.zone !== "all") {
            setFilter("zone", "all");
        }
        // Limit reset
        setDisplayLimit(30);
    }, [filters, setFilter, zoneDisabled]);

    const { uniqueTypes, filteredPlaces } = useSportPlaceFiltering(enrichedPlaces, {
        type: filters.type,
        zone: filters.zone,
    });

    if (error && (!livePlaces || livePlaces.length === 0)) {
        return (
            <div className="flex justify-center p-10">
                <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200">
                    <h3 className="font-bold">Chyba připojení</h3>
                    <p>Nepodařilo se načíst sportoviště. Zkuste prosím obnovit stránku.</p>
                </div>
            </div>
        );
    }

    const visiblePlaces = filteredPlaces.slice(0, displayLimit);
    const hasMore = displayLimit < filteredPlaces.length;

    return (
        <div className="w-full max-w-6xl">
            <div className="flex justify-start mb-6">
                <ListFilter
                    types={uniqueTypes}
                    selectedType={filters.type}
                    selectedZone={filters.zone}
                    zoneDisabled={zoneDisabled}
                    onFilterChange={setFilter}
                />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visiblePlaces.length > 0 ? (
                    visiblePlaces.map(place => <SportPlaceCard key={place.id} sportPlace={place} />)
                ) : (
                    <p className="text-gray-500 py-10 text-center col-span-full">
                        Žádná sportoviště neodpovídají filtrům.
                    </p>
                )}
            </div>

            {hasMore && (
                <div className="flex justify-center mt-10">
                    <button 
                        onClick={() => setDisplayLimit(prev => prev + 12)}
                        className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Načíst další
                    </button>
                </div>
            )}
        </div>
    );
}
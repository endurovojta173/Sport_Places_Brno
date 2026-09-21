"use client";

import useSWR from "swr";
import { useFavoriteStore } from "@/store/use-favorite-store";
import SportPlaceCard from "@/components/SportPlaceCard";
import { SportPlace } from "@/types/sport-place";
import { fetchSportPlaces } from "@/services/sport-places-api"; 

// Renders the user's favorite sport places.
export default function Favorites() {
    // Retrieve the array of favorite IDs stored in localStorage via Zustand
    const { favoriteIds } = useFavoriteStore();
    
    // Fetch all available sport places using SWR for caching and background revalidation
    const { data: allPlaces, isLoading } = useSWR("sportPlaces", fetchSportPlaces);

    // Filter the fetched places to keep only those whose IDs are in the favoriteIds array.
    // If data is still loading (allPlaces is undefined), fallback to an empty array.
    const favorites = allPlaces 
        ? allPlaces.filter((place: SportPlace) => favoriteIds.includes(place.id)) 
        : [];
    
    return (
        <div className="flex min-h-screen flex-col items-center p-10">
            <h1 className="text-3xl font-bold mb-8">Oblíbené</h1>
            
            {/* Conditional rendering based on loading state and data availability */}
            {isLoading ? (
                // Skeleton loader shown while SWR is fetching data
                <div className="w-full max-w-6xl animate-pulse h-64 bg-gray-100 rounded-xl"></div>
            ) : favorites.length > 0 ? (
                // Grid layout displaying the filtered favorite sport places
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                    {favorites.map((place: SportPlace) => (
                        <SportPlaceCard key={place.id} sportPlace={place} />
                    ))}
                </div>
            ) : (
                // Empty state message when no favorites exist
                <p className="text-gray-500">Zatím nemáte žádná oblíbená sportoviště.</p>
            )}
        </div>
    );
}
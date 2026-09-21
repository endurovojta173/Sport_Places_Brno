import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoriteStore {
    favoriteIds: number[];
    toggleFavorite: (id: number) => void;
    isFavorite: (id: number) => boolean;
}

export const useFavoriteStore = create<FavoriteStore>()(
    persist(
        (set, get) => ({
            favoriteIds: [], // Initial state
            
            toggleFavorite: (id) => set((state) => ({
                // Remove if already favorited, otherwise add it
                favoriteIds: state.favoriteIds.includes(id)
                    ? state.favoriteIds.filter((favId) => favId !== id)
                    : [...state.favoriteIds, id],
            })),
            
            // Helper to quickly check if an item is favorited
            isFavorite: (id) => get().favoriteIds.includes(id),
        }),
        {
            name: "favorite-storage", // localStorage key
        }
    )
);
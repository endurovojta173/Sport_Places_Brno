"use client";

import { useEffect, useState } from "react";
import { useFavoriteStore } from "@/store/use-favorite-store";
import { Heart } from "lucide-react";

export default function FavoriteButton({ id }: { id: number }) {
    const [isMounted, setIsMounted] = useState(false);
    const { toggleFavorite, isFavorite } = useFavoriteStore();
    const isFav = isFavorite(id);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <button
                onClick={() => toggleFavorite(id)}
                className="group inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200"
                aria-label="Přidat do oblíbených"
            >
                <Heart className="h-5 w-5 text-slate-500 transition group-hover:text-red-500" fill="none" stroke="currentColor" />
            </button>
        );
    }

    return (
        <button
            onClick={() => toggleFavorite(id)}
            className="group inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200"
            aria-label={isFav ? "Odebrat z oblíbených" : "Přidat do oblíbených"}
        >
            <Heart
                className={`h-5 w-5 transition ${isFav ? "text-red-500" : "text-slate-500 group-hover:text-red-500"}`}
                fill={isFav ? "currentColor" : "none"}
                stroke="currentColor"
            />
        </button>
    );
}

"use client";

import dynamic from "next/dynamic";
import { MapData } from "@/types/map";

const MapComponent = dynamic(() => import("./Map"), { 
    ssr: false, 
    loading: () => <div className="h-500px bg-muted animate-pulse rounded-xl" />
});

type MapWrapperProps = {
    mapData: MapData;
    center?: [number, number];
    activeSportPlaceId?: number | null;
};

export default function MapWrapper({ mapData, center, activeSportPlaceId }: MapWrapperProps) {
    return (
        <MapComponent 
            mapData={mapData} 
            center={center} 
            activeSportPlaceId={activeSportPlaceId ?? undefined} 
        />
    );
}
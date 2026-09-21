"use client"
import { MapContainer, TileLayer} from "react-leaflet"
import MapMarker from "./MapMarker"; // Custom marker component for sport places

import { MarkerType } from "@/types/marker";
import { MapData } from "@/types/map";

type MapProps = {
    mapData: MapData;
    center?: [number, number];
    activeSportPlaceId?: number;
};

export default function Map({ mapData, center, activeSportPlaceId }: MapProps) {
    const mapCenter = center ?? [49.1951, 16.6068]; // set map to sport activity center if provided, else default Brno center
    return (
        <MapContainer 
        center={mapCenter}
        zoom={13} 
        className="relative z-0"
        style={{ height: "calc(100vh - 4rem)", width: "100%" }}
        >
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />      
      {mapData?.sportPlaces?.map(sportPlace =>(
        <MapMarker
          key={sportPlace.id}
          data={sportPlace}
          markerType={MarkerType.SPORT_PLACE}
          isHighlighted={activeSportPlaceId === sportPlace.id}
        />
      ))}
      {mapData?.publicTransportStops?.map(publicTransportStop =>(
        <MapMarker key={publicTransportStop.id} data={publicTransportStop} markerType={MarkerType.PUBLIC_TRANSPORT_STOP} />
      ))}
        </MapContainer>
      )
}

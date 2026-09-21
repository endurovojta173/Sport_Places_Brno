import { Marker, Popup, useMapEvents } from "react-leaflet";
import { SportPlace } from "@/types/sport-place";
import { PublicTransport } from "@/types/public-transport";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MarkerType } from "@/types/marker";

export default function MapMarker({
  data,
  markerType,
  isHighlighted,
}: {
  data: SportPlace | PublicTransport;
  markerType: MarkerType;
  isHighlighted?: boolean;
}) {
  const router = useRouter();
  const markerRef = useRef<L.Marker | null>(null);

  const handleNavigation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    router.push(`/map/${data.id}`);
  };

  const [zoom, setZoom] = useState(13);
  
  useMapEvents({
    zoomend: (e) => setZoom(e.target.getZoom()),
  });

  const isZoomedOut = zoom < 11;
  const sizeClass = isZoomedOut ? "w-2 h-2" : "w-4 h-4";
  const iconSize: [number, number] = isZoomedOut ? [12, 12] : [30, 30];
  const iconAnchor: [number, number] = isZoomedOut ? [6, 6] : [15, 15];

  const markerBgColor = markerType === MarkerType.SPORT_PLACE 
    ? "bg-red-600" 
    : "bg-blue-600"; 

  const customIcon = L.divIcon({
    className: "bg-transparent",
    html: `
      <div class="group flex items-center justify-center">
        <div class="${sizeClass} ${markerBgColor} border border-white rounded-full shadow-md 
                    transition-all duration-200 hover:scale-150 hover:z-1000">
        </div>
      </div>
    `,
    iconSize,
    iconAnchor,
  });
  
  useEffect(() => {
    if (!isHighlighted || !markerRef.current) return;
    markerRef.current.openPopup();
  }, [isHighlighted]);

  return (
    <Marker position={[data.latitude, data.longitude]} icon={customIcon} ref={markerRef}>
      <Popup>

        <div className="flex flex-col gap-1 p-2 min-w-160px">
          {'title' in data ? (
            <>
              <h3 className="font-bold text-sm text-gray-900 leading-tight m-0">
                {data.title}
              </h3>
              <p className="text-xs text-gray-500 m-0">
                {data.type}
              </p>
              <p className="text-xs text-gray-500 m-0">
                {data.address}
              </p>
              <Button 
                onClick={handleNavigation}
                className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md text-xs transition-all active:scale-95 shadow-sm"
              >
                Zobrazit detail
              </Button>
            </>
          ) : (
            <>
              <h3 className="font-bold text-sm text-gray-900 leading-tight m-0">
                {data.name}
              </h3>
              <p className="text-xs text-gray-500 m-0">
                Zóna: {data.zone_id}
              </p>
            </>
          )}
        </div>
      </Popup>
    </Marker>
  );
}
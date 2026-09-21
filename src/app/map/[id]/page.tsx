import { fetchSportPlaceById, fetchSportPlaces } from "@/services/sport-places-api";
import { getCachedPublicTransport } from "@/services/public-transport-api";
import { getNearestStops } from "@/utils/distance-between-sport-place-and-public-transport";
import FavoriteButton from "@/components/FavoriteButton";
import PublicTransportCard from "@/components/PublicTransportCard";
import Link  from "next/link";
import MapWrapper  from "@/components/MapWrapper";

export async function generateStaticParams() {
  const sportPlaces = await fetchSportPlaces();
  return sportPlaces.map((place) => ({
    id: place.id.toString(),
  }));
}

export default async function DetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  const [sportPlace, allStops] = await Promise.all([
      fetchSportPlaceById(parseInt(id)),
      getCachedPublicTransport()
  ]);

  // When sport place is not found
  if (!sportPlace) {
    return (
      <main className="flex min-h-screen flex-col items-center py-10 bg-white w-full" data-testid="map-detail-not-found">
        <div className="w-full max-w-6xl px-4 md:px-8">
          <h1 className="text-3xl font-bold text-red-700">Sportoviště nenalezeno</h1>
          <p className="mt-4">Omlouváme se, ale sportoviště s ID {id} nebylo nalezeno.</p>
          <Link href="/map" className="text-blue-500 underline mt-4 inline-block">
            Zpět na mapu
          </Link>
        </div>
      </main>
    );
  }

  //Getting nearest transport stops
  const nearestStops = getNearestStops(
      sportPlace.latitude,
      sportPlace.longitude,
      allStops,
      3
  );

  // Detail page
  return (

    <main className="flex min-h-screen flex-col items-center py-10 bg-white w-full" data-testid="map-detail-page">
      <div className="w-full max-w-6xl px-4 md:px-8">
        
        {/* Button for add to fav */}
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">{sportPlace.title}</h1>
          <FavoriteButton id={parseInt(id)} />
        </div>
        
        {/* Stop detail */}
        <p className="text-sm text-gray-500 mt-1">
          {sportPlace.type || "Typ neuveden"}
        </p>

        <p className="mt-4">
          {sportPlace.category || "Kategorie neuvedena"}
        </p>

        <p className="text-sm text-gray-500">
          {sportPlace.address || "Adresa neznámá"}
        </p>

        <p className="mt-4">
          {sportPlace.description || "Popis sportoviště není k dispozici."}
        </p>

        {sportPlace.url && (
          <p className="mt-4">
              Webová stránka:
              <a
                  href={sportPlace.url.startsWith('http') ? sportPlace.url : `https://${sportPlace.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-blue-500 underline italic"
              >
                  {sportPlace.url}
              </a>
          </p>
        )}

        {/* Nearest stops */}

        <div className="mt-10 border-t pt-8" data-testid="map-nearest-stops">
          <h2 className="text-2xl font-semibold mb-6">Nejbližší zastávky MHD</h2>
          {nearestStops.length > 0 ? (
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 pb-8">
              {nearestStops.map(stop => (
                <PublicTransportCard key={stop.id} publicTransportStop={stop} distance={stop.distance} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm pb-8">Nenalezeny žádné zastávky.</p>
          )}
          
          {/* Map */}
          <MapWrapper
            mapData={{ sportPlaces: [sportPlace], publicTransportStops: nearestStops }}
            center={[sportPlace.latitude, sportPlace.longitude]}
          />
        </div>

      </div>
    </main>
  );
}
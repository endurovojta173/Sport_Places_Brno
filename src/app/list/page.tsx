import { fetchSportPlaces } from "@/services/sport-places-api";
import { getCachedPublicTransport } from "@/services/public-transport-api";
import FilteredListContainer from "@/components/FilteredListContainer";

export default async function SportPlacesPage() {
    // Fetch initial data on the server
    const allPlaces = await fetchSportPlaces();
    const allStops = await getCachedPublicTransport(); 

    // Handle critical API failure
    if (!allPlaces || !Array.isArray(allPlaces)) {
        return (
            <main className="flex min-h-[70vh] flex-col items-center justify-center p-10 bg-white text-center">
                <h1 className="text-3xl font-bold mb-4 text-red-700">Chyba načítání dat</h1>
                <p className="text-gray-500 max-w-md">
                    Omlouváme se, ale nepodařilo se načíst seznam sportovišť ze serveru. Zkuste prosím obnovit stránku později.
                </p>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen flex-col items-center py-10 bg-white w-full">
            <div className="w-full max-w-6xl px-4 md:px-8">
                <h1 className="text-3xl font-bold mb-8 text-left">Sportoviště</h1>
                <FilteredListContainer sportPlaces={allPlaces} stops={allStops || []} />
            </div>
        </main>
    );
}
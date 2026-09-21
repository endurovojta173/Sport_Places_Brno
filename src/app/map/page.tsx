import { fetchSportPlaces } from "@/services/sport-places-api"; 
import FilteredMapContainer from "../../components/FilteredMapContainer"; 

export default async function MapPage() {
  const sportPlaces = await fetchSportPlaces();

  return (
    <div className="flex flex-col min-h-screen p-6" data-testid="map-page">
      
      {/* map component */}
      <FilteredMapContainer sportPlaces={sportPlaces} />
    </div>
  );
}
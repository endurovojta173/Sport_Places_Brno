import { SportPlace } from "@/types/sport-place";
import sportPlacesFixture from "@/data/sport-places-fixture";

function mapArcGISJsonToSportPlace(f: any): SportPlace {
    return {
        id: f.attributes.ObjectId, 
        title: f.attributes.nazev || "Bez názvu",
        type: f.attributes.typ_sportoviste_nazev || "Nespecifikováno",
        address: f.attributes.adresa || "Bez adresy",
        latitude: f.geometry.y,
        longitude: f.geometry.x,
        //Undefined for optimalization, we don't need these fields for the map, and we can fetch them separately when needed
        category: f.attributes.kategorie,
        url: f.attributes.url,
        description: f.attributes.popis,
    };
}


export async function fetchSportPlaces(): Promise<SportPlace[]> {
    if (process.env.USE_FIXTURE_SPORT_PLACES === "true") {
        return sportPlacesFixture;
    }

    const url = "https://services6.arcgis.com/fUWVlHWZNxUvTUh8/arcgis/rest/services/sportoviste/FeatureServer/0/query?where=1%3D1&outFields=ObjectId,typ_sportoviste_nazev,nazev,adresa,kategorie&outSR=4326&f=json";
    try {
        const response = await fetch(url, { next: { revalidate: 3600 } });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`API Error ${response.status}: ${errorText}`);
            return [];
        }

        const json = await response.json();
        return json.features.map(mapArcGISJsonToSportPlace);

    } catch (error) {
        console.error("Error fetching sport places:", error);
        return [];
    }
}

export async function fetchSportPlaceById(id: number): Promise<SportPlace | null> {
    if (process.env.USE_FIXTURE_SPORT_PLACES === "true") {
        return sportPlacesFixture.find(place => place.id === id) ?? null;
    }

    const url = `https://services6.arcgis.com/fUWVlHWZNxUvTUh8/arcgis/rest/services/sportoviste/FeatureServer/0/query?outFields=*&where=ObjectId%3D${id}&outSR=4326&f=json`;
try{
    const response = await fetch(url, {
        next: { revalidate: 3600 } 
    });
    const json = await response.json();

    return mapArcGISJsonToSportPlace(json.features[0]) || null;
} catch (error) {
    console.error(`Error fetching sport place with id ${id}:`, error);
    return null; // Return null on error to indicate not found
    }
}
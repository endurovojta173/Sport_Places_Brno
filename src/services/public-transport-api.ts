import {PublicTransport} from "@/types/public-transport";
import publicTransportFixture from "@/data/public-transport-fixture";

function mapJsonToPublicTransport(f: any): PublicTransport {
    return {
        id: f.attributes.stop_id,
        name: f.attributes.stop_name,
        latitude: f.attributes.latitude,
        longitude: f.attributes.longitude,
        zone_id: f.attributes.zone_id,
        location_type: f.attributes.location_type,
        wheelchair_accessible: f.attributes.wheelchair_boarding,
        platform_code: f.attributes.platform_code,
    };
}
// Caching mechanism to avoid hitting the API too often. Cache is valid for 1 hour.
let cachedStops: PublicTransport[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 1000 * 60 * 60;

// This function returns cached stops if they are still valid, otherwise it fetches new data from the API and updates the cache.
export async function getCachedPublicTransport(): Promise<PublicTransport[]> {
    if (process.env.USE_FIXTURE_PUBLIC_TRANSPORT === "true") {
        return publicTransportFixture;
    }

    const now = Date.now();

    if(cachedStops && now - cacheTimestamp < CACHE_TTL) {
        return cachedStops;
    }

    cachedStops = await fetchPublicTransport();
    cacheTimestamp = now;
    return cachedStops;
}

async function fetchPublicTransport(): Promise<PublicTransport[]> {
    const baseUrl = "https://services6.arcgis.com/fUWVlHWZNxUvTUh8/arcgis/rest/services/stops/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";

    let allFeatures: any[] = [];
    let offset = 0;
    let hasMore = true;
    const limit = 1000;
    // ArcGIS REST API doesnt return all data at once, only 1000 records, so we need to paginate through the results using resultOffset and resultRecordCount parameters.
    try {
        while (hasMore) {
            const url = `${baseUrl}&resultOffset=${offset}&resultRecordCount=${limit}`;
            const response = await fetch(url, { next: { revalidate: 3600 } });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`API Error ${response.status}: ${errorText}`);
                break;
            }

            const json = await response.json();
            
            if (!json.features || json.features.length === 0) {
                break;
            }

            allFeatures = allFeatures.concat(json.features);

            // ArcGIS returns a flag 'exceededTransferLimit' to indicate that there are more records to fetch
            if (json.exceededTransferLimit || json.features.length === limit) {
                offset += limit;
            } else {
                hasMore = false;
            }
        }

        console.log(`Staženo celkem zastávek: ${allFeatures.length}`);
        return allFeatures.map(mapJsonToPublicTransport);

    } catch (error) {
        console.error("Error fetching public transport stops:", error);
        return [];
    }
}
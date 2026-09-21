import { PublicTransport } from "@/types/public-transport";

const degreesToRadians = (degrees: number) => {
    return degrees * (Math.PI / 180);
};

export function getDistanceInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const earthRadius = 6371; // Earth's radius in kilometers  
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadius * c;
}

export function getNearestStops(
    targetLat: number,
    targetLon: number,
    allStops: PublicTransport[],
    limit: number = 3
) :(PublicTransport & { distance: number })[] {
    const sortedStops = allStops

    // First we calculate the distance of each stop from the target location, and sort them by this distance
        .map(stop => ({
            ...stop,
            distance: getDistanceInKm(targetLat, targetLon, stop.latitude, stop.longitude)
        }))
        .sort((a, b) => a.distance - b.distance);

    // Filtration by unique stop names, to avoid showing multiple stops with the same name (like different platforms of the same station)
    const uniqueStops: (PublicTransport & { distance: number })[] = [];
    const seenNames = new Set<string>();

    for (const stop of sortedStops) {
        if (!seenNames.has(stop.name)) {
            seenNames.add(stop.name);
            uniqueStops.push(stop);
        }
        
        // Stop when we have enouqh unique stops
        if (uniqueStops.length === limit) {
            break;
        }
    }

    return uniqueStops;
}
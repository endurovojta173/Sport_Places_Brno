import { NextResponse } from "next/server";
import { fetchSportPlaces } from "@/services/sport-places-api";

// Next.js Route Handler for the GET HTTP method
export async function GET() {
    try {
        // Fetch data from the internal service/API
        const places = await fetchSportPlaces();
        
        // Return the fetched data as a successful JSON response (HTTP 200)
        return NextResponse.json(places);
    } catch (error) {
        // Catch any errors and return a JSON error message with an HTTP 500 status
        return NextResponse.json({ error: "Failed to fetch sport places" }, { status: 500 });
    }
}
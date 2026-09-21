import { NextResponse } from "next/server";
import { getCachedPublicTransport } from "@/services/public-transport-api";

// Next.js Route Handler for the GET HTTP method
export async function GET() {
    try {
        // Retrieve public transport stops, utilizing the server-side cache if available
        const stops = await getCachedPublicTransport();
        
        // Return the retrieved stops as a JSON response
        return NextResponse.json(stops);
    } catch (error) {
        // Handle failures by returning a 500 status code with an error message
        return NextResponse.json({ error: "Failed to fetch stops" }, { status: 500 });
    }
}
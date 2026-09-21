"use client";

import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import { SportPlace } from "@/types/sport-place";
import { CardContextWindow } from "./CardContextWindow";
import CardShell from "./CardShell";

export default function SportPlaceCard({ sportPlace }: { sportPlace: SportPlace }) {
    return (
        <CardShell>
            <div>
                <h2 className="text-xl font-bold mb-1">{sportPlace.title}</h2>
                {CardContextWindow(sportPlace.type)}
                <p className="text-gray-600 text-sm mb-4">{sportPlace.address}</p>
            </div>

            <div className="flex items-center justify-between gap-4">
                <Link
                    href={`/map/${sportPlace.id}`}
                    className="text-blue-500 font-medium hover:underline text-sm"
                >
                    Detail sportoviště →
                </Link>
                <FavoriteButton id={sportPlace.id} />
            </div>
        </CardShell>
    );
}

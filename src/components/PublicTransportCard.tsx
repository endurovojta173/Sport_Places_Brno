"use client";

import { PublicTransport } from "@/types/public-transport";
import { CardContextWindow } from "./CardContextWindow";
import { ExternalButtonType } from "@/types/external-button-type";
import { ButtonExternalSite } from "./ButtonToExternalSite";
import CardShell from "./CardShell";

export default function PublicTransportCard({
    publicTransportStop: publicTransportStop, distance: distance,}: {
    publicTransportStop: PublicTransport; distance: number;
}) {
    return (
        <CardShell data-testid="public-transport-card">
            <div>
                <h2 className="text-xl font-bold mb-1">{publicTransportStop.name}</h2>
                {CardContextWindow(`IDS JMK zóna - ${publicTransportStop.zone_id}`)}
                {CardContextWindow(getAccessibilityText(publicTransportStop.wheelchair_accessible))}
                <div className="text-sm text-gray-500 mb-2">
                    {(distance * 1000.0).toFixed(0)} m od sportoviště
                </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
                {ButtonExternalSite({
                    url: `https://idos.idnes.cz/vlakyautobusymhdvse/spojeni/?t=${encodeURIComponent(publicTransportStop.name)}`,
                    type: ExternalButtonType.IDOS_LINK,
                })}
                {ButtonExternalSite({
                    url: `https://www.google.com/maps/search/?api=1&query=${publicTransportStop.latitude},${publicTransportStop.longitude}`,
                    type: ExternalButtonType.GOOGLE_MAPS_LINK,
                })}
                {ButtonExternalSite({
                    url: `https://mapy.cz/zakladni?x=${publicTransportStop.longitude}&y=${publicTransportStop.latitude}&z=17&source=coor&id=${publicTransportStop.longitude}%2C${publicTransportStop.latitude}`,
                    type: ExternalButtonType.MAPY_CZ_LINK,
                })}
            </div>
        </CardShell>
    );
}

function getAccessibilityText(accessibility: string): string {
    const accessValue = parseInt(accessibility);
    if (accessValue === 1) {
        return "Bezbariérový přístup";
    } else if (accessValue === 2) {
        return "Není bezbariérový";
    } else {
        return "Neznámá dostupnost";
    }
}

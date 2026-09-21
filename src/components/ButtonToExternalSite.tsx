//SSR

import { ExternalButtonType } from "@/types/external-button-type";
import { BusFront, MapIcon } from "lucide-react";

export function ButtonExternalSite({ url, type }: { url: string; type: ExternalButtonType }) {
    let buttonStyles: string;
    let buttonText: string;
    let icon: React.ReactNode;

    switch (type) {
        case ExternalButtonType.IDOS_LINK:
            buttonStyles = "bg-gradient-to-r from-blue-600 to-blue-500 text-white focus-visible:ring-blue-300";
            buttonText = "IDOS";
            icon = <BusFront className="h-4 w-4" />;
            break;
        case ExternalButtonType.GOOGLE_MAPS_LINK:
            buttonStyles = "bg-gradient-to-r from-slate-600 to-slate-500 text-white focus-visible:ring-slate-300";
            buttonText = "Google Maps";
            icon = <MapIcon className="h-4 w-4" />;
            break;
        case ExternalButtonType.MAPY_CZ_LINK:
            buttonStyles = "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white focus-visible:ring-emerald-300";
            buttonText = "Mapy.cz";
            icon = <MapIcon className="h-4 w-4" />;
            break;
        default:
            buttonStyles = "bg-gradient-to-r from-gray-400 to-gray-300 text-white focus-visible:ring-gray-200";
            buttonText = "Go to Page";
            icon = <MapIcon className="h-4 w-4" />;
            break;
    }

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold shadow-sm transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${buttonStyles}`}
        >
            {icon}
            <span className="leading-none">{buttonText}</span>
        </a>
    );
}
                

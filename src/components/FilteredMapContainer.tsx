"use client";

import { useState, useMemo, useCallback } from "react";
import { Search, MapPin } from "lucide-react";
import MapWrapper from "./MapWrapper";
import { SportPlace } from "@/types/sport-place";
import { useFilters } from "@/hooks/useFilters";
import { useSportPlaceFiltering } from "@/hooks/useSportPlaceFiltering";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

{/* todo pridat naseptavac pro pole vyhledavani */}

export default function FilteredMapContainer({ sportPlaces }: { sportPlaces: SportPlace[] }) {
    const { filters, setFilter } = useFilters({ type: "all" });
    const [searchQuery, setSearchQuery] = useState("");
    const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
    const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);

    const { uniqueTypes, filteredPlaces } = useSportPlaceFiltering(sportPlaces, {
        type: filters.type,
        searchQuery,
    });

    const suggestions = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return [];
        return sportPlaces
            .filter(place => place.title.toLowerCase().includes(query))
            .slice(0, 8);
    }, [sportPlaces, searchQuery]);

    const selectedPlace = useMemo(() => {
        if (!selectedPlaceId) return null;
        return sportPlaces.find(place => place.id === selectedPlaceId) ?? null;
    }, [sportPlaces, selectedPlaceId]);

    const handleSelectSuggestion = useCallback((place: SportPlace) => {
        setSearchQuery(place.title);
        setSelectedPlaceId(place.id);
        setIsSuggestionsOpen(false);
        setActiveSuggestionIndex(-1);
    }, []);

    const handleInputChange = (value: string) => {
        setSearchQuery(value);
        setSelectedPlaceId(null);
        setIsSuggestionsOpen(Boolean(value.trim()));
        setActiveSuggestionIndex(-1);
    };

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isSuggestionsOpen || suggestions.length === 0) return;

        if (event.key === "ArrowDown") {
            event.preventDefault();
            setActiveSuggestionIndex(prev => (prev + 1) % suggestions.length);
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();
            setActiveSuggestionIndex(prev => (prev <= 0 ? suggestions.length - 1 : prev - 1));
        }

        if (event.key === "Enter" && activeSuggestionIndex >= 0) {
            event.preventDefault();
            handleSelectSuggestion(suggestions[activeSuggestionIndex]);
        }

        if (event.key === "Escape") {
            setIsSuggestionsOpen(false);
            setActiveSuggestionIndex(-1);
        }
    };

    const renderHighlightedText = (text: string, query: string) => {
        if (!query) return text;
        const lowerText = text.toLowerCase();
        const lowerQuery = query.toLowerCase();
        const matchIndex = lowerText.indexOf(lowerQuery);
        if (matchIndex === -1) return text;

        const before = text.slice(0, matchIndex);
        const match = text.slice(matchIndex, matchIndex + query.length);
        const after = text.slice(matchIndex + query.length);

        return (
            <>
                {before}
                <span className="font-semibold text-red-600">{match}</span>
                {after}
            </>
        );
    };

    const mapData = {
        sportPlaces: filteredPlaces,
        publicTransportStops: null
    };

    return (
        <div className="w-full flex flex-col h-full gap-4">

            {/* div for control bar (search, dropdown menu, number of sport activities) */}
            <div className="flex flex-col md:flex-row items-center gap-4 w-full relative z-10">
                
                {/* search field */}
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Hledat sportoviště..."
                        value={searchQuery}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onFocus={() => setIsSuggestionsOpen(Boolean(searchQuery.trim()))}
                        onBlur={() => setTimeout(() => setIsSuggestionsOpen(false), 120)}
                        onKeyDown={handleInputKeyDown}
                        data-testid="map-search"
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    />
                    {isSuggestionsOpen && suggestions.length > 0 && (
                        <div
                            className="absolute left-0 right-0 top-full z-20 mt-2 rounded-lg border border-gray-200 bg-white shadow-lg"
                            data-testid="map-suggestions"
                        >
                            {suggestions.map((place, index) => (
                                <button
                                    key={place.id}
                                    type="button"
                                    onMouseDown={(event) => event.preventDefault()}
                                    onClick={() => handleSelectSuggestion(place)}
                                    data-testid="map-suggestion-item"
                                    data-suggestion-id={place.id}
                                    data-suggestion-title={place.title}
                                    data-suggestion-lat={place.latitude}
                                    data-suggestion-lng={place.longitude}
                                    data-active={index === activeSuggestionIndex}
                                    className={`flex w-full items-start gap-3 px-4 py-2 text-left text-sm transition ${
                                        index === activeSuggestionIndex ? "bg-red-50" : "hover:bg-gray-50"
                                    }`}
                                >
                                    <span className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full bg-red-500" />
                                    <span className="text-gray-900">
                                        {renderHighlightedText(place.title, searchQuery.trim())}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* dropdown menu for sports */}
                <Select onValueChange={(value) => setFilter("type", value)}>
                    <SelectTrigger
                        className="w-full md:w-45 bg-gray-50 border-gray-200 text-sm"
                        data-testid="map-type-select"
                    >
                        <SelectValue placeholder="Všechny typy" />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={4} className="z-9999">
                        <SelectItem value="all">Všechny typy</SelectItem>
                        {uniqueTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* result counter */}
                <div
                    className="flex items-center gap-2 text-sm text-gray-600 md:ml-auto min-w-max"
                    data-testid="map-results-count"
                >
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span>{filteredPlaces.length} sportovišť</span>
                </div>

            </div>

            {/* map */}
            <div
                className="w-full flex-1 min-h-[70vh] rounded-xl overflow-hidden border"
                data-testid="map-container"
                data-selected-place-id={selectedPlaceId ?? ""}
                data-selected-center-lat={selectedPlace?.latitude ?? ""}
                data-selected-center-lng={selectedPlace?.longitude ?? ""}
            >
                <MapWrapper mapData={mapData} center={selectedPlace ? [selectedPlace.latitude, selectedPlace.longitude] : undefined} activeSportPlaceId={selectedPlaceId} />
            </div>
            
        </div>
    )
};

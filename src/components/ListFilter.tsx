"use client";

import { ListFilterProps } from "@/types/filters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ListFilter({
    types,
    selectedType,
    selectedZone,
    zoneDisabled,
    onFilterChange,
}: ListFilterProps) {
    return (
        <div className="flex gap-4 p-4 mb-6 border rounded-md bg-gray-50 items-center">
            
            {/* sport type select */}
            <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Typ sportoviště</label>
                <Select value={selectedType} onValueChange={(value) => onFilterChange("type", value)}>
                    <SelectTrigger className="w-45 bg-white" data-testid="list-type-select">
                        <SelectValue placeholder="Všechny sportoviště" />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={4}>
                        <SelectItem value="all">Všechny sportoviště</SelectItem>
                        {types.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* zone select */}
            <div className={`flex flex-col gap-1 ${zoneDisabled ? "opacity-60" : ""}`}>
                <label className="text-xs font-semibold text-gray-500 uppercase">Zóna JMK IDS</label>
                {zoneDisabled ? (
                    <p className="text-xs text-gray-400">Zóny nejsou bez zastávek dostupné.</p>
                ) : null}
                <Select
                    value={selectedZone}
                    disabled={zoneDisabled}
                    onValueChange={(value) => onFilterChange("zone", value)}
                >
                    <SelectTrigger className="w-150px bg-white" data-testid="list-zone-select">
                        <SelectValue placeholder="Všechny zóny" />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={4}>
                        <SelectItem value="all">Všechny zóny</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                        <SelectItem value="101">101</SelectItem>
                        <SelectItem value="310">310</SelectItem>
                        <SelectItem value="225">225</SelectItem>
                        <SelectItem value="215">215</SelectItem>
                        <SelectItem value="210">210</SelectItem>
                        <SelectItem value="610">610</SelectItem>
                        <SelectItem value="510">510</SelectItem>
                        <SelectItem value="427">427</SelectItem>
                        <SelectItem value="410">410</SelectItem>
                    </SelectContent>
                </Select>
            </div>

        </div>
    );
}

export interface ListFilterProps {
    types: string[];
    selectedType: string;
    selectedZone: string;
    zoneDisabled?: boolean;
    onFilterChange: (key: "type" | "zone", value: string) => void;
}
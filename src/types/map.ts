import { SportPlace } from "./sport-place";
import { PublicTransport } from "./public-transport";

export interface MapData {
    sportPlaces: SportPlace[];
    publicTransportStops: PublicTransport[] | null;
}
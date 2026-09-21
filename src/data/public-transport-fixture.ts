import { PublicTransport } from "@/types/public-transport"

const publicTransportFixture: PublicTransport[] = [
  {
    id: "pt-201",
    name: "Hlavni nadrazi",
    latitude: 49.1987,
    longitude: 16.6086,
    zone_id: 100,
    location_type: 0,
    wheelchair_accessible: "1",
    platform_code: "1",
  },
  {
    id: "pt-202",
    name: "Ceska",
    latitude: 49.1998,
    longitude: 16.6062,
    zone_id: 100,
    location_type: 0,
    wheelchair_accessible: "2",
    platform_code: "2",
  },
  {
    id: "pt-203",
    name: "Zvonarka",
    latitude: 49.1899,
    longitude: 16.6141,
    zone_id: 100,
    location_type: 0,
    wheelchair_accessible: "1",
    platform_code: "3",
  },
  {
    id: "pt-204",
    name: "Vystaviste",
    latitude: 49.1908,
    longitude: 16.5801,
    zone_id: 100,
    location_type: 0,
    wheelchair_accessible: "0",
    platform_code: "4",
  },
]

export default publicTransportFixture

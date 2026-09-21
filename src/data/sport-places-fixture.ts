import { SportPlace } from "@/types/sport-place"

const sportPlacesFixture: SportPlace[] = [
  {
    id: 101,
    title: "Alpha Arena",
    type: "Stadium",
    address: "Arena Street 1",
    latitude: 49.2001,
    longitude: 16.6051,
    category: "Arena",
    url: "https://example.com/alpha-arena",
    description: "Indoor arena for multiple sports.",
  },
  {
    id: 102,
    title: "Beta Park",
    type: "Park",
    address: "Park Road 12",
    latitude: 49.1975,
    longitude: 16.6123,
    category: "Outdoor",
    url: "https://example.com/beta-park",
    description: "Open park with sport fields.",
  },
  {
    id: 103,
    title: "Gamma Gym",
    type: "Gym",
    address: "Fitness Ave 9",
    latitude: 49.1942,
    longitude: 16.6088,
    category: "Fitness",
    url: "https://example.com/gamma-gym",
    description: "Gym and wellness center.",
  },
  {
    id: 104,
    title: "Delta Park",
    type: "Park",
    address: "Green Lane 4",
    latitude: 49.1931,
    longitude: 16.6024,
    category: "Outdoor",
    url: "https://example.com/delta-park",
    description: "Neighborhood sports park.",
  },
]

export default sportPlacesFixture

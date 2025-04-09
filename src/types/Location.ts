interface Location {
  locationId: number;
  locationName: string;
  sizeLimit: number;
}

interface CreateLocation {
  location: string;
  sizeLimit: number;
}

export type { Location, CreateLocation };

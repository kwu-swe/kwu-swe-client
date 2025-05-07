interface Location {
  locationId: number;
  locationName: string;
  sizeLimit: number;
}

interface CreateLocation {
  location: string;
  sizeLimit: number;
}

interface UpdateLocation extends Partial<Omit<Location, "locationId">> {}

export type { Location, CreateLocation, UpdateLocation };

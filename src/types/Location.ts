interface Location {
  locationId: number;
  locationName: string;
  sizeLimit: number;
}

interface LocationCreate {
  location: string;
  sizeLimit: number;
}

interface LocationUpdate extends Partial<Omit<Location, "locationId">> { }

export type { Location, LocationCreate, LocationUpdate };

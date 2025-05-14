interface Location {
  locationId: number;
  locationName: string;
  sizeLimit: number;
}

interface LocationCreate extends Omit<Location, "locationId"> { }
interface LocationUpdate extends Partial<LocationCreate> { }

export type { Location, LocationCreate, LocationUpdate };

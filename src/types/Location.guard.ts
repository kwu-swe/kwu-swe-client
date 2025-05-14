import { createTypeGuard } from "type-wizard"
import { LocationCreate, LocationUpdate } from "./Location"
export const isLocationCreate = createTypeGuard<LocationCreate>({
	locationName: { type: "string" },
	sizeLimit: { type: "number" }
})
export const isLocationUpdate = createTypeGuard<LocationUpdate>({
	locationName: { type: "string" },
	sizeLimit: { type: "number" }
}).optional()
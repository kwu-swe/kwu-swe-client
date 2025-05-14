import { createTypeGuard } from "type-wizard";
import { UserCreate } from "./User";

const isUserCreate = createTypeGuard<UserCreate>({
	name: { type: "string" },
	code: { type: "string" },
	phoneNumber: { type: "string" },
	password: { type: "string" },
})

export { isUserCreate }
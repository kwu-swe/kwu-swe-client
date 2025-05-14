import { createTypeGuard } from "type-wizard"
import { CourseCreate, CourseUpdate } from "./Course"
export const isCourseCreate = createTypeGuard<CourseCreate>({
	courseName: { type: "string" },
	courseNumber: { type: "string" },
	score: { type: "number" },
	courseType: { type: "string" }
})
export const isCourseUpdate = createTypeGuard<CourseUpdate>({
	courseName: { type: "string" },
	courseNumber: { type: "string" },
	score: { type: "number" },
	courseType: { type: "string" }
}).optional()
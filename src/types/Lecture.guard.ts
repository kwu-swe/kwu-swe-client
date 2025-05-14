import { createTypeGuard, isNumber } from "type-wizard";
import { LectureCreate, LectureTimeAndLocation, LectureUpdate } from "./Lecture";
import { Year } from "./Lecture";

const isYear = createTypeGuard<Year>({
	value: { type: "number" },
	leap: { type: "string" }
})
const isLectureTimeAndLocation = createTypeGuard<LectureTimeAndLocation>({
	day: { type: "string" },
	periods: { type: "array", of: isNumber },
	room: { type: "number" }
})

export const isLectureCreate = createTypeGuard<LectureCreate>({
	courseId: { type: "number" },
	sizeLimit: { type: "number" },
	year: { type: "object", of: isYear },
	lectureStatus: { type: "string" },
	semester: { type: "string" },
	lectureTimeAndLocation: { type: "array", of: isLectureTimeAndLocation }
})
export const isLectureUpdate = createTypeGuard<LectureUpdate>({
	courseId: { type: "number" },
	sizeLimit: { type: "number" },
	year: { type: "object", of: isYear },
	lectureStatus: { type: "string" },
	semester: { type: "string" },
	lectureTimeAndLocation: { type: "array", of: isLectureTimeAndLocation }
}).optional()


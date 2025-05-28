import { createTypeGuard, isNumber } from "type-wizard";
import { LectureCreate, LectureTimeAndLocation, LectureUpdate } from "./Lecture";

const isLectureTimeAndLocation = createTypeGuard<LectureTimeAndLocation>({
	key: { type: "string" },
	value: { type: "number" }
})

export const isLectureCreate = createTypeGuard<LectureCreate>({
	courseId: { type: "number" },
	sizeLimit: { type: "number" },
	year: { type: "number" },
	lectureStatus: { type: "string" },
	semester: { type: "string" },
	lectureTimeAndLocation: { type: "array", of: isLectureTimeAndLocation }
})
export const isLectureUpdate = createTypeGuard<LectureUpdate>({
	courseId: { type: "number" },
	sizeLimit: { type: "number" },
	year: { type: "number" },
	lectureStatus: { type: "string" },
	semester: { type: "string" },
	lectureTimeAndLocation: { type: "array", of: isLectureTimeAndLocation }
}).optional()


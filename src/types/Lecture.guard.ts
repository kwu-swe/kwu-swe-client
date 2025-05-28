import { createTypeGuard, isNumber } from "type-wizard";
import { LectureCreate, LectureTimeAndLocation, LectureUpdate } from "./Lecture";

// export const isLectureCreate = createTypeGuard<LectureCreate>({
// 	courseId: { type: "number" },
// 	sizeLimit: { type: "number" },
// 	year: { type: "number" },
// 	lectureStatus: { type: "string" },
// 	semester: { type: "string" },
// 	lectureTimeAndLocation: { type: "object", of: {} }
// })
// export const isLectureUpdate = createTypeGuard<LectureUpdate>({
// 	courseId: { type: "number" },
// 	sizeLimit: { type: "number" },
// 	year: { type: "number" },
// 	lectureStatus: { type: "string" },
// 	semester: { type: "string" },
// 	lectureTimeAndLocation: { type: "object", of: isLectureTimeAndLocation }
// }).optional()


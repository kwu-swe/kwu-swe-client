import { Course } from "./Course";
import { User } from "./User";

type LectureStatus = "BEFORE" | "IN_PROGRESS" | "COMPLETED";
type Semester = "FIRST_SEMESTER" | "SECOND_SEMESTER" | "SUMMER" | "WINTER";
interface Year {
  value: number;
  leap: string;
}
interface LectureScheduleAndLocation {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
}
export interface UpdateLecture extends Partial<Lecture> {}

export interface Lecture {
  sizeLimit: number;
  year: Year;
  lectureStatus: LectureStatus;
  semester: Semester;
  professor: User;
  courseResponseDto: Omit<Course, "id"> & { courseId: number };
  lectureScheduleAndLocation: LectureScheduleAndLocation[];
}

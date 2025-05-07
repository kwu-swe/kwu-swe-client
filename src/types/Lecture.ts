import { Course } from "./Course";
import { User } from "./User";

type LectureStatus = "BEFORE" | "IN_PROGRESS" | "COMPLETED";
type Semester = "FIRST_SEMESTER" | "SECOND_SEMESTER" | "SUMMER" | "WINTER";
interface Year {
  value: number;
  leap: string;
}
interface LectureScheduleAndLocation {
  day: string; // "월", "화", "수", "목", "금", "토"
  periods: number[]; // [1, 2, 3] 형태로 저장
  room: string;
}
export interface Lecture {
  id: number;
  sizeLimit: number;
  year: Year;
  lectureStatus: LectureStatus;
  semester: Semester;
  professor: User;
  courseResponseDto: Omit<Course, "id"> & { courseId: number };
  lectureScheduleAndLocation: LectureScheduleAndLocation[];
}

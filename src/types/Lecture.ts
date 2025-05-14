import { Course } from "./Course";
import { User } from "./User";

type LectureStatus = "BEFORE" | "IN_PROGRESS" | "COMPLETED";
type Semester = "FIRST_SEMESTER" | "SECOND_SEMESTER" | "SUMMER" | "WINTER";
interface Year {
  value: number;
  leap: string;
}
interface LectureTimeAndLocation {
  day: string; // "월", "화", "수", "목", "금", "토"
  periods: number[]; // [1, 2, 3] 형태로 저장
  room: number;
}

interface LectureAssistantCreate {
  lectureId: number;
  assistantNumber: number;
  professorNumber: number;
}

interface Lecture {
  id: number;
  sizeLimit: number;
  year: Year;
  lectureStatus: LectureStatus;
  semester: Semester;
  professor: User;
  courseResponseDto: Omit<Course, "id"> & { courseId: number };
  lectureScheduleAndLocation: LectureTimeAndLocation[];
}
type LectureAutoSetKeys = "id" | "courseResponseDto" | "professor" | "lectureScheduleAndLocation";
interface LectureCreate extends Omit<Lecture, LectureAutoSetKeys> {
  courseId: number;
  lectureTimeAndLocation: LectureTimeAndLocation;
}
interface LectureUpdate extends Partial<Lecture> { }


export type {
  Lecture,
  LectureUpdate,
  LectureAssistantCreate, LectureCreate,
  LectureStatus, Semester
}
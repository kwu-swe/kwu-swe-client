import { Course } from "./Course";
import { User } from "./User";

type LectureStatus = "BEFORE" | "IN_PROGRESS" | "COMPLETED";
type Semester = "FIRST_SEMESTER" | "SECOND_SEMESTER" | "SUMMER" | "WINTER";

type LectureTime = "MON_1"
interface LectureTimeAndLocation {
  key: LectureTime;
  value: number;
}

interface LectureAssistantCreate {
  lectureId: number;
  assistantNumber: number;
  professorNumber: number;
}

interface Lecture {
  id: number;
  sizeLimit: number;
  year: number;
  lectureStatus: LectureStatus;
  semester: Semester;
  professor: User;
  courseResponseDto: Omit<Course, "id"> & { courseId: number };
  lectureTimeAndLocation: LectureTimeAndLocation[];
}
type LectureAutoSetKeys = "id" | "courseResponseDto" | "professor";
interface LectureCreate extends Omit<Lecture, LectureAutoSetKeys> {
  courseId: number;
}
interface LectureUpdate extends Partial<LectureCreate> { }


export type {
  LectureTimeAndLocation,
  Lecture,
  LectureUpdate,
  LectureAssistantCreate, LectureCreate,
  LectureStatus, Semester
}
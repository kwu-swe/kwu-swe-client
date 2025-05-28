import { Course } from "./Course";
import { User } from "./User";

type LectureStatus = "BEFORE" | "IN_PROGRESS" | "COMPLETED";
type Semester = "FIRST_SEMESTER" | "SECOND_SEMESTER" | "SUMMER" | "WINTER";

type LectureTime =
  | "MON_1"
  | "MON_2"
  | "MON_3"
  | "MON_4"
  | "MON_5"
  | "MON_6"
  | "MON_7"
  | "MON_8"
  | "TUE_1"
  | "TUE_2"
  | "TUE_3"
  | "TUE_4"
  | "TUE_5"
  | "TUE_6"
  | "TUE_7"
  | "TUE_8"
  | "WED_1"
  | "WED_2"
  | "WED_3"
  | "WED_4"
  | "WED_5"
  | "WED_6"
  | "WED_7"
  | "WED_8"
  | "THU_1"
  | "THU_2"
  | "THU_3"
  | "THU_4"
  | "THU_5"
  | "THU_6"
  | "THU_7"
  | "THU_8"
  | "FRI_1"
  | "FRI_2"
  | "FRI_3"
  | "FRI_4"
  | "FRI_5"
  | "FRI_6"
  | "FRI_7"
  | "FRI_8";

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
  lectureId: number;
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
interface LectureUpdate extends Partial<LectureCreate> {}

export type {
  LectureTimeAndLocation,
  Lecture,
  LectureUpdate,
  LectureAssistantCreate,
  LectureCreate,
  LectureStatus,
  Semester,
  LectureTime,
};

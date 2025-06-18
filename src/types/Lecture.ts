import { Course } from "./Course";
import { GradeType } from "./Grade";
import { User } from "./User";

type LectureStatus = "BEFORE" | "IN_PROGRESS" | "COMPLETED";
export const LECTURE_STATUS_LABEL: Record<LectureStatus, string> = {
  "BEFORE": '개강 전',
  "IN_PROGRESS": '진행 중',
  "COMPLETED": "완료"
}

type Semester = "FIRST_SEMESTER" | "SECOND_SEMESTER" | "SUMMER" | "WINTER";
export const SEMESTER_LABEL: Record<Semester, string> = {
  "FIRST_SEMESTER": '1학기',
  "SECOND_SEMESTER": '2학기',
  "SUMMER": '여름학기',
  "WINTER": '겨울학기'
}
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
export const LECTURE_TIME_LABEL: Record<LectureTime, string> = {
  "MON_1": '월요일 1교시',
  "MON_2": '월요일 2교시',
  "MON_3": '월요일 3교시',
  "MON_4": '월요일 4교시',
  "MON_5": '월요일 5교시',
  "MON_6": '월요일 6교시',
  "MON_7": '월요일 7교시',
  "MON_8": '월요일 8교시',
  "TUE_1": '화요일 1교시',
  "TUE_2": '화요일 2교시',
  "TUE_3": '화요일 3교시',
  "TUE_4": '화요일 4교시',
  "TUE_5": '화요일 5교시',
  "TUE_6": '화요일 6교시',
  "TUE_7": '화요일 7교시',
  "TUE_8": '화요일 8교시',
  "WED_1": '수요일 1교시',
  "WED_2": '수요일 2교시',
  "WED_3": '수요일 3교시',
  "WED_4": '수요일 4교시',
  "WED_5": '수요일 5교시',
  "WED_6": '수요일 6교시',
  "WED_7": '수요일 7교시',
  "WED_8": '수요일 8교시',
  "THU_1": '목요일 1교시',
  "THU_2": '목요일 2교시',
  "THU_3": '목요일 3교시',
  "THU_4": '목요일 4교시',
  "THU_5": '목요일 5교시',
  "THU_6": '목요일 6교시',
  "THU_7": '목요일 7교시',
  "THU_8": '목요일 8교시',
  "FRI_1": '금요일 1교시',
  "FRI_2": '금요일 2교시',
  "FRI_3": '금요일 3교시',
  "FRI_4": '금요일 4교시',
  "FRI_5": '금요일 5교시',
  "FRI_6": '금요일 6교시',
  "FRI_7": '금요일 7교시',
  "FRI_8": '금요일 8교시',
}

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
  grade: GradeType;
  sizeLimit: number;
  year: number;
  lectureStatus: LectureStatus;
  semester: Semester;
  createdAt: string;
  professor: User;
  courseResponseDto: Omit<Course, "id"> & { courseId: number };
  lectureTimeAndLocation: Partial<Record<LectureTime, number>>;
}

export interface LecturePlan {
  id: number,
  sizeLimit: number,
  year: number,
  lectureStatus: LectureStatus,
  semester: Semester,
  courseId: number,
  courseName: string,
  professorId: number,
  professorName: string;
  goal: string;
  description: string;
}
export interface LecturePlanCreate extends Omit<LecturePlan, "id" | "sizeLimit" | "year" | "lectureStatus" | "courseId" | "courseName" | "professorId" | "professorName"> { }

type LectureAutoSetKeys = "lectureId" | "courseResponseDto" | "professor" | "createdAt" | "grade";
interface LectureCreate extends Omit<Lecture, LectureAutoSetKeys> {
  courseId: number;
}
interface LectureUpdate extends Partial<LectureCreate> { }

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

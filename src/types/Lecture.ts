interface Course {
  id: number;
  name: string;
  courseNumber: string;
  score: string;
}
type PeriodType = "MON_0" | "MON_1" | "MON_2" | "MON_3" | "MON_4";
type LectureStatus = "BEFORE" | "IN_PROGRESS" | "COMPLETED";
type Semester = "FIRST_SEMESTER" | "SECOND_SEMESTER" | "SUMMER" | "WINTER";
type ProfessorRole = "ROLE_STUDENT" | "ROLE_PROFESSOR" | "ROLE_ADMIN";
interface Year {
  value: number;
  leap: string;
}
interface Professor {
  name: string;
  studentNumber: string;
  phoneNumber: string;
  role: ProfessorRole;
}
interface CourseResponseDto {
  courseId: number;
  courseName: string;
  courseNumber: string;
  score: number;
}
interface LectureScheduleAndLocation {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
}
export interface Lecture {
  sizeLimit: number;
  year: Year;
  lectureStatus: LectureStatus;
  semester: Semester;
  professor: Professor;
  courseResponseDto: CourseResponseDto;
  lectureScheduleAndLocation: LectureScheduleAndLocation[];
}

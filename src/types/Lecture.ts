interface Course {
  id: number;
  name: string;
  courseNumber: string;
  score: string;
}
type PeriodType = "MON_0" | "MON_1" | "MON_2" | "MON_3" | "MON_4";
interface Schedule {
  id: number;
  periodType: PeriodType;
}
type LectureStatus = "BEFORE" | "IN_PROGRESS" | "COMPLETED";
type Semester = "FIRST_SEMESTER" | "SECOND_SEMESTER" | "SUMMER" | "WINTER";
type ProfessorRole = "ROLE_STUDENT" | "ROLE_PROFESSOR" | "ROLE_ADMIN";
interface Professor {
  name: string;
  studentNumber: string;
  phoneNumber: string;
  role: ProfessorRole;
}
export interface Lecture {
  sizeLimit: number;
  year: {
    value: number;
    leap: boolean;
  };
  lectureStatus: LectureStatus;
  semester: Semester;
  professor: Professor;
  courseResponseDto: {
    courseId: number;
    courseName: string;
    courseNumber: string;
    score: number;
  };
  lectureScheduleAndLocation: [
    {
      additionalProp1: "string";
      additionalProp2: "string";
      additionalProp3: "string";
    }
  ];
}

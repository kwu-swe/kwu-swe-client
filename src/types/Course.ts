type CourseType =
  | "MAJOR_REQUIRED"
  | "MAJOR_ELECTIVE"
  | "GENERAL_REQUIRED"
  | "GENERAL_ELECTIVE";

interface Course {
  id: number;
  courseName: string;
  courseNumber: string;
  score: number;
}

interface CreateCourse extends Omit<Course, "id"> {
  courseType: CourseType;
}

export type { Course, CreateCourse, CourseType };

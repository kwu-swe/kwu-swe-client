type CourseType =
  | "MAJOR_REQUIRED"
  | "MAJOR_ELECTIVE"
  | "GENERAL_REQUIRED"
  | "GENERAL_ELECTIVE";

interface Course {
  courseId: number;
  courseName: string;
  courseNumber: string;
  score: number;
  courseType: CourseType;
}

type CourseAutoSetKeys = "courseId" | "courseNumber";
type CourseCreate = Omit<Course, CourseAutoSetKeys>;

interface CourseUpdate extends Partial<CourseCreate> { }

export type { CourseType, Course, CourseCreate, CourseUpdate };

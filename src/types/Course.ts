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
}

type CourseAutoSetKeys = "courseId";
interface CourseCreate extends Omit<Course, CourseAutoSetKeys> {
  courseType: CourseType;
}

interface CourseUpdate extends Partial<CourseCreate> { }

export type { CourseType, Course, CourseCreate, CourseUpdate };

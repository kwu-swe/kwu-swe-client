type CourseType = "MAJOR_REQUIRED" | "MAJOR_ELECTIVE" | "GENERAL_REQUIRED" | "GENERAL_ELECTIVE"

interface Course {
  id: number;
  courseName: string;
  courseNumber: string;
  score: number;
}

type CourseAutoSetKeys = "id"
interface CourseCreate extends Omit<Course, CourseAutoSetKeys> {
  courseType: CourseType;
}

interface UpdateCourse extends Partial<Omit<Course, CourseAutoSetKeys>> { }

export type {
  CourseType,
  Course,
  CourseCreate,
  UpdateCourse
};

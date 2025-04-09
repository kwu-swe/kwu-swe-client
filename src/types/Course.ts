interface Course {
  id: number;
  courseName: string;
  courseNumber: string;
  score: number;
}

interface CreateCourse extends Omit<Course, "id"> {
  courseType: string;
}

export type { Course, CreateCourse };

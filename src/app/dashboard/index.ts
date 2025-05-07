export { default as DashboardPage } from "./page";
export { default as DashboardLayout } from "./layout";

export { default as LecturePage } from "./lectures/page";
export { default as LectureByIdPage } from "./lectures/[lectureId]/page";
// 강의 세부 페이지
export { default as LectureMaterialPage } from "./lectures/[lectureId]/material/[materialId]/page";
export { default as LectureAssignmentPage } from "./lectures/[lectureId]/assignment/[assignmentId]/page";
export { default as LectureAnnouncementPage } from "./lectures/[lectureId]/announcement/[announcement]/page";
// 과목 페이지
export { default as LectureCoursePage } from "./courses/page";

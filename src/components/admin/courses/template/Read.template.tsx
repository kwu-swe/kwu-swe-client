import { Action, Shelf } from "fast-jsx";
import NoData from "@/design/NoData";
import { Course } from "@/types/Course";

export default function ReadTemplate({ courses, isLoading }: { courses: Course[], isLoading: boolean }) {
  if (isLoading) return <div>로딩 중...</div>;
  return (
    <Shelf.Col
      option={{
        boundary: "border-2 border-green-dark",
        height: "h-120 overflow-y-scroll",
        display: 'gap-0'
      }}
    >
      <Action.Replace actions={[[!courses?.length, <NoData key="noData" />]]}>
        {courses?.map((course: Course) => (
          <Shelf.Row
            key={course.courseId}
            option={{
              height: "h-12",
              boundary: "border-b-2 border-green-dark p-4 gap-4",
            }}
          >
            <h3>{course.courseName}</h3>
            <p>번호: {course.courseNumber}</p>
            <p>학점: {course.score}</p>
          </Shelf.Row>
        ))}
      </Action.Replace>
    </Shelf.Col>
  );
}

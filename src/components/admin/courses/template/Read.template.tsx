import { Action, Shelf } from "fast-jsx";
import NoData from "@/design/NoData";
import { Course } from "@/types/Course";

export default function ReadTemplate({ courses, isLoading }: { courses: Course[], isLoading: boolean }) {
  if (isLoading) return <div>로딩 중...</div>;
  return (
    <Shelf.Col
      option={{
        boundary: "border-2 border-green-dark",
        height: "min-h-100",
      }}
    >
      <Action.Replace actions={[[!courses?.length, <NoData key="noData" />]]}>
        {courses?.map((course: Course) => (
          <Shelf.Row
            key={course.id}
            option={{
              boundary: "border-b-2 border-green-dark p-4 gap-4",
            }}
          >
            <h3>{course.courseName}</h3>
            <p>코스 번호: {course.courseNumber}</p>
            <p>학점: {course.score}</p>
          </Shelf.Row>
        ))}
      </Action.Replace>
    </Shelf.Col>
  );
}

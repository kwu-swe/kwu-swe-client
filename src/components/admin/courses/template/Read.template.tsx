import Card from "@/design/Card";
import NoData from "@/design/NoData";
import useCourse from "@/hook/useCourse";
import { Action, Shelf } from "fast-jsx";

export default function ReadTemplate() {
  const { courses } = useCourse();
  return (
    <Shelf.Col
      option={{
        boundary: "border-2 border-green-dark",
        height: "min-h-100",
      }}
    >
      <Action.Replace actions={[[!courses?.length, <NoData key="noData" />]]}>
        {courses?.map((course) => (
          <Card
            key={course.id}
            title={course.courseName}
            contents={[course.courseNumber, String(course.score)]}
          />
        ))}
      </Action.Replace>
    </Shelf.Col>
  );
}

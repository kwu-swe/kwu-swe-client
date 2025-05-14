import { Action, Shelf } from "fast-jsx";
import NoData from "@/design/NoData";
import { Lecture } from "@/types/Lecture";

export default function ReadTemplate({ lectures, isLoading }: { lectures: Lecture[], isLoading: boolean }) {
  if (isLoading) return <div>로딩 중...</div>;
  return (
    <Shelf.Col
      option={{
        boundary: "border-2 border-green-dark",
        height: "h-120 overflow-y-scroll",
        display: 'gap-0'
      }}
    >
      <Action.Replace actions={[[!lectures?.length, <NoData key="noData" />]]}>
        {lectures?.map((lecture: Lecture) => (
          <Shelf.Row
            key={lecture.id}
            option={{
              height: "h-16",
              boundary: "border-b-2 border-green-dark p-4 gap-4",
            }}
          >
            <div className="flex">
              <h3>{lecture.courseResponseDto.courseName}</h3>
              <p>학기: {lecture.semester}</p>
              <p>년도: {lecture.year}</p>
              <p>상태: {lecture.lectureStatus}</p>
              <p>정원: {lecture.sizeLimit}</p>
              <p>교수: {lecture.professor.name}</p>
              <div>
                강의시간:
                {lecture.lectureScheduleAndLocation.map((schedule, index) => (
                  <span key={index}>
                    {schedule.day} {schedule.periods.join(',')}교시 ({schedule.room})
                    {index < lecture.lectureScheduleAndLocation.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
            </div>
          </Shelf.Row>
        ))}
      </Action.Replace>
    </Shelf.Col>
  );
}

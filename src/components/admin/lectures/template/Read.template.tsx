import { Action, Shelf } from "fast-jsx";
import NoData from "@/design/NoData";
import { Lecture } from "@/types/Lecture";

const formatLectureTime = (key: string) => {
  const [day, period] = key.split('_');
  const dayMap: Record<string, string> = {
    MON: '월',
    TUE: '화',
    WED: '수',
    THU: '목',
    FRI: '금',
  };
  return `${dayMap[day]}요일 ${period}교시`;
};

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
                {lecture.lectureTimeAndLocation.map((schedule, index) => (
                  <span key={index}>
                    {formatLectureTime(schedule.key)} ({schedule.value}호)
                    {index < lecture.lectureTimeAndLocation.length - 1 ? ', ' : ''}
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

import { Button, Input, Select } from "fast-jsx";
import { useState } from "react";
import { LectureCreate, LectureStatus, Semester } from "@/types/Lecture";
import useCourse from "@/hook/useCourse";
import useLocation from "@/hook/useLocation";

export default function CreateTemplate({
  post,
}: {
  post: (data: LectureCreate) => void;
}) {
  const { courses } = useCourse();
  const { locations } = useLocation();
  const [sizeLimit, setSizeLimit] = useState<string>();
  const [year, setYear] = useState<string>();
  const [semester, setSemester] = useState<Semester>();
  const [courseId, setCourseId] = useState<string>();
  const [day, setDay] = useState<string>();
  const [periods, setPeriods] = useState<string>();
  const [room, setRoom] = useState<string>();

  const handleSubmit = () => {
    if (!sizeLimit || !year || !semester || !courseId || !day || !periods || !room || !Number(room)) return;

    post({
      sizeLimit: +sizeLimit,
      year: +year,
      lectureStatus: "BEFORE",
      semester,
      courseId: +courseId,
      lectureTimeAndLocation: {
        day,
        periods: periods.split(',').map(p => +p),
        room: +room
      }
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <Input
        state={[sizeLimit, setSizeLimit]}
        placeholder="정원"
        type="number"
      />
      <Input
        state={[year, setYear]}
        placeholder="년도"
        type="number"
      />
      <Select
        state={[semester, setSemester] as any}
        placeholder="학기"
        selectOptions={[
          { value: "FIRST_SEMESTER", title: "1학기" },
          { value: "SECOND_SEMESTER", title: "2학기" },
          { value: "SUMMER", title: "여름학기" },
          { value: "WINTER", title: "겨울학기" },
        ]}
      />
      <Select
        state={[courseId, setCourseId]}
        placeholder="과목 선택"
        selectOptions={courses.map(course => ({
          value: String(course.courseId),
          title: course.courseName
        }))}
      />
      <Select
        state={[day, setDay]}
        placeholder="요일"
        selectOptions={[
          { value: "월", title: "월요일" },
          { value: "화", title: "화요일" },
          { value: "수", title: "수요일" },
          { value: "목", title: "목요일" },
          { value: "금", title: "금요일" },
          { value: "토", title: "토요일" },
        ]}
      />
      <Input
        state={[periods, setPeriods]}
        placeholder="교시 (쉼표로 구분, 예: 1,2,3)"
      />
      <Select
        state={[room, setRoom]}
        placeholder="강의실"
        selectOptions={locations.map(location => ({
          value: +(location.locationId),
          title: location.locationName
        }))}
      />
      <Button
        title="등록"
        onClick={handleSubmit}
      />
    </div>
  );
}

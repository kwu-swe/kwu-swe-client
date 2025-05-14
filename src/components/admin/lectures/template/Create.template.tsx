import { Button, Input, Select } from "fast-jsx";
import { useState } from "react";
import { LectureCreate, LectureStatus, Semester } from "@/types/Lecture";
import useCourse from "@/hook/useCourse";

export default function CreateTemplate({
  post,
}: {
  post: (data: LectureCreate) => void;
}) {
  const { courses } = useCourse();
  const [sizeLimit, setSizeLimit] = useState<string>();
  const [yearValue, setYearValue] = useState<string>();
  const [yearLeap, setYearLeap] = useState<string>();
  const [lectureStatus, setLectureStatus] = useState<LectureStatus>();
  const [semester, setSemester] = useState<Semester>();
  const [courseId, setCourseId] = useState<string>();
  const [day, setDay] = useState<string>();
  const [periods, setPeriods] = useState<string>();
  const [room, setRoom] = useState<string>();

  const handleSubmit = () => {
    if (!sizeLimit || !yearValue || !yearLeap || !lectureStatus || !semester || !courseId || !day || !periods || !room) return;

    post({
      sizeLimit: +sizeLimit,
      year: {
        value: +yearValue,
        leap: yearLeap
      },
      lectureStatus,
      semester,
      courseId: +courseId,
      lectureTimeAndLocation: {
        day,
        periods: periods.split(',').map(p => +p),
        room: 1
      },
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
        state={[yearValue, setYearValue]}
        placeholder="년도"
        type="number"
      />
      <Select
        state={[yearLeap, setYearLeap]}
        placeholder="학기 구분"
        selectOptions={[
          { value: "1", title: "1학기" },
          { value: "2", title: "2학기" },
        ]}
      />
      <Select
        state={[lectureStatus, setLectureStatus] as any}
        placeholder="강의 상태"
        selectOptions={[
          { value: "BEFORE", title: "시작 전" },
          { value: "IN_PROGRESS", title: "진행 중" },
          { value: "COMPLETED", title: "완료" },
        ]}
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
      <Input
        state={[room, setRoom]}
        placeholder="강의실"
      />
      <Button
        title="등록"
        onClick={handleSubmit}
      />
    </div>
  );
}

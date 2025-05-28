import { Button, Input, Select } from "fast-jsx";
import { useState } from "react";
import { LectureCreate, LectureStatus, Semester, LectureTime } from "@/types/Lecture";
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
  const [selectedTimes, setSelectedTimes] = useState<Array<{ time: LectureTime; location: number }>>([]);
  const [selectedTime, setSelectedTime] = useState<string>();
  const [selectedLocation, setSelectedLocation] = useState<string>();

  const handleAddTime = (time: LectureTime, location: number) => {
    setSelectedTimes(prev => [...prev, { time, location }]);
    setSelectedTime(undefined);
    setSelectedLocation(undefined);
  };

  const handleRemoveTime = (index: number) => {
    setSelectedTimes(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!sizeLimit || !year || !semester || !courseId || selectedTimes.length === 0) return;

    post({
      sizeLimit: +sizeLimit,
      year: +year,
      lectureStatus: "BEFORE",
      semester,
      courseId: +courseId,
      lectureTimeAndLocation: selectedTimes.map(({ time, location }) => ({
        key: time,
        value: location
      }))
    });
  };

  const timeOptions = [
    "MON_1", "MON_2", "MON_3", "MON_4", "MON_5", "MON_6", "MON_7", "MON_8",
    "TUE_1", "TUE_2", "TUE_3", "TUE_4", "TUE_5", "TUE_6", "TUE_7", "TUE_8",
    "WED_1", "WED_2", "WED_3", "WED_4", "WED_5", "WED_6", "WED_7", "WED_8",
    "THU_1", "THU_2", "THU_3", "THU_4", "THU_5", "THU_6", "THU_7", "THU_8",
    "FRI_1", "FRI_2", "FRI_3", "FRI_4", "FRI_5", "FRI_6", "FRI_7", "FRI_8"
  ] as LectureTime[];

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
      
      {/* 강의 시간 및 장소 선택 */}
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">강의 시간 및 장소</h3>
        {selectedTimes.map((time, index) => (
          <div key={index} className="flex items-center gap-2">
            <span>
              {time.time.split('_')[0]} {time.time.split('_')[1]}교시 - {time.location}호
            </span>
            <Button
              title="삭제"
              onClick={() => handleRemoveTime(index)}
            />
          </div>
        ))}
        <div className="flex gap-2">
          <Select
            state={[selectedTime, setSelectedTime]}
            placeholder="시간 선택"
            selectOptions={timeOptions.map(time => ({
              value: time,
              title: `${time.split('_')[0]} ${time.split('_')[1]}교시`
            }))}
          />
          <Select
            state={[selectedLocation, setSelectedLocation]}
            placeholder="강의실 선택"
            selectOptions={locations.map(location => ({
              value: String(location.locationId),
              title: `${location.locationName}`
            }))}
          />
          <Button
            title="추가"
            onClick={() => {
              if (selectedTime && selectedLocation) {
                handleAddTime(selectedTime as LectureTime, +selectedLocation);
              }
            }}
          />
        </div>
      </div>

      <Button
        title="등록"
        onClick={handleSubmit}
      />
    </div>
  );
}

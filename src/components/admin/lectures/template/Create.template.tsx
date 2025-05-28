import { Shelf } from "fast-jsx";
import { cn } from "fast-jsx/util";
import { Button, Input, Select } from "fast-jsx";
import { Course } from "@/types/Course";
import { LectureCreate, LectureTime, Semester } from "@/types/Lecture";
import useCourse from "@/hook/useCourse";
import useLocation from "@/hook/useLocation";
import { useState } from "react";

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
  const [selectedTimes, setSelectedTimes] = useState<
    Array<{ time: LectureTime; location: number }>
  >([]);
  const [selectedTime, setSelectedTime] = useState<string>();
  const [selectedLocation, setSelectedLocation] = useState<string>();

  const handleAddTime = (time: LectureTime, location: number) => {
    setSelectedTimes((prev) => [...prev, { time, location }]);
    setSelectedTime(undefined);
    setSelectedLocation(undefined);
  };

  const handleRemoveTime = (index: number) => {
    setSelectedTimes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (
      !sizeLimit ||
      !year ||
      !semester ||
      !courseId ||
      selectedTimes.length === 0
    )
      return;

    post({
      sizeLimit: +sizeLimit,
      year: +year,
      lectureStatus: "BEFORE",
      semester,
      courseId: +courseId,
      lectureTimeAndLocation: selectedTimes.reduce(
        (acc, { time, location }) => ({ ...acc, [time]: location }),
        {}
      ) as Record<LectureTime, number>,
    });
  };

  const timeOptions = [
    "MON_1",
    "MON_2",
    "MON_3",
    "MON_4",
    "MON_5",
    "MON_6",
    "MON_7",
    "MON_8",
    "TUE_1",
    "TUE_2",
    "TUE_3",
    "TUE_4",
    "TUE_5",
    "TUE_6",
    "TUE_7",
    "TUE_8",
    "WED_1",
    "WED_2",
    "WED_3",
    "WED_4",
    "WED_5",
    "WED_6",
    "WED_7",
    "WED_8",
    "THU_1",
    "THU_2",
    "THU_3",
    "THU_4",
    "THU_5",
    "THU_6",
    "THU_7",
    "THU_8",
    "FRI_1",
    "FRI_2",
    "FRI_3",
    "FRI_4",
    "FRI_5",
    "FRI_6",
    "FRI_7",
    "FRI_8",
  ] as LectureTime[];

  const cardStyles = {
    base: "flex flex-col bg-white border border-gray-100 overflow-hidden",
    rounded: "rounded-xl",
    shadow: "shadow-card",
    body: "flex flex-col p-6 md:p-8",
    header:
      "flex flex-row justify-between items-center p-4 border-b border-gray-100",
    title: "text-lg font-semibold text-gray-900",
  };

  const formStyles = {
    group: "flex flex-col gap-4",
    label: "text-sm font-medium text-gray-700",
    input:
      "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kw-brown/20",
    select: "w-full",
    timeList: "mt-4 space-y-2",
    timeItem: "flex items-center justify-between p-3 bg-gray-50 rounded-lg",
    timeText: "text-sm text-gray-600",
    addButton:
      "bg-kw-brown text-white px-4 py-2 rounded-lg hover:bg-kw-brown/90 transition-colors",
    removeButton: "text-red-500 hover:text-red-600 transition-colors",
    submitButton:
      "mt-6 w-full bg-kw-brown text-white px-4 py-3 rounded-lg hover:bg-kw-brown/90 transition-colors font-medium",
  };

  return (
    <Shelf.Col
      option={{
        boundary: cn(cardStyles.base, cardStyles.rounded, cardStyles.shadow),
      }}
    >
      <Shelf.Row
        option={{
          boundary: cardStyles.header,
        }}
      >
        <h2 className={cardStyles.title}>강의 등록</h2>
      </Shelf.Row>
      <Shelf.Col
        option={{
          boundary: cardStyles.body,
          display: formStyles.group,
        }}
      >
        <Shelf.Col>
          <label className={formStyles.label}>정원</label>
          <Input
            state={[sizeLimit, setSizeLimit]}
            placeholder="정원"
            type="number"
            option={{
              boundary: formStyles.input,
            }}
          />
        </Shelf.Col>
        <Shelf.Col>
          <label className={formStyles.label}>년도</label>
          <Input
            state={[year, setYear]}
            placeholder="년도"
            type="number"
            option={{
              boundary: formStyles.input,
            }}
          />
        </Shelf.Col>
        <Shelf.Col>
          <label className={formStyles.label}>학기</label>
          <Select
            state={[semester, setSemester] as any}
            placeholder="학기"
            option={{
              boundary: formStyles.select,
            }}
            selectOptions={[
              { value: "FIRST_SEMESTER", title: "1학기" },
              { value: "SECOND_SEMESTER", title: "2학기" },
              { value: "SUMMER", title: "여름학기" },
              { value: "WINTER", title: "겨울학기" },
            ]}
          />
        </Shelf.Col>
        <Shelf.Col>
          <label className={formStyles.label}>과목</label>
          <Select
            state={[courseId, setCourseId]}
            placeholder="과목 선택"
            option={{
              boundary: formStyles.select,
            }}
            selectOptions={courses.map((course) => ({
              value: String(course.courseId),
              title: course.courseName,
            }))}
          />
        </Shelf.Col>

        <Shelf.Col>
          <label className={formStyles.label}>강의 시간 및 장소</label>
          <Shelf.Col
            option={{
              boundary: formStyles.timeList,
            }}
          >
            {selectedTimes.map((time, index) => (
              <Shelf.Row
                key={index}
                option={{
                  boundary: formStyles.timeItem,
                }}
              >
                <span className={formStyles.timeText}>
                  {time.time.split("_")[0]} {time.time.split("_")[1]}교시 -{" "}
                  {time.location}호
                </span>
                <Button
                  title="삭제"
                  onClick={() => handleRemoveTime(index)}
                  option={{
                    boundary: formStyles.removeButton,
                  }}
                />
              </Shelf.Row>
            ))}
            <Shelf.Row
              option={{
                boundary: "flex gap-2 mt-2",
              }}
            >
              <Select
                state={[selectedTime, setSelectedTime]}
                placeholder="시간 선택"
                option={{
                  boundary: formStyles.select,
                }}
                selectOptions={timeOptions.map((time) => ({
                  value: time,
                  title: `${time.split("_")[0]} ${time.split("_")[1]}교시`,
                }))}
              />
              <Select
                state={[selectedLocation, setSelectedLocation]}
                placeholder="강의실 선택"
                option={{
                  boundary: formStyles.select,
                }}
                selectOptions={locations.map((location) => ({
                  value: String(location.locationId),
                  title: `${location.locationName}`,
                }))}
              />
              <Button
                title="추가"
                onClick={() => {
                  if (selectedTime && selectedLocation) {
                    handleAddTime(
                      selectedTime as LectureTime,
                      +selectedLocation
                    );
                  }
                }}
                option={{
                  boundary: formStyles.addButton,
                }}
              />
            </Shelf.Row>
          </Shelf.Col>
        </Shelf.Col>

        <Button
          title="등록"
          onClick={handleSubmit}
          option={{
            boundary: formStyles.submitButton,
          }}
        />
      </Shelf.Col>
    </Shelf.Col>
  );
}

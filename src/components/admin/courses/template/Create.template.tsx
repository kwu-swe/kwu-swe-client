import { Button, Input, Select } from "fast-jsx";
import { useState } from "react";
import { CourseCreate, CourseType } from "@/types/Course";

export default function CreateTemplate(
  { post }: { post: (data: CourseCreate) => void }
) {
  const [courseName, setCourseName] = useState<string>();
  const [courseNumber, setCourseNumber] = useState<string>();
  const [score, setScore] = useState<string>();
  const [courseType, setCourseType] = useState<CourseType>();

  return (
    <div>
      <Input
        state={[courseName, setCourseName]}
        placeholder="코스 이름"
      />
      <Input
        state={[courseNumber, setCourseNumber]}
        placeholder="코스 번호"
      />
      <Select
        state={[courseType, setCourseType] as any}
        placeholder="코스 타입"
        selectOptions={[
          { value: "MAJOR_REQUIRED", title: "전공 필수" },
          { value: "MAJOR_ELECTIVE", title: "전공 선택" },
          { value: "GENERAL_REQUIRED", title: "공통 필수" },
          { value: "GENERAL_ELECTIVE", title: "공통 선택" },
        ]}

      />
      <Input
        state={[score, setScore]}
        placeholder="부여 학점"
        onKeyDown={(e) => {
          if (e.key === "Enter" && courseName && courseNumber && score && courseType) {
            post({
              courseName,
              courseNumber,
              score: +score,
              courseType: courseType!
            });
          }
        }}
      />
      <Button
        title="등록"
        onClick={() => {
          if (!courseName || !courseNumber || !score || !courseType) return;
          post({
            courseName,
            courseNumber,
            score: +score,
            courseType
          });
        }}
      />
    </div>
  );
}

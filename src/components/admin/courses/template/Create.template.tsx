import useCourse from "@/hook/useCourse";
import { Button, Input } from "fast-jsx";
import { useState } from "react";

export default function CreateTemplate() {
  const [courseName, setCourseName] = useState<string>();
  const [courseNumber, setCourseNumber] = useState<string>();
  const [score, setScore] = useState<string>();
  const [courseType, setCourseType] = useState<string>();
  const { mutate } = useCourse();
  return (
    <div>
      <Input state={[courseName, setCourseName]} placeholder="courseName" />
      <Input
        state={[courseNumber, setCourseNumber]}
        placeholder="courseNumber"
      />
      <Input state={[score, setScore]} placeholder="score" />
      <Input state={[courseType, setCourseType]} placeholder="courseType" />
      <Button
        title="등록"
        onClick={() => {
          if (!courseName || !courseNumber || !score || !courseType) return;
          mutate({
            courseName,
            courseNumber,
            score: +score,
            courseType,
          });
        }}
      />
    </div>
  );
}

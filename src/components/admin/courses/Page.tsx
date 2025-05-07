import { Button } from "fast-jsx";
import ReadTemplate from "./template/Read.template";
import CreateTemplate from "./template/Create.template";
import useCourse from "@/hook/useCourse";

export default function CoursePage() {
  const { courses, post, isCreateMode, setIsCreateMode } = useCourse();

  return (
    <div>
      <Button title="코스 생성" onClick={() => setIsCreateMode(true)} />
      <ReadTemplate courses={courses} isLoading={false} />
      {isCreateMode && <CreateTemplate post={post} />}
    </div>
  );
}

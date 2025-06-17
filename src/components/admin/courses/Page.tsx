import { Button } from "fast-jsx";
import ReadTemplate from "./template/Read.template";
import CreateTemplate from "./template/Create.template";
import useCourse from "@/hook/useCourse";
import PageTitle from "../(common)/organisms/PageTitle.organism";

export default function CoursePage() {
  const { courses, post, isCreateMode, setIsCreateMode } = useCourse();

  return (
    <div className="w-full min-h-screen p-6 md:p-8">
      <PageTitle
        title="과목 관리"
        subtitle="학과별 과목을 관리하고 교육과정을 설정합니다."
      />

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            교육과정 및 과목 현황
          </h2>
          <Button title="코스 생성" onClick={() => setIsCreateMode(true)} />
        </div>

        <ReadTemplate courses={courses} isLoading={false} />
        {isCreateMode && <CreateTemplate post={post} />}
      </div>
    </div>
  );
}

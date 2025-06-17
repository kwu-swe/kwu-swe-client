import { Button } from "fast-jsx";
import ReadTemplate from "./template/Read.template";
import CreateTemplate from "./template/Create.template";
import useLecture from "@/hook/useLecture";
import PageTitle from "../(common)/organisms/PageTitle.organism";

export default function LecturePage() {
  const { lectures, post, isCreateMode, setIsCreateMode, isLoading } =
    useLecture();

  return (
    <div className="w-full min-h-screen p-6 md:p-8">
      <PageTitle
        title="강의 관리"
        subtitle="강의 개설, 수정, 삭제 및 강의 정보를 관리합니다."
      />

      <div className="space-y-6">
        <ReadTemplate lectures={lectures} isLoading={isLoading} />
        {isCreateMode && <CreateTemplate post={post} />}
      </div>
    </div>
  );
}

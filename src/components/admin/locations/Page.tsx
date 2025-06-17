import useLocation from "@/hook/useLocation";
import { Action, Button } from "fast-jsx";
import ReadTemplate from "./template/Read.template";
import CreateTemplate from "./template/Create.template";
import PageTitle from "../(common)/organisms/PageTitle.organism";

export default function LocationPage() {
  const { locations, post, isCreateMode, setIsCreateMode, isLoading } =
    useLocation();

  return (
    <div className="w-full min-h-screen p-6 md:p-8">
      <PageTitle
        title="강의실 관리"
        subtitle="강의실 정보를 관리하고 예약 시스템을 운영합니다."
      />

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            개설된 강의실 현황
          </h2>
          <Button title="강의실 생성" onClick={() => setIsCreateMode(true)} />
        </div>

        <ReadTemplate locations={locations} isLoading={isLoading} />
        {isCreateMode && <CreateTemplate post={post} />}
      </div>
    </div>
  );
}

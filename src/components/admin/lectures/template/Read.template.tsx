import { Action } from "fast-jsx";
import NoData from "@/design/NoData";
import { Lecture } from "@/types/Lecture";
import LectureBox from "../organism/LectureBox.organism";

export default function ReadTemplate({
  lectures,
  isLoading,
}: {
  lectures: Lecture[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-pulse text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">강의 목록</h2>
          <div className="text-sm text-gray-500">
            총 {lectures?.length || 0}개의 강의
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <Action.Replace actions={[[!lectures?.length, <NoData key="noData" />]]}>
          <div className="space-y-2">
            {lectures?.map((lecture: Lecture) => (
              <LectureBox key={lecture.lectureId} lecture={lecture} />
            ))}
          </div>
        </Action.Replace>
      </div>
    </div>
  );
}

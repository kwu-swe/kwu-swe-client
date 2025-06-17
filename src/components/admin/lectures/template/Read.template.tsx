import { Action } from "fast-jsx";
import { useState } from "react";
import NoData from "@/design/NoData";
import { Course } from "@/types/Course";
import { Lecture, LectureCreate } from "@/types/Lecture";
import { User } from "@/types/User";
import LectureBox from "../organism/LectureBox.organism";
import LectureCreateModal from "../molecule/LectureCreateModal.molecule";
import useLocation from "@/hook/useLocation";

export default function ReadTemplate({
  lectures,
  isLoading,
}: {
  lectures: Lecture[];
  isLoading: boolean;
}) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { locations } = useLocation()

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
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              총 {lectures?.length || 0}개의 강의
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 transition-colors"
            >
              강의 생성
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <Action.Replace actions={[[!lectures?.length, <NoData key="noData" />]]}>
          <div className="space-y-4">
            {lectures?.map((lecture: Lecture) => (
              <div key={lecture.lectureId} className="flex items-start gap-2">
                <LectureBox locations={locations} lecture={lecture} />

              </div>
            ))}
          </div>
        </Action.Replace>
      </div>
      {isCreateModalOpen && <LectureCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />}
    </div>
  );
}

import { Grade, GradeType } from "@/types/Grade";
import { useGrade } from "@/hook/useLecture";
import { useState } from "react";

interface Props {
  lectureId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function GradeListModal({ lectureId, isOpen, onClose }: Props) {
  const { grades, isLoading, postGrade } = useGrade({ lectureId });
  const [selectedStudentId, setSelectedStudentId] = useState<number>();
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold">성적 관리</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
          ) : grades?.length ? (
            <div className="space-y-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">학번</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">이름</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">성적</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {grades.map((grade) => (
                    <tr key={grade.studentId}>
                      <td className="px-4 py-2 text-sm text-gray-900">{grade.code}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{grade.name}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{grade.grade || "-"}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => {
                            setSelectedStudentId(grade.studentId);
                            setIsGradeModalOpen(true);
                          }}
                          className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                        >
                          성적입력
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">등록된 학생이 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      {isGradeModalOpen && selectedStudentId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold">성적 입력</h3>
              <button
                onClick={() => setIsGradeModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  성적
                </label>
                <select
                  onChange={(e) => {
                    const grade = e.target.value as GradeType;
                    postGrade(grade);
                    setIsGradeModalOpen(false);
                  }}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
                >
                  <option value="">선택하세요</option>
                  <option value="A_PLUS">A+</option>
                  <option value="A_ZERO">A0</option>
                  <option value="B_PLUS">B+</option>
                  <option value="B_ZERO">B0</option>
                  <option value="C_PLUS">C+</option>
                  <option value="C_ZERO">C0</option>
                  <option value="D_PLUS">D+</option>
                  <option value="D_ZERO">D0</option>
                  <option value="F">F</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

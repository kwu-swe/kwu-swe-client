import { useState } from "react";
import { usePlan } from "@/hook/useLecture";
import { LecturePlanCreate } from "@/types/Lecture";

interface Props {
  lectureId: number;
  isOpen: boolean;
  onClose: () => void;
  mode?: 'create' | 'edit';
  initialData?: {
    planId: number;
    goal: string;
    description: string;
  };
}

export default function LecturePlanModal({ 
  lectureId, 
  isOpen, 
  onClose,
  mode = 'create',
  initialData
}: Props) {
  const [goal, setGoal] = useState(initialData?.goal || "");
  const [description, setDescription] = useState(initialData?.description || "");

  const { postPlan, updatePlan, deletePlan, isUpdating, isDeleting } = usePlan({ lectureId });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const plan: LecturePlanCreate = {
        goal,
        description,
        semester: "FIRST_SEMESTER"
      };

      if (mode === 'create') {
        await postPlan(plan);
      } else if (mode === 'edit' && initialData) {
        await updatePlan({ planId: initialData.planId, plan });
      }
      onClose();
      setGoal("");
      setDescription("");
    } catch (error) {
      console.error("강의계획서 등록 실패:", error);
      alert("강의계획서 등록에 실패했습니다.");
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              {mode === 'create' ? '강의계획서 등록' : '강의계획서 수정'}
            </h3>
            {mode === 'edit' && (
              <button
                type="button"
                onClick={async () => {
                  if (initialData && window.confirm('정말 삭제하시겠습니까?')) {
                    await deletePlan(initialData.planId);
                    onClose();
                  }
                }}
                className="text-sm text-red-600 hover:text-red-700"
                disabled={isDeleting}
              >
                삭제
              </button>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              교과목표
            </label>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md h-32"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              교과내용
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md h-64"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
              disabled={isUpdating || isDeleting}
            >
              {mode === 'create' ? '등록' : '수정'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";
import { usePlan } from "@/hook/useLecture";
import { LecturePlanCreate } from "@/types/Lecture";

interface Props {
  lectureId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function LecturePlanModal({ lectureId, isOpen, onClose }: Props) {
  const [goal, setGoal] = useState("");
  const [description, setDescription] = useState("");

  const { postPlan } = usePlan({ lectureId });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const plan: LecturePlanCreate = {
        goal,
        description,
        semester: "FIRST_SEMESTER"
      };

      await postPlan(plan);
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">강의계획서 등록</h3>
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
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

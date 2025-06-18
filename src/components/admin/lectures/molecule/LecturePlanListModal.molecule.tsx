import { LecturePlan } from "@/types/Lecture";
import { usePlan } from "@/hook/useLecture";
import { useState } from "react";
import LecturePlanModal from "./LecturePlanModal.molecule";

interface Props {
  lectureId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function LecturePlanListModal({ lectureId, isOpen, onClose }: Props) {
  const { plan, isLoading } = usePlan({ lectureId });
  const [selectedPlan, setSelectedPlan] = useState<LecturePlan | null>(null);

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
            <h3 className="text-lg font-semibold">강의계획서</h3>
          </div>
        </div>

        <div className="p-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : !plan ? (
            <div className="text-center text-gray-500 py-8">
              등록된 강의계획서가 없습니다.
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">교과목표</h4>
                  <p className="text-sm text-gray-600 whitespace-pre-line mt-1">
                    {plan.goal}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedPlan(plan)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    수정
                  </button>
                </div>
              </div>
              <div>
                <h4 className="font-medium">교과내용</h4>
                <p className="text-sm text-gray-600 whitespace-pre-line mt-1">
                  {plan.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedPlan && (
        <LecturePlanModal
          isOpen={true}
          onClose={() => setSelectedPlan(null)}
          lectureId={lectureId}
          mode="edit"
          initialData={{
            planId: selectedPlan.id,
            goal: selectedPlan.goal,
            description: selectedPlan.description,
          }}
        />
      )}
    </div>
  );
}

import { usePlan } from "@/hook/useLecture";

interface Props {
  lectureId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function LecturePlanViewModal({ lectureId, isOpen, onClose }: Props) {
  const { plan, isLoading } = usePlan({ lectureId });

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onMouseDown={(e) => e.preventDefault()}
    >
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold">강의계획서</h3>
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
          ) : plan ? (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">교과목표</h4>
                <p className="text-sm text-gray-900 whitespace-pre-wrap">{plan.goal}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">교과내용</h4>
                <p className="text-sm text-gray-900 whitespace-pre-wrap">{plan.description}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">등록된 강의계획서가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

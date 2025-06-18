import useLecture, { usePlan } from '@/hook/useLecture';
import type { LecturePlan } from '@/types/Lecture';

interface LecturePlanProps {
  lectureId: number;
  className?: string;
}

export default function LecturePlan({ lectureId, className = '' }: LecturePlanProps) {
  const { plan, isLoading } = usePlan({ lectureId }) as { plan: LecturePlan | undefined; isLoading: boolean };

  if (isLoading) {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
        <p className="text-gray-500 text-center">강의 계획서가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      <h3 className="text-lg font-medium text-gray-900 mb-4">강의 계획서</h3>
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">강의 목표</h4>
          <p className="text-gray-600 text-sm whitespace-pre-line">{plan.goal}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">강의 내용</h4>
          <p className="text-gray-600 text-sm whitespace-pre-line">{plan.description}</p>
        </div>
      </div>
    </div>
  );
}

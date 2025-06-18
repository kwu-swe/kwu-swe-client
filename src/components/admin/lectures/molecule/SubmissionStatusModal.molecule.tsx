import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useSubmissionProfessor } from "@/hook/useSubmission";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { SubmissionProfessor } from "@/types/Assignment";
import SubmissionDetailModal from "./SubmissionDetailModal.molecule";

interface Props {
  assignmentId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function SubmissionStatusModal({ assignmentId, isOpen, onClose }: Props) {
  const [selectedStudent, setSelectedStudent] = useState<number | undefined>();
  const [showDetailModal, setShowDetailModal] = useState(false);

  const { submissions, isLoading, submissionByStudent } = useSubmissionProfessor(assignmentId, selectedStudent);

  const handleStudentClick = (studentId: number) => {
    setSelectedStudent(studentId);
    setShowDetailModal(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "SUBMITTED":
        return {
          text: "제출 완료",
          color: "text-green-600 bg-green-100"
        };
      case "NOT_SUBMITTED":
        return {
          text: "미제출",
          color: "text-red-600 bg-red-100"
        };
      case "LATE":
        return {
          text: "지각 제출",
          color: "text-yellow-600 bg-yellow-100"
        };
      default:
        return {
          text: "알 수 없음",
          color: "text-gray-600 bg-gray-100"
        };
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <Dialog.Title className="text-lg font-semibold text-gray-900">
                        과제 제출 현황
                      </Dialog.Title>
                      <p className="mt-1 text-sm text-gray-500">
                        학생들의 과제 제출 상태를 확인할 수 있습니다.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500 transition-colors"
                      onClick={onClose}
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  {isLoading ? (
                    <div className="py-8 text-center text-gray-500">로딩 중...</div>
                  ) : submissions?.result.length === 0 ? (
                    <div className="py-8 text-center text-gray-500">제출된 과제가 없습니다.</div>
                  ) : (
                    <div className="mt-4">
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">이름</th>
                              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">제출 상태</th>
                              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">액션</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {submissions?.result.map((submission: SubmissionProfessor) => (
                              <tr key={submission.studentId} className="hover:bg-gray-50">
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                                  {submission.studentName}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                  {(() => {
                                    const badge = getStatusBadge(submission.submitStatus);
                                    return (
                                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${badge.color}`}>
                                        {badge.text}
                                      </span>
                                    );
                                  })()}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                  {(submission.submitStatus === "SUBMITTED" || submission.submitStatus === "LATE") && (
                                    <button
                                      onClick={() => handleStudentClick(submission.studentId)}
                                      className="text-kw-brown hover:text-kw-brown/80 font-medium transition-colors"
                                    >
                                      과제 확인
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {showDetailModal && (
        <SubmissionDetailModal
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedStudent(undefined);
          }}
          submission={submissionByStudent?.result}
          mode="view"
        />
      )}
    </>
  );
}

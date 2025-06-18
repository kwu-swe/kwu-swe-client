import { useState, useEffect } from "react";
import { Submission, SubmissionCreate } from "@/types/Submission";
import useSubmission from "@/hook/useSubmission";
import DeleteConfirmModal from "./DeleteConfirmModal.molecule";

interface Props {
  studentId: number;
  assignmentId: number;
  isOpen: boolean;
  onClose: () => void;
  submission?: Submission;
  mode?: 'create' | 'edit';
}

export default function SubmissionModal({
  studentId,
  assignmentId,
  isOpen,
  onClose,
  submission,
  mode = 'create'
}: Props) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const {
    post,
    update,
    delete: deleteSubmission,
    isCreating,
    isUpdating,
    isDeleting
  } = useSubmission({ studentId, assignmentId });

  useEffect(() => {
    // Reset form when submission changes
    if (!submission && mode === 'create') {
      // Reset form for create mode
    }
  }, [submission, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submissionData: SubmissionCreate = {
      assignment: { id: assignmentId, title: "", dueDate: "" },
      studentId,
      status: "SUBMITTED"
    };

    try {
      if (mode === 'edit' && submission) {
        await update({ submissionId: submission.id, data: submissionData });
      } else {
        await post(submissionData);
      }
      onClose();
    } catch (error) {
      console.error(`과제 ${mode === 'edit' ? '수정' : '등록'} 실패:`, error);
      alert(`과제 ${mode === 'edit' ? '수정' : '등록'}에 실패했습니다.`);
    }
  };

  const handleDelete = async () => {
    if (!submission) return;

    try {
      await deleteSubmission(submission.id);
      setShowDeleteConfirm(false);
      onClose();
    } catch (error) {
      console.error("과제 삭제 실패:", error);
      alert("과제 삭제에 실패했습니다.");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg w-full max-w-2xl">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              과제 {mode === 'edit' ? '수정' : '등록'}
            </h3>
            {mode === 'edit' && (
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-3 py-1.5 text-sm text-red-600 hover:text-red-700"
                  disabled={isDeleting}
                >
                  {isDeleting ? '삭제 중...' : '삭제'}
                </button>
              </div>
            )}
            {mode === 'edit' && (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="px-3 py-1.5 text-sm text-red-600 hover:text-red-700"
              >
                삭제
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                내용
              </label>
              <textarea
                defaultValue=""
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md h-32"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                첨부파일
              </label>
              <input
                type="file"
                multiple
                onChange={() => { }}
                className="w-full text-sm"
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
                disabled={mode === 'edit' ? isUpdating : isCreating}
                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {mode === 'edit'
                  ? (isUpdating ? "수정 중..." : "수정")
                  : (isCreating ? "등록 중..." : "등록")
                }
              </button>
            </div>
          </form>
        </div>
      </div>
      <DeleteConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="과제"
        isDeleting={isDeleting}
      />
    </>
  );
}

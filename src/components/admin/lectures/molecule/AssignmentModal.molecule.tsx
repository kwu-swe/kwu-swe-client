import { useEffect, useRef } from "react";

interface AssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  dueDateAfterDays: number;
  setDueDateAfterDays: (days: number) => void;
  selectedFiles: File[];
  onFileSelect: (files: FileList) => void;
  onFileRemove: (index: number) => void;
  onSubmit: () => void;
  lectureId: number;
  mode?: 'create' | 'edit';
  assignment?: any;
}

export default function AssignmentModal({
  isOpen,
  onClose,
  title,
  setTitle,
  content,
  setContent,
  dueDateAfterDays,
  setDueDateAfterDays,
  selectedFiles,
  onFileSelect,
  onFileRemove,
  onSubmit,
  lectureId,
  mode = 'create',
}: AssignmentModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            과제 {mode === 'edit' ? '수정' : '등록'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                과제 제목
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="과제 제목을 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                과제 내용
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="과제 내용을 입력하세요"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                마감일
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="dueDate"
                  type="number"
                  value={dueDateAfterDays}
                  onChange={(e) => setDueDateAfterDays(parseInt(e.target.value))}
                  min={1}
                  max={30}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="text-sm text-gray-600">일 후 마감</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                파일 첨부
              </label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    multiple
                    onChange={(e) => e.target.files && onFileSelect(e.target.files)}
                    className="hidden"
                    id={`assignment-input-${lectureId}`}
                  />
                  <label
                    htmlFor={`assignment-input-${lectureId}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors inline-block"
                  >
                    파일 선택
                  </label>
                </div>

                {selectedFiles.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600 mb-2">
                      선택된 파일 ({selectedFiles.length}개):
                    </p>
                    <ul className="space-y-1">
                      {selectedFiles.map((file, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between text-sm text-gray-800 bg-white p-2 rounded"
                        >
                          <span className="truncate flex-1">{file.name}</span>
                          <button
                            onClick={() => onFileRemove(index)}
                            className="ml-2 text-red-500 hover:text-red-600"
                          >
                            삭제
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            취소
          </button>
          <button
            onClick={onSubmit}
            disabled={selectedFiles.length === 0 || !title}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mode === 'edit' ? '수정' : '등록'}
          </button>
        </div>
      </div>
    </div>
  );
}

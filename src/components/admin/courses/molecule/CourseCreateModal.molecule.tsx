import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { CourseCreate, CourseType } from "@/types/Course";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (course: CourseCreate) => Promise<void>;
  isCreating?: boolean;
}

export default function CourseCreateModal({ isOpen, onClose, onSubmit, isCreating }: Props) {
  const [courseName, setCourseName] = useState("");
  const [score, setScore] = useState(3);
  const [courseType, setCourseType] = useState<CourseType>("MAJOR_REQUIRED");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await onSubmit({
        courseName,
        score,
        courseType,
      });
      onClose();
      setCourseName("");
      setScore(3);
    } catch (error) {
      console.error("과목 생성 실패:", error);
      alert("과목 생성에 실패했습니다.");
    }
  };

  return (
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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold leading-6 text-gray-900 mb-4"
                >
                  새로운 과목 생성
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      과목명
                    </label>
                    <input
                      type="text"
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kw-brown/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      학점
                    </label>
                    <input
                      type="number"
                      value={score}
                      onChange={(e) => setScore(parseInt(e.target.value))}
                      min={1}
                      max={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kw-brown/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      과목 유형
                    </label>
                    <select
                      value={courseType}
                      onChange={(e) => setCourseType(e.target.value as CourseType)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kw-brown/20"
                      required
                    >
                      <option value="MAJOR_REQUIRED">전공필수</option>
                      <option value="MAJOR_ELECTIVE">전공선택</option>
                      <option value="GENERAL_REQUIRED">교양필수</option>
                      <option value="GENERAL_ELECTIVE">교양선택</option>
                    </select>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      disabled={isCreating}
                      className="px-4 py-2 text-sm bg-kw-brown text-white rounded-lg hover:bg-kw-brown/90 disabled:opacity-50"
                    >
                      {isCreating ? "생성 중..." : "생성"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

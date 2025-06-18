import { useState } from "react";
import { Announcement, AnnouncementList } from "@/types/Announcement";
import useAnnouncement from "@/hook/useAnnouncement";
import { formatDate } from "@/utils/date";
import DeleteConfirmModal from "./DeleteConfirmModal.molecule";

interface Props {
  lectureId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function AnnouncementListModal({ lectureId, isOpen, onClose }: Props) {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementList | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const {
    announcementsByLecture,
    isLoadingAnnouncementsByLecture,
    deleteAnnouncement,
    isDeleting
  } = useAnnouncement({ lectureId });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onMouseDown={(e) => e.preventDefault()}
    >
      <div className="bg-white rounded-lg w-full max-w-3xl">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold">공지사항 목록</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {isLoadingAnnouncementsByLecture ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
          ) : announcementsByLecture && announcementsByLecture.length > 0 ? (
            <div className="space-y-4">
              {announcementsByLecture.map((announcement: AnnouncementList) => (
                <div
                  key={announcement.announcementId}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-medium text-gray-900">
                      {announcement.title}
                    </h4>
                  </div>
                  {/* <p className="text-gray-600 whitespace-pre-wrap">
                    {announcement.content}
                  </p>
                  {announcement.encodedFiles && announcement.encodedFiles.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-sm font-medium text-gray-700 mb-2">첨부파일:</p>
                      <div className="space-y-1">
                        {announcement.encodedFiles.map((file, index) => (
                          <a
                            key={index}
                            href={file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline block"
                          >
                            첨부파일 {index + 1}
                          </a>
                        ))}
                      </div>
                    </div>
                  )} */}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">등록된 공지사항이 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={async () => {
          if (selectedAnnouncement) {
            await deleteAnnouncement(selectedAnnouncement.announcementId);
            setShowDeleteConfirm(false);
          }
        }}
        title="공지사항"
        isDeleting={isDeleting}
      />
    </div>
  );
}

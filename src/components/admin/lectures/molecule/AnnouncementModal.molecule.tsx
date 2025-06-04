import { useState } from "react";
import { AnnouncementCreate } from "@/types/Announcement";
import useAnnouncement from "@/hook/useAnnouncement";

interface Props {
  lectureId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function AnnouncementModal({ lectureId, isOpen, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


  const { createAnnouncement, isCreating } = useAnnouncement({ lectureId });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const announcement: AnnouncementCreate = {
      title,
      content,
      encodedFiles: [] // 파일 업로드는 추후 구현
    };

    try {
      await createAnnouncement({ lectureId, announcement });
      onClose();
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("공지사항 등록 실패:", error);
      alert("공지사항 등록에 실패했습니다.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">공지사항 등록</h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              내용
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md h-32"
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
              onChange={() => {}}
              className="w-full"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isCreating ? "등록 중..." : "등록"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

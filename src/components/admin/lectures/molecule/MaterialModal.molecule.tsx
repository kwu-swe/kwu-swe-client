import { useState } from "react";
import { MaterialCreate } from "@/types/Material";
import useMaterial from "@/hook/useMaterial";
import imageApi from "@/service/api/image";

interface Props {
  lectureId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function MaterialModal({ lectureId, isOpen, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const { createMaterial, isCreating } = useMaterial({ lectureId });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const fileUrls = await Promise.all(
        files.map(async (file) => {
          const response = await imageApi.put(file);
          return response;
        })
      ).then(urls => urls.filter((url): url is string => url !== undefined));

      const material: MaterialCreate = {
        title,
        content,
        encodedFiles: fileUrls
      };

      await createMaterial({ lectureId, material });
      onClose();
      setTitle("");
      setContent("");
      setFiles([]);
    } catch (error) {
      console.error("자료 등록 실패:", error);
      alert("자료 등록에 실패했습니다.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">자료 등록</h3>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md"
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
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
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
              disabled={isCreating}
              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isCreating ? "등록 중..." : "등록"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

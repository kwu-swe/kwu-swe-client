import { useState, useEffect } from "react";
import { Material, MaterialCreate } from "@/types/Material";
import useMaterial from "@/hook/useMaterial";
import imageApi from "@/service/api/image";
import DeleteConfirmModal from "./DeleteConfirmModal.molecule";

interface Props {
  lectureId: number;
  isOpen: boolean;
  onClose: () => void;
  material?: Material;
  mode?: 'create' | 'edit';
}

export default function MaterialModal({ lectureId, isOpen, onClose, material, mode = 'create' }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { 
    createMaterial, 
    updateMaterial,
    deleteMaterial,
    isCreating,
    isUpdating,
    isDeleting 
  } = useMaterial({ lectureId });

  useEffect(() => {
    if (material && mode === 'edit') {
      setTitle(material.title);
      setContent(material.content);
    } else {
      setTitle("");
      setContent("");
      setFiles([]);
    }
  }, [material, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const fileUrls = await Promise.all(
        files.map(async (file) => {
          const response = await imageApi.put(file);
          return response;
        })
      ).then(urls => urls.filter((url): url is string => url !== undefined));

      const materialData: MaterialCreate = {
        title,
        content,
        encodedFiles: fileUrls
      };

      if (mode === 'edit' && material) {
        await updateMaterial({ materialId: material.materialId, material: materialData });
      } else {
        await createMaterial({ lectureId, material: materialData });
      }
      onClose();
      setTitle("");
      setContent("");
      setFiles([]);
    } catch (error) {
      console.error(`자료 ${mode === 'edit' ? '수정' : '등록'} 실패:`, error);
      alert(`자료 ${mode === 'edit' ? '수정' : '등록'}에 실패했습니다.`);
    }
  };

  const handleDelete = async () => {
    if (!material) return;
    
    try {
      await deleteMaterial(material.materialId);
      setShowDeleteConfirm(false);
      onClose();
    } catch (error) {
      console.error("자료 삭제 실패:", error);
      alert("자료 삭제에 실패했습니다.");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-lg w-full max-w-2xl"
          onClick={(e) => e.stopPropagation()}
        >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            자료 {mode === 'edit' ? '수정' : '등록'}
          </h3>
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
      title={title}
      isDeleting={isDeleting}
      />
    </>
  );
}

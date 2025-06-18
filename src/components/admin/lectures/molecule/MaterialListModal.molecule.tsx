import { MaterialByLectureId } from "@/types/Material";
import useMaterial from "@/hook/useMaterial";
import { formatDate } from "@/utils/date";
import { useState } from "react";
import DeleteConfirmModal from "./DeleteConfirmModal.molecule";
import MaterialModal from "./MaterialModal.molecule";

interface Props {
  lectureId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function MaterialListModal({ lectureId, isOpen, onClose }: Props) {
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialByLectureId | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const { 
    materialsByLecture, 
    isLoadingMaterialsByLecture,
    deleteMaterial,
    isDeleting,
    material: selectedMaterialDetail,
    isLoadingMaterial
  } = useMaterial({ 
    lectureId,
    materialId: selectedMaterial?.materialId
  });

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold">자료 목록</h3>
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
          {isLoadingMaterialsByLecture ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
          ) : materialsByLecture && materialsByLecture.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {materialsByLecture.map((material: MaterialByLectureId) => (
                <div
                  key={material.materialId}
                  className="py-3 flex items-center space-x-4"
                >
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium text-gray-900">
                      {material.title}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {formatDate(material.createdAt)}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedMaterial(material);
                        setShowEditModal(true);
                      }}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {
                        setSelectedMaterial(material);
                        setShowDeleteConfirm(true);
                      }}
                      className="text-sm text-red-600 hover:text-red-700"
                      disabled={isDeleting}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">등록된 자료가 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      {showDeleteConfirm && selectedMaterial && (
        <DeleteConfirmModal
          isOpen={showDeleteConfirm}
          onClose={() => {
            setShowDeleteConfirm(false);
            setSelectedMaterial(null);
          }}
          onConfirm={async () => {
            await deleteMaterial(selectedMaterial.materialId);
            setShowDeleteConfirm(false);
            setSelectedMaterial(null);
          }}
          title="자료 삭제"
          message="정말 이 자료를 삭제하시겠습니까?"
          isDeleting={isDeleting}
        />
      )}

      {showEditModal && selectedMaterial && selectedMaterialDetail && (
        <MaterialModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedMaterial(null);
          }}
          lectureId={lectureId}
          mode="edit"
          material={selectedMaterialDetail}
        />
      )}
    </div>
  );
}

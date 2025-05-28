import materialApi from "@/service/api/material";
import { Material } from "@/types/Material";
import {
  useQueries,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";

export default function useMaterial({
  materialId,
  lectureId,
}: {
  materialId?: number;
  lectureId?: number;
}) {
  const queryClient = useQueryClient(); // 뮤테이션에서 사용될 수 있으므로 유지

  const [
    { data: material, isLoading: isLoadingMaterial },
    { data: materialsByLecture, isLoading: isLoadingMaterialsByLecture },
  ] = useQueries({
    queries: [
      {
        queryKey: ["materialGetById", materialId],
        queryFn: async () => {
          if (!materialId) return undefined;
          return materialApi.getById(materialId);
        },
        enabled: !!materialId,
        // staleTime: 1000 * 60 * 5, // 5분간 fresh 상태 유지 (옵션)
      },
      {
        queryKey: ["materialsGetByLectureId", lectureId],
        queryFn: async () => {
          if (!lectureId) return undefined;
          return materialApi.getByLectureId(lectureId);
        },
        enabled: !!lectureId,
        // staleTime: 1000 * 60 * 5, // 5분간 fresh 상태 유지 (옵션)
      },
    ],
  }) as [
    UseQueryResult<Material | undefined, Error>,
    UseQueryResult<Material[] | undefined, Error>
  ];

  // TODO: 자료 생성, 수정, 삭제 뮤테이션 추가 (useLecture 스타일과 유사하게)
  /*
  const { mutate: createMaterial } = useMutation<Material, Error, Omit<Material, 'materialId' | 'writer' | 'encodedFiles' | 'createdAt'> & { lectureId: number }>({
    mutationFn: (data) => materialApi.create(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["materialsGetByLectureId", data.lectureId] });
      if (data.materialId) {
        queryClient.setQueryData(["materialGetById", data.materialId], data);
      }
    },
  });

  const { mutate: updateMaterial } = useMutation<Material, Error, { materialId: number; data: Partial<Omit<Material, 'materialId' | 'writer' | 'encodedFiles' | 'createdAt'>> }>({
    mutationFn: ({ materialId, data }) => materialApi.update(materialId, data),
    onSuccess: (data) => {
      if (data.lectureId) {
        queryClient.invalidateQueries({ queryKey: ["materialsGetByLectureId", data.lectureId] });
      }
      queryClient.setQueryData(["materialGetById", data.materialId], data);
    },
  });

  const { mutate: deleteMaterial } = useMutation<void, Error, { materialId: number; lectureId?: number }>({
    mutationFn: ({ materialId }) => materialApi.delete(materialId),
    onSuccess: (_, { materialId, lectureId }) => {
      if (lectureId) {
        queryClient.invalidateQueries({ queryKey: ["materialsGetByLectureId", lectureId] });
      }
      queryClient.removeQueries({ queryKey: ["materialGetById", materialId] });
    },
  });
  */

  return {
    material,
    isLoadingMaterial,
    materialsByLecture,
    isLoadingMaterialsByLecture,
    // createMaterial, // 필요시 주석 해제
    // updateMaterial, // 필요시 주석 해제
    // deleteMaterial, // 필요시 주석 해제
  };
}

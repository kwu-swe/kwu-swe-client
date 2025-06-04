import materialApi from "@/service/api/material";
import { Material, MaterialByLectureId, MaterialCreate } from "@/types/Material";
import {
  useQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";

export default function useMaterial({
  materialId,
  lectureId,
}: {
  materialId?: number;
  lectureId?: number;
}) {
  const queryClient = useQueryClient();

  // 단일 자료 조회
  const {
    data: material,
    isLoading: isLoadingMaterial,
    error: materialError,
  } = useQuery<Material>({    
    queryKey: ["material", materialId],
    queryFn: async () => {
      if (!materialId) throw new Error("materialId is required");
      const response = await materialApi.getById(materialId);
      return response.result;
    },
    enabled: !!materialId,
  });

  // 강의별 자료 목록 조회
  const {
    data: materialsByLecture,
    isLoading: isLoadingMaterialsByLecture,
    error: materialsByLectureError,
  } = useQuery<MaterialByLectureId[]>({    
    queryKey: ["materials", lectureId],
    queryFn: async () => {
      if (!lectureId) return [];
      const response = await materialApi.getByLectureId(lectureId);
      return response.result;
    },
    enabled: !!lectureId,
  });

  // 자료 생성
  const { mutate: createMaterial, isPending: isCreating } = useMutation({
    mutationFn: ({ lectureId, material }: { lectureId: number; material: MaterialCreate }) =>
      materialApi.post(lectureId, material),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials", lectureId] });
      alert("자료가 성공적으로 등록되었습니다.");
    },
    onError: () => {
      alert("자료 등록에 실패했습니다.");
    },
  });

  return {
    material,
    isLoadingMaterial,
    materialError,
    materialsByLecture,
    isLoadingMaterialsByLecture,
    materialsByLectureError,
    createMaterial,
    isCreating,
  };
}

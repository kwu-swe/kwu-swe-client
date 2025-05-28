import { ToApi } from "@/types/Api";
import httpRequest from "../axios";
import { Material } from "@/types/Material";
const api = httpRequest.api();

// materialId로 단일 자료 조회
async function getById(materialId: number): Promise<Material> {
  const response = await api.get<ToApi<Material>>(`/materials/${materialId}`);
  return response.data.result;
}

// lectureId 기반으로 자료 목록 조회
async function getByLectureId(lectureId: number): Promise<Material[]> {
  const response = await api.get<ToApi<Material[]>>(
    `/materials/lectures/${lectureId}`
  );
  return response.data.result;
}

// TODO: 자료 생성, 수정, 삭제 API 추가 (필요시)
/*
async function create(data: Omit<Material, 'materialId' | 'writer' | 'encodedFiles' | 'createdAt'> & { lectureId: number } ): Promise<Material> {
  const response = await api.post<ToApi<Material>>(...);
  return response.data.result;
}

async function update(materialId: number, data: Partial<Omit<Material, 'materialId' | 'writer' | 'encodedFiles' | 'createdAt'>>): Promise<Material> {
  const response = await api.patch<ToApi<Material>>(...);
  return response.data.result;
}

async function remove(materialId: number): Promise<void> {
  await api.delete<ToApi<null>>(...);
}
*/

const materialApi = {
  getById,
  getByLectureId,
  // create, // 필요시 주석 해제
  // update, // 필요시 주석 해제
  // delete: remove, // 필요시 주석 해제
};

export default materialApi;

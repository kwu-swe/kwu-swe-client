import { ToApi } from "@/types/Api";
import httpRequest from "../axios";
import { Material, MaterialByLectureId, MaterialCreate } from "@/types/Material";
const api = httpRequest.api();

// materialId로 단일 자료 조회
async function getById(materialId: number): Promise<ToApi<Material>> {
  const response = await api.get<ToApi<Material>>(`/materials/${materialId}`);
  return response.data;
}

// lectureId 기반으로 자료 목록 조회
async function getByLectureId(lectureId: number): Promise<ToApi<MaterialByLectureId[]>> {
  const response = await api.get<ToApi<MaterialByLectureId[]>>(
    `/materials/lectures/${lectureId}`
  );
  return response.data;
}
async function post(lectureId: number, material: MaterialCreate): Promise<ToApi<string>> {
  const response = await api.post<MaterialCreate, ToApi<string>>(`/materials/lectures/${lectureId}`, material);
  return response.data;
}
async function put(materialId: number, material: MaterialCreate): Promise<ToApi<string>> {
  const response = await api.put<MaterialCreate, ToApi<string>>(`/materials/${materialId}`, material);
  return response.data;
}

async function _delete(materialId: number) {
  const response = await api.delete<string>(`/materials/${materialId}`);
  return response.data;
}

const materialApi = {
  getById,
  getByLectureId,
  post,
  update: put,
  delete: _delete
};

export default materialApi;

import { Lecture, LectureAssistantCreate, LectureCreate, LectureUpdate } from "@/types/Lecture";
import httpRequest from "../axios";
import { ToApi } from "@/types/Api";

const api = httpRequest.api();

async function get() {
  const response = await api.get<ToApi<Lecture[]>>("/lectures");
  return response.data.result;
}

async function post(code: string, data: LectureCreate) {
  const response = await api.post<LectureCreate>(`/lectures`, data, {
    params: {
      code
    }
  });
  return response.data;
}

async function patch(id: number, data: LectureUpdate) {
  const response = await api.patch<LectureUpdate>(`/lectures/${id}`, data);
  return response.data;
}

async function _delete(id: number) {
  const response = await api.delete(`/lectures/${id}`);
  return response.data;
}

async function getStudentLectures(code: string) {
  const response = await api.get<ToApi<Lecture[]>>("/lectures/students", {
    params: {
      code
    }
  });
  return response.data.result;
}

async function postAssistant(data: LectureAssistantCreate) {
  const response = await api.post<LectureAssistantCreate>(`/lectures/${data.lectureId}/assistants/${data.assistantNumber}`, data);
  return response.data;
}

const lectureApi = {
  get,
  post,
  patch,
  delete: _delete,
  getStudentLectures,
  postAssistant,
};

export default lectureApi;

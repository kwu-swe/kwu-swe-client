import { Lecture, UpdateLecture } from "@/types/Lecture";
import httpRequest from "../axios";
import { ToApi } from "@/types/Api";

const api = httpRequest.api();

async function get() {
  const response = await api.get<ToApi<Lecture[]>>("/lectures");
  return response.data.result;
}

async function post(data: Lecture) {
  const response = await api.post<Lecture>("/lectures", data);
  return response.data;
}

async function patch(id: number, data: UpdateLecture) {
  const response = await api.patch<UpdateLecture>(`/lectures/${id}`, data);
  return response.data;
}

async function _delete(id: number) {
  const response = await api.delete(`/lectures/${id}`);
  return response.data;
}

const lectureApi = {
  get,
  post,
  patch,
  delete: _delete,
};

export default lectureApi;

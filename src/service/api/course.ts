import { ToApi } from "@/types/Api";
import httpRequest from "../axios";
import { Course, CourseCreate, CourseUpdate } from "@/types/Course";

const api = httpRequest.api();

async function get() {
  const response = await api.get<ToApi<Course[]>>("/courses");
  return response.data.result;
}

async function post(data: CourseCreate) {
  const response = await api.post<CourseCreate>("/courses", data);
  return response.data;
}

async function patch(id: number, data: CourseUpdate) {
  const response = await api.patch<CourseUpdate>(`/courses/${id}`, data);
  return response.data;
}

async function _delete(id: number) {
  const response = await api.delete(`/courses/${id}`);
  return response.data;
}

const courseApi = {
  get,
  post,
  patch,
  delete: _delete,
};

export default courseApi;

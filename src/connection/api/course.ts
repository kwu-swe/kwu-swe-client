import { ToApi } from "@/types/Api";
import httpRequest from "../axios";
import { Course, CreateCourse } from "@/types/Course";

const api = httpRequest.api();

async function get() {
  const response = await api.get<ToApi<Course[]>>("/courses");
  return response.data.result;
}

async function post(data: CreateCourse) {
  const response = await api.post<CreateCourse>("/courses", data);
  return response.data;
}

const courseApi = {
  get,
  post,
};

export default courseApi;

import { ToApi } from "@/types/Api";
import httpRequest from "../axios";
import { CreateUser, UpdateUser, User } from "@/types/User";

const api = httpRequest.api();

async function getByStudentNumber(studentNumber: string) {
  const response = await api.get<ToApi<User>>("/users", {
    params: { studentNumber },
  });
  return response.data.result;
}
async function post(data: CreateUser) {
  const response = await api.post<CreateUser>("/users", data);
  return response.data;
}
async function patch(studentNumber: string, data: UpdateUser) {
  const response = await api.patch<UpdateUser>("/users", data, {
    params: {
      studentNumber,
    },
  });
  return response.data;
}

const userApi = {
  getByStudentNumber,
  post,
  patch,
};

export default userApi;

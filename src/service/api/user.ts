import { ToApi } from "@/types/Api";
import httpRequest from "../axios";
import { UserCreate, UserUpdate, User, UserRole } from "@/types/User";

const api = httpRequest.api();

async function get() {
  const response = await api.get<ToApi<User>>("/users");
  return response.data.result;
}

async function getIsValid() {
  const response = await api.get<ToApi<User>>("/users");
  return response.data.isSuccess;
}

async function post(role: UserRole, data: UserCreate) {
  const response = await api.post<UserCreate>("/users", data, {
    params: { role },
  });
  return response.data;
}
async function patch(studentNumber: string, data: UserUpdate) {
  const response = await api.patch<UserUpdate>("/users", data, {
    params: {
      studentNumber,
    },
  });
  return response.data;
}

const userApi = {
  get,
  getIsValid,
  post,
  patch,
};

export default userApi;

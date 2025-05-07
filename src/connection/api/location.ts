import { ToApi } from "@/types/Api";
import httpRequest from "../axios";
import { CreateLocation, Location, UpdateLocation } from "@/types/Location";

const api = httpRequest.api();

async function get() {
  const response = await api.get<ToApi<Location[]>>("/locations");
  return response.data.result;
}

async function post(data: CreateLocation) {
  const response = await api.post<CreateLocation>("/locations", data);
  return response.data;
}

async function patch(id: number, data: UpdateLocation) {
  const response = await api.patch<UpdateLocation>(`/locations/${id}`, data);
  return response.data;
}

async function _delete(id: number) {
  const response = await api.delete(`/locations/${id}`);
  return response.data;
}

const locationApi = {
  get,
  post,
  patch,
  delete: _delete,
};

export default locationApi;

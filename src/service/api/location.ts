import { ToApi } from "@/types/Api";
import httpRequest from "../axios";
import { LocationCreate, Location, LocationUpdate } from "@/types/Location";

const api = httpRequest.api();

async function get() {
  const response = await api.get<ToApi<Location[]>>("/locations");
  return response.data.result;
}

async function post(data: LocationCreate) {
  const response = await api.post<LocationCreate>("/locations", data);
  return response.data;
}

async function patch(id: number, data: LocationUpdate) {
  const response = await api.patch<LocationUpdate>(`/locations/${id}`, data);
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

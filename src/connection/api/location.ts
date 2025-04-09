import { ToApi } from "@/types/Api";
import httpRequest from "../axios";
import { CreateLocation, Location } from "@/types/Location";

const api = httpRequest.api();

async function get() {
  const response = await api.get<ToApi<Location[]>>("/locations");
  return response.data.result;
}

async function post(data: CreateLocation) {
  const response = await api.post<CreateLocation>("/locations", data);
  return response.data;
}

const locationApi = {
  get,
  post,
};

export default locationApi;

import { Lecture } from "@/types/Lecture";
import httpRequest from "../axios";
import { ToApi } from "@/types/Api";

const api = httpRequest.api();

async function get() {
  const response = await api.get<ToApi<Lecture[]>>("/lectures");
  return response.data;
}
const lectureApi = {
  get,
};

export default lectureApi;

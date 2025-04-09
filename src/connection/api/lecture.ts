import { Lecture } from "@/types/Lecture";
import httpRequest from "../axios";
import { ToApi } from "@/types/Api";

const api = httpRequest.api();

async function get() {
  return api.get<ToApi<Lecture[]>>("/lectures");
}
const lectureApi = {
  get,
};

export default lectureApi;

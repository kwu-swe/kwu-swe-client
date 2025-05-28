import { ToApi } from "@/types/Api";
import httpRequest from "../axios";

const api = httpRequest.api();
type FileRead = File | null;
async function put(file: FileRead) {
	if (!file) return;
	const response = await api.put<File, ToApi<string[]>>("/images", file);
	return response.data.result[0];
}

const imageApi = {
	put,
};

export default imageApi;

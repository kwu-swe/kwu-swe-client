import { ToApi } from "@/types/Api";
import httpRequest from "../axios";

const api = httpRequest.api();
type FileRead = File | null;
async function put(file: FileRead) {
	if (!file) return;

	const formData = new FormData();
	formData.append('multipartFiles', file);

	const response = await api.put<FormData, ToApi<string[]>>("/images", formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});

	return response.data.result[0];
}

const imageApi = {
	put,
};

export default imageApi;

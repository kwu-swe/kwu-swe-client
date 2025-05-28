import { ToApi } from "@/types/Api";
import httpRequest from "../axios";
import { TokenSign } from "@/types/Token";
const api = httpRequest.api()

async function post(code: string) {
	const response = await api.post<undefined, ToApi<TokenSign>>(`/tokens/login?code=${code}`)
	return response.data
}

const tokenApi = {
	post
}

export default tokenApi;
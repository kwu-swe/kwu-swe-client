import { GrokResponseBody, Message } from "@/types/Grok";
import httpRequest from "../axios";

const api = httpRequest.subApi();

async function post(messages: Message[]) {
	const response = await api.post<Message[], GrokResponseBody>('/grok', messages)
	return response.data
}

const grokApi = {
	post,
}
export default grokApi
import { Message } from "@/types/Grok";
import { GrokResponseBody } from "@/types/Grok";
import axios from "axios";
const httpRequest = axios.create({
	baseURL: "/",
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "application/json; charset=utf-8"
	}
});
// const baseUrl = import.meta.env.VITE_SUB_API_ORIGIN;
async function post(messages: Message[]): Promise<Message> {
	try {
		const response = await httpRequest.post('/api/grok', messages);
		return response.data;
	} catch (error) {
		console.error('Grok API Error:', error);
		throw error;
	}
}

const grokApi = {
	post,
}
export default grokApi
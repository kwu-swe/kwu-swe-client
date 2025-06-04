import grokApi from "@/service/api/grok";
import { useMutation } from "@tanstack/react-query";
import { Message } from "@/types/Grok";
import { useAiStore } from "@/store/aiStore";

export default function useAi() {
	const { addMessage } = useAiStore()
	const { mutate } = useMutation({
		mutationFn: async (messages: Message[]) => {
			const response = await grokApi.post(messages);
			return response.choices.map(choice => choice.message);
		},
		onSuccess: (messages: Message[], variables) => {
			const topic = variables[0].content;
			messages.forEach(message => {
				addMessage(topic, message);
			});
		}
	});

	return { mutate };
}
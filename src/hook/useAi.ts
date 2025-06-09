import grokApi from "@/service/api/grok";
import { useMutation } from "@tanstack/react-query";
import { Message } from "@/types/Grok";
import { useAiStore } from "@/store/aiStore";
import { useState } from "react";

type MutateParams = {
	topic: string;
	messages: Message[];
};

export default function useAi() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { addMessage } = useAiStore();
	const { mutate } = useMutation({
		mutationFn: async ({ topic, messages }: MutateParams) => {
			// 사용자 메시지 저장
			const lastMessage = messages[messages.length - 1];
			addMessage(topic, lastMessage);
			const response = await grokApi.post(messages);
			if (response?.content) {
				addMessage(topic, { role: 'assistant', content: response.content });
			}
			return response;
		},
		onMutate: () => setIsLoading(true),
		onSettled: () => setIsLoading(false),
		onSuccess: () => setIsLoading(false),
		onError: () => setIsLoading(false),
	});

	return { mutate, isLoading };
}
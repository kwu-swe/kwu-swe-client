import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Message } from "@/types/Grok";

interface AiStore {
	topics: Record<string, Message[]>;
	setTopicMessages: (topic: string, messages: Message[]) => void;
	addMessage: (topic: string, message: Message) => void;
	clearTopic: (topic: string) => void;
}

const useAiStore = create(persist<AiStore>(
	(set) => ({
		topics: {},
		setTopicMessages: (topic: string, messages: Message[]) =>
			set((state) => ({
				topics: {
					...state.topics,
					[topic]: messages
				}
			})),
		addMessage: (topic: string, message: Message) =>
			set((state) => ({
				topics: {
					...state.topics,
					[topic]: [...(state.topics[topic] || []), message]
				}
			})),
		clearTopic: (topic: string) =>
			set((state) => {
				const newTopics = { ...state.topics };
				delete newTopics[topic];
				return { topics: newTopics };
			})
	}),
	{
		name: "aiStore",
	}
))

export { useAiStore }

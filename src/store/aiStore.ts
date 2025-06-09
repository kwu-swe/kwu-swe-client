import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Message } from "@/types/Grok";

interface AiStore {
	store: Record<string, Message[]>;
	setStore: (store: Record<string, Message[]>) => void;
	addMessage: (topic: string, message: Message) => void;
	clearTopic: (topic: string) => void;
}

const useAiStore = create(persist<AiStore>(
	(set) => ({
		store: {},
		setStore: (store: Record<string, Message[]>) => set({ store }),
		addMessage: (topic: string, message: Message) =>
			set((state) => ({
				store: {
					...state.store,
					[topic]: [...(state.store[topic] || []), message],
				},
			})),
		clearTopic: (topic: string) =>
			set((state) => {
				const newStore = { ...state.store };
				delete newStore[topic];
				return { store: newStore };
			}),
	}),
	{
		name: "aiStore",
	}
))

export { useAiStore }

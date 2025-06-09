export type { Message, Choice, GrokResponseBody };

type MessageRole = "system" | "user" | "assistant";
interface Message {
	role: MessageRole;
	content: string;
}

interface Choice {
	index: number;
	message: Message;
	finish_reason: string;
}

interface GrokResponseBody {
	choices: Choice[];
	data: string;
}

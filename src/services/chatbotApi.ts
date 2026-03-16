import { ChatRequest, ChatResponse } from "../types/chatbot";
import { API_BASE } from "../config";

export async function sendChatMessage(
  message: string
): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE}/chatbot/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message } as ChatRequest),
  });

  if (!res.ok) {
    throw new Error("Chatbot request failed");
  }

  return res.json();
}
export interface ChatRequest {
  message: string;
}

export interface ChatProduct {
  id: number;
  name: string;
  image?: string;
  link: string;
}

export interface ChatResponse {
  intent: string;
  response: string;
  products: ChatProduct[];
}

export interface ChatMessage {
  sender: "user" | "bot";
  text: string;
  products?: ChatProduct[];
}
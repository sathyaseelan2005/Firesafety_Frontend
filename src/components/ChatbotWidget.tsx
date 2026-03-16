import { useState, useRef, useEffect } from "react";
import { sendChatMessage } from "../services/chatbotApi";
import { ChatMessage } from "../types/chatbot";
import { 
  Send, 
  X, 
  MessageCircle, 
  Package,
  Loader2
} from "lucide-react";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "👋 Hello! I'm your Safety Assistant. How can I help you with safety equipment today?",
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      // Prevent body scrolling when chat is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  async function handleSend() {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await sendChatMessage(input);

      const botMsg: ChatMessage = {
        sender: "bot",
        text: res.response,
        products: res.products,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { 
          sender: "bot", 
          text: "❌ Sorry, I'm having trouble connecting. Please try again.", 
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Backdrop overlay when chat is open - ensures nothing behind is clickable */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Floating Button with highest z-index */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group z-[9999]"
        aria-label="Open chat"
      >
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
        )}
      </button>

      {/* Chat Window with highest z-index */}
      {open && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 animate-slide-up z-[9999]">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <h3 className="font-semibold">Safety Assistant</h3>
              </div>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                Online
              </span>
            </div>
            <p className="text-xs text-red-100 mt-1">
              Ask me about safety equipment and PPE
            </p>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto max-h-96 bg-gray-50">
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl rounded-tr-none"
                        : "bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-tl-none"
                    } px-4 py-2 shadow-sm`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    
                    {msg.products && msg.products.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-gray-200/30">
                        <div className="flex items-center space-x-1 text-xs font-semibold mb-2">
                          <Package className="w-3 h-3" />
                          <span>Recommended Products:</span>
                        </div>
                        <ul className="space-y-2">
                          {msg.products.map((product, idx) => (
  <li key={idx} className="flex flex-col text-xs space-y-1">

    <div className="flex items-start space-x-2">
      <span className="text-red-500 mt-1">•</span>
      <span className="flex-1 font-medium">{product.name}</span>
    </div>

    <a
      href={product.link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-red-600 underline text-xs ml-4 hover:text-red-800"
    >
      View Product →
    </a>

  </li>
))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                      <span className="text-sm text-gray-500">Typing...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
                {input.length > 0 && (
                  <button
                    onClick={handleSend}
                    disabled={isLoading}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            
            {/* Quick action suggestions */}
            {messages.length <= 2 && (
              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  onClick={() => setInput("Show me safety gloves")}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors"
                >
                  🧤 Safety gloves
                </button>
                <button
                  onClick={() => setInput("Is Safety Equipments available?")}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors"
                >
                  ⛑️ Safety Helmet
                </button>
                <button
                  onClick={() => setInput("Safety glasses")}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors"
                >
                  👓 Safety glasses
                </button>
              </div>
            )}
            
            <p className="text-xs text-gray-400 mt-3 text-center">
              Ask about PPE, safety equipment, and regulations
            </p>
          </div>
        </div>
      )}
    </>
  );
}
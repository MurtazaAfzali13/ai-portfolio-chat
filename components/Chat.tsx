// components/Chat.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { GlobeIcon, MessageSquare, X, Sparkles, Brain, Search, Zap } from "lucide-react";


const models = [
  { id: "gpt-4o", name: "GPT-4o" },
  { id: "gpt-3.5-mini", name: "GPT-3.5 Mini" },
];

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

// Helper function to detect if text is Persian/Arabic
const isRTL = (text: string): boolean => {
  const rtlRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return rtlRegex.test(text);
};

// Helper to get text direction
const getTextDirection = (text: string): "rtl" | "ltr" => {
  return isRTL(text) ? "rtl" : "ltr";
};

// Message Bubble Component with auto RTL/LTR
const MessageBubble = ({ content, isUser }: { content: string; isUser: boolean }) => {
  const textDir = getTextDirection(content);
  
  return (
    <div
      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
        isUser
          ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
          : "bg-slate-700/50 backdrop-blur text-slate-100 border border-slate-600"
      }`}
    >
      <p 
        className="whitespace-pre-wrap break-words"
        dir={textDir}
        style={{ textAlign: textDir === "rtl" ? "right" : "left" }}
      >
        {content}
      </p>
    </div>
  );
};

interface ChatPageProps {
  onClose?: () => void;
}

export default function ChatPage({ onClose }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState(models[0].id);
  const [useWebSearch, setUseWebSearch] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent]);
  
  // Auto focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  // Loading messages for streaming (Persian)
  const loadingMessages = [
    { icon: <Brain className="w-4 h-4" />, text: "Analyzing your question..." },
    { icon: <Search className="w-4 h-4" />, text: "Searching my knowledge..." },
    { icon: <Sparkles className="w-4 h-4" />, text: "Crafting the best answer..." },
    { icon: <Zap className="w-4 h-4" />, text: "Finalizing response..." },
  ];
  
  const [loadingIndex, setLoadingIndex] = useState(0);
  
  // Rotate loading messages
  useEffect(() => {
    if (!isLoading) return;
    
    const interval = setInterval(() => {
      setLoadingIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1500);
    
    return () => clearInterval(interval);
  }, [isLoading]);
  
  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;
    
    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setStreamingContent("");
    
    // Create AbortController for cancel functionality
    abortControllerRef.current = new AbortController();
    
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
          model: model,
          webSearch: useWebSearch,
        }),
        signal: abortControllerRef.current.signal,
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      let accumulatedContent = "";
      
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          accumulatedContent += chunk;
          setStreamingContent(accumulatedContent);
        }
      }
      
      // After stream ends, add final message to list
      if (accumulatedContent) {
        setMessages(prev => [...prev, {
          id: crypto.randomUUID(),
          role: "assistant",
          content: accumulatedContent,
        }]);
      }
      
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error("Error:", error);
        setMessages(prev => [...prev, {
          id: crypto.randomUUID(),
          role: "assistant",
          content: `❌ Error: ${error.message || "Connection problem occurred"}`,
        }]);
      }
    } finally {
      setIsLoading(false);
      setStreamingContent("");
      abortControllerRef.current = null;
    }
  };
  
  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
      setStreamingContent("");
    }
  };
  
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl overflow-hidden">
      {/* Header with Close Button */}
      <div className="flex justify-between items-center p-4 border-b border-slate-700 bg-slate-800/50 backdrop-blur">
       
         <h2 className="text-xl font-semibold text-white flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-blue-400 animate-pulse" />
        <span className="flex items-baseline gap-2">
          
          <div className="relative">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
           ASK ABOUT MURTAZA AFZALI
            </span>
           
            <span className="inline-block w-0.5 h-5 bg-blue-400 ml-0.5 animate-blink"></span>
          </div>
        </span>
      </h2>
        
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors group"
            aria-label="Close chat"
          >
            <X className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
          </button>
        )}
      </div>
      
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full p-6 mb-4">
              <MessageSquare className="w-12 h-12 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Welcome to Smart Assistant</h3>
            <p className="text-slate-400 max-w-md">
              Ask me anything! I'm here to help you.
            </p>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <MessageBubble 
              content={message.content} 
              isUser={message.role === "user"} 
            />
          </div>
        ))}
        
        {/* Streaming message */}
        {streamingContent && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-slate-700/50 backdrop-blur text-slate-100 border border-slate-600">
              <p 
                className="whitespace-pre-wrap break-words"
                dir={getTextDirection(streamingContent)}
                style={{ textAlign: getTextDirection(streamingContent) === "rtl" ? "right" : "left" }}
              >
                {streamingContent}
                <span className="inline-block w-0.5 h-5 bg-blue-400 ml-1 animate-blink" />
              </p>
            </div>
          </div>
        )}
        
        {/* Loading indicator - before stream starts */}
        {isLoading && !streamingContent && (
          <div className="flex justify-start">
            <div className="bg-slate-700/50 backdrop-blur rounded-2xl px-4 py-3 border border-slate-600">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-400 border-t-transparent"></div>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  {loadingMessages[loadingIndex].icon}
                  <span className="text-sm">{loadingMessages[loadingIndex].text}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area */}
      <div className="border-t border-slate-700 bg-slate-800/50 backdrop-blur p-4">
        <div className="flex flex-col gap-3">
          <textarea
            ref={inputRef}
            className="w-full p-3 bg-slate-700 border border-slate-600 text-white rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={2}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            dir="auto"
          />
          
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setUseWebSearch(!useWebSearch)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition ${
                  useWebSearch
                    ? "bg-blue-600 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                <GlobeIcon size={14} />
                Web Search
              </button>
              
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {models.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex gap-2">
              {isLoading && (
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={handleSubmit}
                disabled={!input.trim() || isLoading}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  !input.trim() || isLoading
                    ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600"
                }`}
              >
                {isLoading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #1e293b;
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>
    </div>
  );
}
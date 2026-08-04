"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MessageSquare, X, Search, Brain, Zap, Send, StopCircle } from "lucide-react";
import Image from "next/image";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const NEAR_BOTTOM_PX = 72;

const isRTL = (text: string): boolean => {
  const rtlRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return rtlRegex.test(text);
};

const getTextDirection = (text: string): "rtl" | "ltr" => {
  return isRTL(text) ? "rtl" : "ltr";
};

// کامپوننت حباب پیام (Message Bubble) با استایل جدید
const MessageBubble = ({ content, isUser }: { content: string; isUser: boolean }) => {
  const textDir = getTextDirection(content);
  return (
    <div
      className={`relative group max-w-[85%] sm:max-w-[75%] px-5 py-3.5 shadow-sm transition-all duration-300 ${
        isUser
          ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl rounded-tr-sm ml-auto"
          : "bg-slate-800/80 backdrop-blur-md text-slate-100 border border-slate-700/50 rounded-2xl rounded-tl-sm"
      }`}
    >
      {/* افکت Glow ملایم برای پیام هوش مصنوعی */}
      {!isUser && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      
      <p
        className="relative whitespace-pre-wrap break-words text-[15px] leading-relaxed"
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
  const [streamingContent, setStreamingContent] = useState("");
  
  // وضعیت زنده نماینده (Agent Status)
  const [agentStatus, setAgentStatus] = useState<{ text: string; icon: any }>({
    text: "Connecting to agent...",
    icon: Zap,
  });

  const messagesScrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const pinnedToBottomRef = useRef(true);

  // منطق اسکرول هوشمند
  const updatePinnedToBottom = useCallback(() => {
    const el = messagesScrollRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    pinnedToBottomRef.current = distanceFromBottom < NEAR_BOTTOM_PX;
  }, []);

  const scrollMessagesToBottom = useCallback((behavior: ScrollBehavior) => {
    messagesEndRef.current?.scrollIntoView({ block: "end", behavior });
  }, []);

  useEffect(() => {
    updatePinnedToBottom();
    if (pinnedToBottomRef.current) scrollMessagesToBottom("smooth");
  }, [messages, streamingContent, updatePinnedToBottom, scrollMessagesToBottom]);

  // تمرکز روی اینپوت در هنگام بارگذاری
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: crypto.randomUUID(), role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setStreamingContent("");
    
    // وضعیت اولیه گراف
    setAgentStatus({ text: "Initializing LangGraph workflow...", icon: Zap });
    
    abortControllerRef.current = new AbortController();

    try {
      // فراخوانی API route (Next.js) که به FastAPI متصل است
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({ role: m.role, content: m.content })),
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

          let chunk = decoder.decode(value, { stream: true });

          // پردازش سیگنال‌های دریافتی از LangGraph
          if (chunk.includes("[[STATUS:RETRIEVE]]")) {
            setAgentStatus({ text: "Querying Pinecone Vector Store...", icon: Search });
            chunk = chunk.replace("[[STATUS:RETRIEVE]]", "");
          }
          if (chunk.includes("[[STATUS:GENERATE]]")) {
            setAgentStatus({ text: "Synthesizing AI Response...", icon: Brain });
            chunk = chunk.replace("[[STATUS:GENERATE]]", "");
          }

          accumulatedContent += chunk;
          if (accumulatedContent) {
            setStreamingContent(accumulatedContent);
          }
        }
      }

      if (accumulatedContent) {
        setMessages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), role: "assistant", content: accumulatedContent },
        ]);
      }
    } catch (error: any) {
      if (error.name !== "AbortError") {
        setMessages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), role: "assistant", content: `❌ Connection Error: ${error.message}` },
        ]);
      }
    } finally {
      setIsLoading(false);
      setStreamingContent("");
      abortControllerRef.current = null;
      // پس از پایان پاسخ، دوباره روی ورودی فوکوس می‌کنیم
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
      setStreamingContent("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
     <div className="flex flex-col h-full w-full bg-slate-900 sm:rounded-2xl overflow-hidden shadow-2xl sm:border border-slate-700/50 sm:ring-1 ring-white/10 relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* هدر شیشه‌ای (Glass Header) */}
      <div className="relative z-10 flex shrink-0 justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-700/50 bg-slate-900/60 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 overflow-hidden rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/20">
            {/* <MessageSquare className="w-5 h-5 text-white" /> */}
            <Image src="/images/murtaza.jpg" width={42} height={42} alt="Murtaza AI Agent" className="rounded-full" />
            
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white tracking-tight">
              Murtaza AI Agent
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Online & Ready
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all duration-200"
            aria-label="Close Chat"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>


      <div
        ref={messagesScrollRef}
        onScroll={updatePinnedToBottom}
        className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6 scroll-smooth scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 ring-1 ring-white/10 shadow-xl">
              <Brain className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Explore My Portfolio
            </h3>
            <p className="text-slate-400 max-w-[280px] text-sm leading-relaxed">
              Ask me about my experience with LangGraph, RAG architectures, or projects like VidBrain and Watan Hospital.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className="flex flex-col w-full">
            <MessageBubble content={message.content} isUser={message.role === "user"} />
          </div>
        ))}

        {/* حباب استریم زنده */}
        {streamingContent && (
          <div className="flex flex-col w-full">
            <div className="relative max-w-[85%] sm:max-w-[75%] px-5 py-3.5 bg-slate-800/80 backdrop-blur-md text-slate-100 border border-slate-700/50 rounded-2xl rounded-tl-sm shadow-sm">
              <p className="whitespace-pre-wrap break-words text-[14px] sm:text-[15px] leading-relaxed" dir={getTextDirection(streamingContent)}>
                {streamingContent}
                <span className="inline-block w-1.5 h-4 bg-blue-500 ml-1.5 animate-pulse rounded-sm align-middle" />
              </p>
            </div>
          </div>
        )}

        {/* نشانگر لودینگ (وضعیت Agent) */}
        {isLoading && !streamingContent && (
          <div className="flex flex-col w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="max-w-[85%] sm:max-w-[75%]">
              <div className="inline-flex items-center gap-3 bg-slate-800/60 backdrop-blur-md border border-slate-700/50 px-4 py-2.5 rounded-2xl rounded-tl-sm text-slate-300 shadow-sm">
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-blue-500/20" />
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <agentStatus.icon className="w-3.5 h-3.5 text-blue-400" />
                  <span className="bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">
                    {agentStatus.text}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-1" />
      </div>

      {/* ناحیه ورود متن (Input Area) */}
      <div className="relative z-10 shrink-0 px-3 sm:px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-slate-900/80 backdrop-blur-xl border-t border-slate-700/50">
        <div className="relative flex items-end gap-2 bg-slate-800/50 rounded-2xl border border-slate-700/50 ring-1 ring-white/5 transition-all focus-within:ring-blue-500/50 focus-within:border-blue-500/50 shadow-inner">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              pinnedToBottomRef.current = true;
            }}
            onKeyDown={handleKeyDown}
            placeholder="Ask about my skills or projects..."
            className="w-full max-h-28 min-h-[44px] py-3 pl-4 pr-12 bg-transparent text-slate-100 placeholder:text-slate-500 text-[14px] sm:text-[15px] resize-none outline-none scrollbar-thin scrollbar-thumb-slate-600"
            rows={1}
            dir="auto"
          />
          
          <div className="absolute right-1.5 bottom-1.5 flex items-center">
            {isLoading ? (
              <button
                onClick={handleCancel}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-colors flex items-center justify-center group"
                title="Stop generating"
              >
                <StopCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!input.trim()}
                className={`p-2 rounded-xl transition-all duration-200 flex items-center justify-center group ${
                  input.trim()
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 hover:bg-blue-500 hover:scale-105"
                    : "bg-slate-700/50 text-slate-500 cursor-not-allowed"
                }`}
              >
                <Send className={`w-4 h-4 sm:w-5 sm:h-5 ${input.trim() ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" : ""}`} />
              </button>
            )}
          </div>
        </div>
        
        {/* راهنمای کوچک (اسپیس‌های اضافی حذف شدند) */}
        <div className="text-center mt-1.5 sm:mt-2">
          <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium tracking-wide">
            Powered by LangGraph & Pinecone
          </p>
        </div>
      </div>
    </div>
  );
}
// components/Chat.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  GlobeIcon,
  MessageSquare,
  X,
  Sparkles,
  Brain,
  Search,
  Zap,
} from "lucide-react";

const models = [
  { id: "gpt-4o", name: "GPT-4o" },
  { id: "gpt-3.5-mini", name: "GPT-3.5 Mini" },
];

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const NEAR_BOTTOM_PX = 72;

const LOADING_MESSAGE_TEXTS = [
  "Analyzing your question...",
  "Searching my knowledge...",
  "Crafting the best answer...",
  "Finalizing response...",
] as const;

const LOADING_ICONS = [Brain, Search, Sparkles, Zap] as const;

const LoadingSpinnerIcon = ({ index }: { index: number }) => {
  const Icon = LOADING_ICONS[index % LOADING_ICONS.length];
  return <Icon className="w-4 h-4" />;
};

const isRTL = (text: string): boolean => {
  const rtlRegex =
    /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return rtlRegex.test(text);
};

const getTextDirection = (text: string): "rtl" | "ltr" => {
  return isRTL(text) ? "rtl" : "ltr";
};

const MessageBubble = ({
  content,
  isUser,
}: {
  content: string;
  isUser: boolean;
}) => {
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
  const [viewportMaxHeight, setViewportMaxHeight] = useState<number | null>(
    null
  );
  const [loadingIndex, setLoadingIndex] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const messagesScrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const pinnedToBottomRef = useRef(true);
  const lastViewportMaxRef = useRef<number | null>(null);

  const updatePinnedToBottom = useCallback(() => {
    const el = messagesScrollRef.current;
    if (!el) return;
    const distanceFromBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight;
    pinnedToBottomRef.current = distanceFromBottom < NEAR_BOTTOM_PX;
  }, []);

  const scrollMessagesToBottom = useCallback((behavior: ScrollBehavior) => {
    messagesEndRef.current?.scrollIntoView({ block: "end", behavior });
  }, []);

  useEffect(() => {
    const vv = typeof window !== "undefined" ? window.visualViewport : null;
    if (!vv) return;

    let raf = 0;

    const applyLayout = () => {
      const root = rootRef.current;
      const scrollEl = messagesScrollRef.current;
      if (!root) return;

      const prevScrollTop = scrollEl?.scrollTop ?? 0;
      const prevScrollHeight = scrollEl?.scrollHeight ?? 0;
      const wasPinned = pinnedToBottomRef.current;

      const rect = root.getBoundingClientRect();
      const visibleBottom = vv.offsetTop + vv.height;
      const space = Math.floor(visibleBottom - rect.top);

      const nextMax =
        space > 0 && space < rect.height - 2
          ? Math.max(220, space)
          : null;

      if (lastViewportMaxRef.current !== nextMax) {
        lastViewportMaxRef.current = nextMax;
        setViewportMaxHeight(nextMax);
      }

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = messagesScrollRef.current;
        if (!el) return;

        if (wasPinned) {
          el.scrollTop = el.scrollHeight - el.clientHeight;
        } else {
          const delta = el.scrollHeight - prevScrollHeight;
          el.scrollTop = Math.max(0, prevScrollTop + delta);
        }
      });
    };

    const onVV = () => applyLayout();

    vv.addEventListener("resize", onVV);
    vv.addEventListener("scroll", onVV);
    window.addEventListener("resize", onVV);

    applyLayout();

    return () => {
      cancelAnimationFrame(raf);
      vv.removeEventListener("resize", onVV);
      vv.removeEventListener("scroll", onVV);
      window.removeEventListener("resize", onVV);
    };
  }, []);

  useEffect(() => {
    updatePinnedToBottom();
    if (pinnedToBottomRef.current) {
      scrollMessagesToBottom("smooth");
    }
  }, [messages, streamingContent, updatePinnedToBottom, scrollMessagesToBottom]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setLoadingIndex((prev) => (prev + 1) % LOADING_MESSAGE_TEXTS.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setStreamingContent("");

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          model: model,
          webSearch: useWebSearch,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

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

      if (accumulatedContent) {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: accumulatedContent,
          },
        ]);
      }
    } catch (error: unknown) {
      const err = error as { name?: string; message?: string };
      if (err.name !== "AbortError") {
        console.error("Error:", error);
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: `❌ Error: ${err.message || "Connection problem occurred"}`,
          },
        ]);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    requestAnimationFrame(() => {
      pinnedToBottomRef.current = true;
      scrollMessagesToBottom("smooth");
    });
  };

  return (
    <div
      ref={rootRef}
      className="flex flex-col h-full min-h-0 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl overflow-hidden"
      style={
        viewportMaxHeight != null
          ? { maxHeight: viewportMaxHeight, height: viewportMaxHeight }
          : undefined
      }
    >
      <div className="flex shrink-0 justify-between items-center gap-2 p-3 sm:p-4 border-b border-slate-700 bg-slate-800/50 backdrop-blur">
        <h2 className="text-base sm:text-xl font-semibold text-white flex items-center gap-2 min-w-0">
          <MessageSquare className="w-5 h-5 text-blue-400 animate-pulse shrink-0" />
          <span className="flex items-baseline gap-2 min-w-0">
            <div className="relative min-w-0">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent truncate block max-w-[min(100%,16rem)] sm:max-w-none">
                ASK ABOUT MURTAZA AFZALI
              </span>
              <span className="inline-block w-0.5 h-5 bg-blue-400 ml-0.5 animate-blink align-middle" />
            </div>
          </span>
        </h2>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors group shrink-0"
            aria-label="Close chat"
          >
            <X className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
          </button>
        )}
      </div>

      <div
        ref={messagesScrollRef}
        onScroll={updatePinnedToBottom}
        className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain p-3 sm:p-4 space-y-3 touch-pan-y"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[12rem] text-center px-2">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full p-6 mb-4">
              <MessageSquare className="w-12 h-12 text-blue-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
              Welcome to Smart Assistant
            </h3>
            <p className="text-slate-400 max-w-md text-sm sm:text-base">
              Ask me anything! I&apos;m here to help you.
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

        {streamingContent && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-slate-700/50 backdrop-blur text-slate-100 border border-slate-600">
              <p
                className="whitespace-pre-wrap break-words"
                dir={getTextDirection(streamingContent)}
                style={{
                  textAlign:
                    getTextDirection(streamingContent) === "rtl"
                      ? "right"
                      : "left",
                }}
              >
                {streamingContent}
                <span className="inline-block w-0.5 h-5 bg-blue-400 ml-1 animate-blink" />
              </p>
            </div>
          </div>
        )}

        {isLoading && !streamingContent && (
          <div className="flex justify-start">
            <div className="bg-slate-700/50 backdrop-blur rounded-2xl px-4 py-3 border border-slate-600">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-400 border-t-transparent" />
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <LoadingSpinnerIcon index={loadingIndex} />
                  <span className="text-sm">
                    {LOADING_MESSAGE_TEXTS[loadingIndex]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="shrink-0 border-t border-slate-700 bg-slate-800/50 backdrop-blur p-3 sm:p-4 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))]">
        <div className="flex flex-col gap-3">
          <textarea
            ref={inputRef}
            className="w-full p-3 bg-slate-700 border border-slate-600 text-white text-base rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
            value={input}
            onChange={handleInputChange}
            rows={2}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            dir="auto"
            enterKeyHint="send"
          />

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between sm:items-center">
            <div className="flex flex-wrap gap-2">
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
                className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-0"
              >
                {models.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 justify-end">
              {isLoading && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Cancel
                </button>
              )}
              <button
                type="button"
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
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
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

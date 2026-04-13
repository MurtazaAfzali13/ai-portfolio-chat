"use client";

import { useState, useEffect, useRef } from "react";
import { GlobeIcon, MessageSquare, X } from "lucide-react";

const models = [
  { id: "gpt-4o", name: "GPT-4o" },
  { id: "gpt-3.5-mini", name: "GPT-3.5 Mini" },
];

type Msg = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

/* ✅ استخراج متن از هر نوع پاسخ API */
function extractText(data: any): string {
  if (!data) return "";

  if (typeof data === "string") return data;

  if (data.content) return data.content;

  if (data?.choices?.[0]?.message?.content) {
    return data.choices[0].message.content;
  }

  return "⚠️ No valid response";
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(models[0].id);
  const [useWebSearch, setUseWebSearch] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true); // true برای نمایش مستقیم چت
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  /* ✅ متن‌های داینامیک برای loading */
  const loadingSteps = [
    "🧠 در حال درک سوال...",
    "🔍 در حال تحلیل اطلاعات...",
    "⚡ در حال ساخت پاسخ...",
    "✨ تقریباً آماده است...",
  ];

  const [loadingText, setLoadingText] = useState(loadingSteps[0]);

  useEffect(() => {
    if (!loading) return;

    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % loadingSteps.length;
      setLoadingText(loadingSteps[i]);
    }, 1200);

    return () => clearInterval(interval);
  }, [loading]);

  // ✅ اسکرول خودکار به پایین هنگام دریافت پیام جدید
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth", 
        block: "end" 
      });
    }
  }, [messages]); // فقط وقتی messages تغییر می‌کند اسکرول شود

  const handleSubmit = async () => {
    const content = text.trim();
    if (!content || loading) return;

    // پیام کاربر
    const userMessage: Msg = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setText("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content }],
          model,
          webSearch: useWebSearch,
        }),
      });

      const data = await res.json();
      
      console.log("API Response:", data); // برای دیباگ

      const assistantMessage: Msg = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: extractText(data),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error("Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "❌ Error: " + err.message,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* دکمه باز کردن Modal - اگر می‌خواهید مستقیم چت باز شود می‌توانید این را حذف کنید */}
      {!isModalOpen && (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg"
          >
            Open Chat
          </button>
        </div>
      )}

      {/* Modal با عرض افزایش یافته */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div 
            className="bg-slate-800 rounded-xl shadow-2xl flex flex-col relative"
            style={{ 
              width: "calc(100% + 100px)", // افزایش عرض به اندازه 100px
              maxWidth: "900px", 
              height: "80vh",
              minHeight: "500px"
            }}
          >
            {/* هدر Modal */}
            <div className="flex justify-between items-center p-4 border-b border-slate-700">
              <h2 className="text-xl font-semibold text-gray-100">Chat Assistant</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            {/* محتوای Chat */}
            <div className="flex-1 flex flex-col p-4 overflow-hidden">
              {/* Messages Container */}
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto mb-4 flex flex-col gap-3"
              >
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center flex-1 text-gray-300">
                    <MessageSquare size={48} className="mb-4" />
                    <h2 className="text-xl font-semibold mb-1">
                      شروع مکالمه
                    </h2>
                    <p className="text-gray-400">
                      پیام خود را بنویسید...
                    </p>
                  </div>
                )}

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-lg max-w-[70%] whitespace-pre-wrap break-words ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-700 text-gray-100"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {/* ✅ لودینگ حرفه‌ای */}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-700 p-3 rounded-lg">
                      <div className="text-gray-300 text-sm animate-pulse">
                        {loadingText}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* عنصر خالی برای اسکرول خودکار */}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="flex flex-col gap-2 border-t border-slate-700 pt-4">
                <textarea
                  className="w-full p-3 bg-slate-700 border border-slate-600 text-gray-100 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="پیام خود را بنویسید..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={3}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                />

                <div className="flex justify-between items-center">
                  {/* Controls */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setUseWebSearch(!useWebSearch)}
                      className={`flex items-center gap-1 px-3 py-1 rounded-lg border transition ${
                        useWebSearch
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-slate-700 text-gray-200 border-slate-600 hover:bg-slate-600"
                      }`}
                    >
                      <GlobeIcon size={16} />
                      جستجو
                    </button>

                    <select
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="bg-slate-700 border border-slate-600 text-gray-100 rounded-lg px-3 py-1"
                    >
                      {models.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Send Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={!text.trim() || loading}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      !text.trim() || loading
                        ? "bg-slate-600 text-gray-400 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {loading ? "در حال ارسال..." : "ارسال"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* استایل‌های انیمیشن */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-in {
          animation: fade-in 0.2s ease-out;
        }
        
        /* اسکرولبار سفارشی */
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
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
    </>
  );
}
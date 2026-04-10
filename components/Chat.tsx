"use client";

import { useState } from "react";
import { GlobeIcon, MessageSquare } from "lucide-react";

const models = [
  { id: "gpt-4o", name: "GPT-4o" },
  { id: "gpt-3.5-mini", name: "GPT-3.5 Mini" },
];

type Msg = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(models[0].id);
  const [useWebSearch, setUseWebSearch] = useState(false);

  const handleSubmit = async () => {
    const content = text.trim();
    if (!content || loading) return;

    // 1. Add user message immediately
    const userMessage: Msg = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setText("");
    setLoading(true);

    try {
      // 2. Call API
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content,
            },
          ],
          model,
          webSearch: useWebSearch,
        }),
      });

      const data = await res.json();

      // 3. Add assistant message
      const assistantMessage: Msg = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.content ?? data,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
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
    <div className="max-w-4xl mx-auto p-6 h-[700px] border border-slate-700 rounded-xl flex flex-col bg-slate-800 text-gray-100">

      {/* Conversation */}
      <div className="flex-1 overflow-auto mb-4 flex flex-col gap-3">

        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center flex-1 text-gray-300">
            <MessageSquare size={48} className="mb-4" />
            <h2 className="text-xl font-semibold mb-1">
              Start a conversation
            </h2>
            <p className="text-gray-400">
              Type a message below to begin chatting
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
              className={`p-3 rounded-lg max-w-[70%] whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-gray-100"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div className="text-gray-400 text-sm px-2">
            AI is thinking...
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex flex-col gap-2">

        <textarea
          className="w-full p-3 bg-slate-700 border border-slate-600 text-gray-100 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
        />

        <div className="flex justify-between items-center">

          {/* Left controls */}
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
              Search
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

          {/* Send */}
          <button
            onClick={handleSubmit}
            disabled={!text.trim() || loading}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              !text.trim() || loading
                ? "bg-slate-600 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {loading ? "Thinking..." : "Send"}
          </button>

        </div>
      </div>
    </div>
  );
}
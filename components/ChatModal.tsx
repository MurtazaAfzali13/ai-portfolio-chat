"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const Chat = dynamic(() => import("@/components/Chat"), { ssr: false });

export default function ChatModal() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        Chat
      </button>

      {/* Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          
          <div className="bg-gray-700 w-full max-w-md h-[700px] rounded-xl shadow-xl relative flex flex-col">

            {/* Close Button */}
            <button
              onClick={() => setIsChatOpen(false)}
              className="absolute top-3 right-3 text-gray-100 hover:text-white text-lg"
            >
              ✕
            </button>

            {/* Chat Container */}
            <div className="flex-1 p-4 overflow-hidden">
              <Chat />
            </div>

          </div>
        </div>
      )}
    </>
  );
}
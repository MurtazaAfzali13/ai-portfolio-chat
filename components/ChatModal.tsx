// components/ChatModal.tsx
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const Chat = dynamic(() => import("@/components/Chat"), { ssr: false });

export default function ChatModal() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Floating AI Assistant Box */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Clickable Tooltip Box */}
        <div
          onClick={() => setIsChatOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative group cursor-pointer"
        >
          {/* Outer glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Tooltip content - clickable box */}
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-2xl shadow-2xl transition-all duration-300 transform group-hover:scale-105 group-active:scale-95">
            {/* Tooltip arrow pointing down */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rotate-45"></div>
            
            <div className="flex items-center gap-3">
              <span className="font-semibold text-base">AI Assistant</span>
            </div>
            <div className="text-xs opacity-90 mt-1 whitespace-nowrap">
              Ask me anything! ✨
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md h-[700px] rounded-xl shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
            {/* Modal background with gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl opacity-75 blur"></div>
            <div className="absolute inset-[2px] bg-gray-800 rounded-xl"></div>
            
            {/* Chat Component with close handler */}
            <div className="relative h-full">
              <Chat onClose={() => setIsChatOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
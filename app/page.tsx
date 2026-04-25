// app/page.tsx
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import Technologies from "@/components/Technologies";
import DownloadCV from "@/components/DownloadCV";
import CVModal from "@/components/CVModal";

const SpaceBackground = dynamic(
  () => import("@/components/SpaceBackground"),
  { ssr: false }
);

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">
      {/* استفاده از کامپوننت بک‌گراند */}
      <SpaceBackground />

      {/* محتوای اصلی */}
      <div className="relative z-10 w-full">
        {/* Hero Section */}
        <section className="fade-in mb-16 px-4">
          <div className="mb-8 flex flex-col items-center">
            {/* Profile Image Section */}
            <div className="w-60 h-60 mb-6 rounded-full overflow-hidden border-4 border-yellow-300 shadow-2xl backdrop-blur-lg bg-white/20">
              <Link href="/image">
                <Image
                  src="/images/murtazaafzali.jpg"
                  alt="Murtaza Afzali - AI Engineer"
                  className="w-full h-full object-cover"
                  width={200}
                  height={200}
                  priority
                />
              </Link>
            </div>

            {/* Text Section */}
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white text-center drop-shadow-2xl">
              Hi, I am{" "}
              <span className="text-yellow-300 glow-text">
                Murtaza Afzali
              </span>
            </h1>

            <div className="text-2xl md:text-3xl text-white/95 mb-4 slide-in-left text-center">
              <span className="pulse-slow font-semibold drop-shadow-lg">
                AI Engineer & RAG Specialist
              </span>
            </div>

            <p className="text-xl text-white/85 max-w-2xl mx-auto slide-in-right text-center backdrop-blur-lg bg-black/40 p-6 rounded-2xl border border-white/20 shadow-2xl">
              Specializing in RAG Architecture, LLM-powered applications, and semantic search systems.
              Building intelligent Q&A platforms using LangChain, LangGraph, FastAPI, Pinecone vector database,
              and Vercel AI SDK.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in">
            <a
              href="/projects"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full shadow-2xl hover-lift text-lg font-semibold transition-all duration-300 backdrop-blur-lg border border-white/20 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105"
            >
              View AI Projects
            </a>
            <button
              onClick={() => setIsModalOpen(true)}
              className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 text-lg font-semibold backdrop-blur-lg bg-black/40 hover:bg-white/90 transform hover:scale-105"
            >
              Start RAG Project
            </button>
          </div>
        </section>

        <div className="mb-10">
          <Technologies />
        </div>

        {/* Quick Stats - AI Focused */}
        <section className="w-full max-w-4xl mx-auto mb-16 fade-in px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 text-center hover-lift border border-white/20 shadow-xl transition-all duration-300 hover:bg-white/25">
              <div className="text-4xl font-bold text-yellow-300 mb-2 drop-shadow-lg">
                2+
              </div>
              <div className="text-white font-semibold">Years in AI & RAG</div>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 text-center hover-lift border border-white/20 shadow-xl transition-all duration-300 hover:bg-white/25">
              <div className="text-4xl font-bold text-yellow-300 mb-2 drop-shadow-lg">
                15+
              </div>
              <div className="text-white font-semibold">AI Projects Built</div>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 text-center hover-lift border border-white/20 shadow-xl transition-all duration-300 hover:bg-white/25">
              <div className="text-4xl font-bold text-yellow-300 mb-2 drop-shadow-lg">
                100%
              </div>
              <div className="text-white font-semibold">Client Satisfaction</div>
            </div>
          </div>
        </section>

        {/* Call to Action - View Resume */}
        <section className="text-center fade-in px-4">
          <h3 className="text-2xl font-bold text-white mb-4 backdrop-blur-lg bg-black/40 p-4 rounded-2xl inline-block border border-white/20 shadow-2xl">
            Ready to Build Your RAG System?
          </h3>
          <p className="text-white/80 mb-6 backdrop-blur-lg bg-black/40 p-3 rounded-xl inline-block border border-white/20">
            Let's create intelligent semantic search and Q&A experiences!
          </p>
          <br />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-full shadow-2xl hover-lift text-lg font-semibold transition-all duration-300 inline-block backdrop-blur-lg border border-white/20 hover:from-green-600 hover:to-blue-700 transform hover:scale-105"
          >
            📄 View Resume
          </button>
        </section>
        
        <div className="m-4 cursor-pointer">
          <DownloadCV />
        </div>
      </div>

      {/* Modal برای نمایش رزومه */}
      <CVModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <style jsx>{`
        .glow-text {
          text-shadow: 0 0 10px rgba(255, 255, 0, 0.5),
            0 0 20px rgba(255, 255, 0, 0.3), 0 0 30px rgba(255, 255, 0, 0.2);
        }
        .hover-lift:hover {
          transform: translateY(-5px);
        }
        .slide-in-left {
          animation: slideInLeft 0.8s ease-out;
        }
        .slide-in-right {
          animation: slideInRight 0.8s ease-out;
        }
        .fade-in {
          animation: fadeIn 1s ease-out;
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
// app/components/AboutContent.tsx
"use client";

interface Experience {
  period: string;
  title: string;
  company: string;
  description: string;
}

interface Interest {
  icon: string;
  title: string;
  description: string;
}

interface Skills {
  aiStack: string[];
  backendTools: string[];
}

export default function AboutContent() {
  const skills: Skills = {
    aiStack: [
      "RAG Architecture & LLM",
      "LangChain & LangGraph",
      "FastAPI & Backend AI",
      "Pinecone Vector Database",
      "Vercel AI SDK",
      "Semantic Search Systems"
    ],
    backendTools: [
      "Git & GitHub",
      "Docker & AWS",
      "PostgreSQL & Supabase",
      "TypeScript & Python",
      "API Development",
      "Testing & Optimization"
    ]
  };

  const experiences: Experience[] = [
    {
      period: "2023 - Present",
      title: "AI Engineer & Full-Stack Developer",
      company: "Freelance & Personal RAG Projects",
      description: "Designing and implementing RAG architectures, building LLM-powered applications with LangChain and LangGraph, developing FastAPI backends with Pinecone vector database, and integrating Vercel AI SDK for intelligent Q&A systems."
    },
    {
      period: "2022 - 2023",
      title: "Full-Stack Development Foundation",
      company: "Self-Taught Journey to AI",
      description: "Intensive learning of modern web development, transitioning from frontend to full-stack, and building foundation for AI-powered applications and RAG systems."
    }
  ];

  const interests: Interest[] = [
    {
      icon: "🧠",
      title: "AI & RAG",
      description: "Passionate about building intelligent retrieval-augmented generation systems and LLM applications"
    },
    {
      icon: "📚",
      title: "Research",
      description: "Always exploring new advancements in semantic search, vector databases, and agent workflows"
    },
    {
      icon: "🌱",
      title: "Innovation",
      description: "Committed to creating human-centered AI solutions that transform how people interact with information"
    }
  ];

  return (
    <div className="relative z-10 w-full">
      {/* Hero Section - AI Engineer */}
      <section className="fade-in mb-16 px-4">
        <div className="mb-8 flex flex-col items-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white text-center drop-shadow-2xl">
            About <span className="text-yellow-300 glow-text">AI Engineer</span>
          </h1>

          <div className="text-2xl md:text-3xl text-white/95 mb-4 slide-in-left text-center">
            <span className="pulse-slow font-semibold drop-shadow-lg">
              RAG Architecture & LLM Specialist
            </span>
          </div>

          <p className="text-xl text-white/85 max-w-2xl mx-auto slide-in-right text-center backdrop-blur-lg bg-black/40 p-6 rounded-2xl border border-white/20 shadow-2xl">
            Building intelligent systems that understand context and deliver precise answers through semantic search
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4">
        {/* Story Section - RAG Journey */}
        <section className="mb-16 slide-in-left">
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6">My AI Journey</h2>
            <div className="text-white/90 leading-relaxed space-y-4 text-lg">
              <p>
                I am Murtaza Afzali, an AI Engineer specializing in Retrieval-Augmented Generation (RAG) architecture 
                and Large Language Model applications. My journey began with frontend development and evolved into 
                building intelligent systems that bridge the gap between human questions and machine understanding.
              </p>
              <p>
                I specialize in end-to-end RAG system design using LangChain for orchestration, LangGraph for agent 
                workflows, FastAPI for high-performance backends, and Pinecone as vector database. My expertise extends 
                to implementing semantic search, context-aware Q&A chatbots, and streaming AI responses with Vercel AI SDK.
              </p>
              <p>
                When I am not building AI systems, I explore new advancements in LLMs, contribute to open-source AI projects, 
                and research optimal retrieval strategies for better response quality. I believe in creating technology that 
                fundamentally transforms how people interact with information.
              </p>
            </div>
          </div>
        </section>

        {/* Skills & Expertise - AI Stack */}
        <section className="mb-16 slide-in-right">
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">AI & Technical Expertise</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-yellow-300 mb-4">RAG & LLM Stack</h3>
                <div className="space-y-3">
                  {skills.aiStack.map((skill, index) => (
                    <div key={skill} className="flex items-center text-white/90 group hover:bg-white/5 p-3 rounded-lg transition-all duration-300">
                      <span className="w-2 h-2 bg-yellow-300 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-300 mb-4">Development & Infrastructure</h3>
                <div className="space-y-3">
                  {skills.backendTools.map((tool, index) => (
                    <div key={tool} className="flex items-center text-white/90 group hover:bg-white/5 p-3 rounded-lg transition-all duration-300">
                      <span className="w-2 h-2 bg-yellow-300 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                      {tool}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Timeline - RAG Focus */}
        <section className="mb-16 fade-in">
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">RAG Development Journey</h2>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="flex flex-col md:flex-row items-start md:items-center group hover:bg-white/5 p-6 rounded-xl transition-all duration-300">
                  <div className="bg-gradient-to-r from-yellow-300 to-yellow-400 text-gray-900 px-4 py-2 rounded-full font-semibold mb-4 md:mb-0 md:mr-8 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                    {exp.period}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                      {exp.title}
                    </h3>
                    <p className="text-white/80">{exp.company}</p>
                    <p className="text-white/70 mt-2 group-hover:text-white/90 transition-colors duration-300">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Personal Interests - AI Focused */}
        <section className="mb-16 slide-in-left">
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Beyond Code</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {interests.map((interest, index) => (
                <div key={index} className="text-center group hover:bg-white/10 p-6 rounded-xl transition-all duration-300">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {interest.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                    {interest.title}
                  </h3>
                  <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                    {interest.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action - RAG Projects */}
        <section className="text-center fade-in">
          <div className="bg-gradient-to-r from-blue-500/30 to-purple-600/30 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-4">Build Intelligent RAG Systems</h2>
            <p className="text-white/80 mb-6 text-lg">
              I am always interested in challenging AI projects and RAG implementations.
              Let us discuss how we can bring intelligent Q&A systems to life!
            </p>
            <a
              href="/contact"
              className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-full shadow-2xl hover-lift text-lg font-semibold transition-all duration-300 inline-block backdrop-blur-lg border border-white/20 hover:from-green-600 hover:to-blue-700 transform hover:scale-105"
            >
              Start an AI Project
            </a>
          </div>
        </section>
      </div>

      <style jsx>{`
        .glow-text {
          text-shadow: 0 0 10px rgba(255, 255, 0, 0.5),
            0 0 20px rgba(255, 255, 0, 0.3),
            0 0 30px rgba(255, 255, 0, 0.2);
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
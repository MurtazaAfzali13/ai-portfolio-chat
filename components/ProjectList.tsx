// app/components/ProjectsList.tsx
"use client";
import { useState, useEffect } from "react";
import ProjectCard from "@/components/ProjectCard";
import HeroSkeleton from "@/components/skeletons/HeroSkeleton";
import ProjectCardSkeleton from "@/components/skeletons/ProjectCardSkeleton";
import FeaturedProjectSkeleton from "@/components/skeletons/FeaturedProjectSkeleton";

interface Project {
  id?: string;
  title: string;
  desc: string;
  tech: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  createdAt?: string;
}

interface Technology {
  name: string;
  icon: string;
}

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [featuredProject, setFeaturedProject] = useState<Project | null>(null);

  useEffect(() => {
    async function fetchProjects(): Promise<void> {
      try {
        const res = await fetch("/api/projects");
        const data: Project[] = await res.json();
        setProjects(data);
        console.log("RAG-based projects fetched:", data);
        console.log("Semantic search ready:", Array.isArray(data));

        // تنظیم پروژه ویژه با استفاده از معماری RAG
        if (data.length > 0) {
          setFeaturedProject(data[0]);
        }
      } catch (error) {
        console.error("Error fetching from LangChain backend:", error);
      }
    }

    fetchProjects();
  }, []);

  // تکنولوژی‌های هوشمند مبتنی بر RAG و LLM
  const technologies: Technology[] = [
    { name: "LangChain", icon: "⛓️" },
    { name: "LangGraph", icon: "🕸️" },
    { name: "FastAPI", icon: "⚡" },
    { name: "Pinecone", icon: "🌲" },
    { name: "Vercel AI SDK", icon: "🤖" },
    { name: "RAG Architecture", icon: "📚" },
    { name: "LLM", icon: "🧠" },
    { name: "Semantic Search", icon: "🔍" },
    { name: "Vector Database", icon: "📊" }
  ];

  if (projects.length === 0) {
    return (
      <div className="relative z-10 w-full">
        <HeroSkeleton />

        <section className="max-w-7xl mx-auto px-4 mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        </section>

        <FeaturedProjectSkeleton />
      </div>
    );
  }

  return (
    <div className="relative z-10 w-full">
      {/* Hero Section - RAG-based Intelligent Systems */}
      <section className="fade-in mb-16 px-4">
        <div className="mb-8 flex flex-col items-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white text-center drop-shadow-2xl">
            AI <span className="text-yellow-300 glow-text">Intelligent Projects</span>
          </h1>

          <div className="text-2xl md:text-3xl text-white/95 mb-4 slide-in-left text-center">
            <span className="pulse-slow font-semibold drop-shadow-lg">
              RAG-Powered & LLM-Driven Applications
            </span>
          </div>

          <p className="text-xl text-white/85 max-w-3xl mx-auto slide-in-right text-center backdrop-blur-lg bg-black/40 p-6 rounded-2xl border border-white/20 shadow-2xl">
            A collection of projects built with Retrieval-Augmented Generation (RAG) architecture,
            Large Language Models, and modern AI infrastructure including LangChain, LangGraph,
            FastAPI, Pinecone vector database, and Vercel AI SDK for intelligent Q&A systems.
          </p>
        </div>
      </section>

      {/* Projects Grid - AI-Powered Solutions */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard
                title={project.title}
                desc={project.desc}
                tech={project.tech}
                image={project.image}
                liveUrl={project.liveUrl}
                githubUrl={project.githubUrl}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Featured Project Section - RAG Architecture Showcase */}
      {featuredProject && (
        <section className="max-w-6xl mx-auto px-4 mb-16 slide-in-left">
          <div className="bg-gradient-to-r from-blue-500/30 to-purple-600/30 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Featured RAG System</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-yellow-300 mb-4">{featuredProject.title}</h3>
                <p className="text-white/90 leading-relaxed mb-6">
                  {featuredProject.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredProject.tech?.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-yellow-300/20 text-yellow-300 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {featuredProject.liveUrl && (
                    <a
                      href={featuredProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 backdrop-blur-lg border border-white/20 shadow-2xl hover-lift"
                    >
                      Live Demo
                    </a>
                  )}
                  {featuredProject.githubUrl && (
                    <a
                      href={featuredProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-2 border-white/30 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-lg hover-lift"
                    >
                      View Code
                    </a>
                  )}
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl h-64 flex items-center justify-center border border-white/20 backdrop-blur-sm">
                {featuredProject.image ? (
                  <img
                    src={featuredProject.image}
                    alt={featuredProject.title}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <span className="text-8xl opacity-50">🧠</span>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Skills Showcase - AI Stack */}
      <section className="max-w-6xl mx-auto px-4 mb-16 slide-in-right">
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">AI & RAG Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <div
                key={tech.name}
                className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 group hover-lift border border-white/10"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <div className="text-white text-sm font-medium group-hover:text-yellow-300 transition-colors duration-300">
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Build Intelligent Systems */}
      <section className="text-center fade-in px-4">
        <div className="bg-gradient-to-r from-green-500/30 to-blue-600/30 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">Build Intelligent RAG Systems Together</h2>
          <p className="text-white/80 mb-6 text-lg">
            Let's create next-generation AI applications with semantic search, context-aware Q&A,
            and LLM-powered experiences using LangChain, LangGraph, FastAPI, and Pinecone.
          </p>
          <a
            href="/contact"
            className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-full shadow-2xl hover-lift text-lg font-semibold transition-all duration-300 inline-block backdrop-blur-lg border border-white/20 hover:from-green-600 hover:to-blue-700 transform hover:scale-105"
          >
            Start an AI Project
          </a>
        </div>
      </section>

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
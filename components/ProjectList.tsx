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
        console.log("API data:", data);
        console.log("Is Array?", Array.isArray(data));

        // تنظیم پروژه ویژه (اولین پروژه یا یک پروژه خاص)
        if (data.length > 0) {
          setFeaturedProject(data[0]);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }

    fetchProjects();
  }, []);

  // داده‌های ثابت برای تکنولوژی‌ها
  const technologies: Technology[] = [
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "TypeScript", icon: "🔷" },
    { name: "AWS", icon: "☁️" },
    { name: "Docker", icon: "🐳" },
    { name: "Redis", icon: "🔴" },
    { name: "GraphQL", icon: "🔺" },
    { name: "Jest", icon: "🧪" },
    { name: "Cypress", icon: "🌲" }
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
      {/* Hero Section */}
      <section className="fade-in mb-16 px-4">
        <div className="mb-8 flex flex-col items-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white text-center drop-shadow-2xl">
            My <span className="text-yellow-300 glow-text">Projects</span>
          </h1>

          <div className="text-2xl md:text-3xl text-white/95 mb-4 slide-in-left text-center">
            <span className="pulse-slow font-semibold drop-shadow-lg">
              Innovative Web Applications
            </span>
          </div>

          <p className="text-xl text-white/85 max-w-3xl mx-auto slide-in-right text-center backdrop-blur-lg bg-black/40 p-6 rounded-2xl border border-white/20 shadow-2xl">
            A collection of projects that showcase my skills and passion for creating
            innovative web applications
          </p>
        </div>
      </section>

      {/* Projects Grid */}
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

      {/* Featured Project Section */}
      {featuredProject && (
        <section className="max-w-6xl mx-auto px-4 mb-16 slide-in-left">
          <div className="bg-gradient-to-r from-blue-500/30 to-purple-600/30 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Featured Project</h2>
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
                      View Live Demo
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
                  <span className="text-8xl opacity-50">🚀</span>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Skills Showcase */}
      <section className="max-w-6xl mx-auto px-4 mb-16 slide-in-right">
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Technologies Used</h2>
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

      {/* Call to Action */}
      <section className="text-center fade-in px-4">
        <div className="bg-gradient-to-r from-green-500/30 to-blue-600/30 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">Interested in Working Together?</h2>
          <p className="text-white/80 mb-6 text-lg">
            I&apos;m always excited to take on new challenges and create amazing digital experiences.
            Let&apos;s discuss your next project!
          </p>
          <a
            href="/contact"
            className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-full shadow-2xl hover-lift text-lg font-semibold transition-all duration-300 inline-block backdrop-blur-lg border border-white/20 hover:from-green-600 hover:to-blue-700 transform hover:scale-105"
          >
            Start a Project
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
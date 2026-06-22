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
      "Autonomous Agentic Workflows (LangGraph & LangChain)",
      "State-Based Iterative Reasoning & Graph Flows",
      "Reflection Agents & Self-Critique Loops",
      "Multi-Step Tool Calling & Logic Orchestration",
      "FastAPI Asynchronous Intelligent Services",
      "Vercel AI SDK Streaming UX"
    ],
    backendTools: [
      "Python & LLM APIs (OpenAI, Anthropic, OpenRouter)",
      "Next.js App Router & React",
      "TypeScript & Tailwind CSS",
      "PostgreSQL, Supabase & Vector Databases",
      "Version Control (Git) & API Architecture",
      "shadcn/ui Component Systems"
    ]
  };

  const experiences: Experience[] = [
    {
      period: "2024 - Present",
      title: "AI & Full-Stack Developer",
      company: "Open-Source & Independent Projects",
      description:
        "Building and experimenting with autonomous AI agents and iterative workflow state machines using LangGraph and LangChain. Developed reflection-based architectures that critique and self-correct outputs, alongside multi-step reasoning graphs that invoke tools dynamically to solve structured problems."
    },
    {
      period: "2022 - 2024",
      title: "Full-Stack Development Foundation",
      company: "Technical Deep Dive & Exploration",
      description:
        "Mastered modern web stacks (React, Next.js, TypeScript) and integrated them with asynchronous Python/FastAPI backends. Focused heavily on bridging the gap between complex backend LLM logic and low-latency, responsive user interfaces."
    }
  ];

  const interests: Interest[] = [
    {
      icon: "🤖",
      title: "Stateful Agents",
      description:
        "Designing cyclic workflows and state machines using LangGraph where agents autonomously reason, call external tools, and evaluate when a task is completed."
    },
    {
      icon: "🪞",
      title: "Reflection Loops",
      description:
        "Implementing multi-chain systems where an initial output is critically analyzed by a critique layer, driving continuous, automated self-improvement."
    },
    {
      icon: "🔌",
      title: "Full-Stack AI Systems",
      description:
        "Connecting language models to live backend databases and streaming responses efficiently to modern frontend architectures for seamless user experiences."
    }
  ];

  return (
    <div className="relative z-10 w-full">
      <section className="fade-in mb-16 px-4">
        <div className="mb-8 flex flex-col items-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white text-center drop-shadow-2xl">
            About <span className="text-yellow-300 glow-text">Murtaza</span>
          </h1>

          <div className="text-2xl md:text-3xl text-white/95 mb-4 slide-in-left text-center">
            <span className="pulse-slow font-semibold drop-shadow-lg">
              AI Engineer | Autonomous Agents • LangGraph • FastAPI
            </span>
          </div>

          <p className="text-xl text-white/85 max-w-2xl mx-auto slide-in-right text-center backdrop-blur-lg bg-black/40 p-6 rounded-2xl border border-white/20 shadow-2xl">
            I build AI applications and autonomous agent workflows using LangGraph and LangChain, 
            while continuously expanding my knowledge of production AI systems and agent architectures.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4">
        <section className="mb-16 slide-in-left">
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6">My AI Journey</h2>
            <div className="text-white/90 leading-relaxed space-y-4 text-lg">
              <p>
                I am Murtaza Afzali, an AI & Full-Stack Engineer deeply motivated by building software that thinks, adapts, and acts. 
                My background in modern web development (<strong>JavaScript, TypeScript, React, and Next.js</strong>) 
                serves as a foundation for integrating complex <strong>autonomous AI architectures</strong> into practical user interfaces.
              </p>
              <p>
                My recent projects focus on building autonomous workflows using <strong>LangGraph, LangChain, and FastAPI</strong>. 
                Instead of simple, linear prompt engineering, I design state-based graph workflows where LLMs reflect on and improve 
                their own outputs. I have implemented reflection loops where models critique and refine responses iteratively, 
                as well as conditional routing mechanisms where agents autonomously determine when to call external tools or fetch data.
              </p>
              <p>
                For instance, I developed an autonomous research pipeline that accepts a complex domain problem, generates a draft, 
                invokes specialized tools to gather supporting facts, and continuously revises the answer until a strict stopping 
                condition is met. I have also engineered self-improving agents utilizing critique nodes to automate structured tasks like content optimization. 
                Additionally, I explore database-driven workflows where agents securely query and process relational data from 
                <strong>PostgreSQL and Supabase</strong> to ground their decision-making in real-time information.
              </p>
              <p>
                I am highly dedicated to research, hands-on experimentation, and continuous learning. While this portfolio highlights 
                core implementations, my active research, production experiments, and complete source code repositories are continuously updated 
                and can be explored directly on my <strong>GitHub profile</strong>.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16 slide-in-right">
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">AI & Technical Expertise</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-yellow-300 mb-4">Agentic Frameworks & Logic</h3>
                <div className="space-y-3">
                  {skills.aiStack.map((skill) => (
                    <div key={skill} className="flex items-center text-white/90 group hover:bg-white/5 p-3 rounded-lg transition-all duration-300">
                      <span className="w-2 h-2 bg-yellow-300 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-300 mb-4">Software Engineering Foundations</h3>
                <div className="space-y-3">
                  {skills.backendTools.map((tool) => (
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

        <section className="mb-16 fade-in">
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Professional Focus</h2>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="flex flex-col md:flex-row items-start md:items-center group hover:bg-white/5 p-6 rounded-xl transition-all duration-300">
                  <div className="bg-gradient-to-r from-yellow-300 to-yellow-400 text-gray-900 px-4 py-2 rounded-full font-semibold mb-4 md:mb-0 md:mr-8 group-hover:scale-105 transition-transform duration-300 shadow-lg whitespace-nowrap">
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

        <section className="mb-16 slide-in-left">
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Agent Capabilities</h2>
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

        <section className="text-center fade-in">
          <div className="bg-gradient-to-r from-blue-500/30 to-purple-600/30 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-4">Explore More on GitHub</h2>
            <p className="text-white/80 mb-6 text-lg">
              Want to review the dynamic graph flows, prompt-chaining files, or multi-agent test environments?
              Let&apos;s check the full codebases.
            </p>
            <a
              href="https://github.com/MurtazaAfzali13"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-full shadow-2xl hover-lift text-lg font-semibold transition-all duration-300 inline-block backdrop-blur-lg border border-white/20 hover:from-green-600 hover:to-blue-700 transform hover:scale-105"
            >
              View GitHub Repositories
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
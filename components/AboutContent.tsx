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
      "Autonomous AI Agents (LangChain & LangGraph)",
      "AI Decision-Making Frameworks",
      "Reflection Agents & Self-Critique Loops",
      "Database-Driven Autonomous Workflows",
      "FastAPI Intelligent Services",
      "Vercel AI SDK Streaming UX"
    ],
    backendTools: [
      "Next.js App Router & React",
      "TypeScript & Tailwind CSS",
      "PostgreSQL & Supabase",
      "Git, Docker & Deployment",
      "API Design & Testing",
      "shadcn/ui Component Systems"
    ]
  };

  const experiences: Experience[] = [
    {
      period: "2023 - Present",
      title: "AI & Full-Stack Engineer",
      company: "Freelance & Intelligent Systems",
      description:
        "Building autonomous AI agents and intelligent systems with LangGraph/LangChain—agents that query databases, process full tables, reason over context, and act independently. Includes reflection agents that critique and refine outputs before delivery."
    },
    {
      period: "2022 - 2023",
      title: "Full-Stack Development Foundation",
      company: "Self-Taught Journey to AI",
      description:
        "Mastered modern web stacks (React, Next.js, TypeScript), then extended into FastAPI backends and agent orchestration—the base for database-driven autonomous workflows on production platforms."
    }
  ];

  const interests: Interest[] = [
    {
      icon: "🤖",
      title: "Autonomous Agents",
      description:
        "Designing agents that analyze situations, make decisions, and execute next steps without constant human prompting"
    },
    {
      icon: "🪞",
      title: "Reflection Agents",
      description:
        "Building self-critique loops where agents review their own drafts and improve quality before users see results"
    },
    {
      icon: "🗄️",
      title: "Database Intelligence",
      description:
        "Connecting agents to live data—querying tables, aggregating records, and grounding decisions in real business data"
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
              Autonomous AI Agents & Full-Stack Engineer
            </span>
          </div>

          <p className="text-xl text-white/85 max-w-2xl mx-auto slide-in-right text-center backdrop-blur-lg bg-black/40 p-6 rounded-2xl border border-white/20 shadow-2xl">
            I build intelligent systems where AI agents decide, reflect, and act—grounded
            in real databases and delivered through polished web experiences.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4">
        <section className="mb-16 slide-in-left">
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6">My AI Journey</h2>
            <div className="text-white/90 leading-relaxed space-y-4 text-lg">
              <p>
                I am Murtaza Afzali, an AI & Full-Stack Engineer. My journey began with
                modern web development using <strong>JavaScript, TypeScript, React, and Next.js</strong>,
                and evolved into building <strong>autonomous AI agents</strong> and intelligent systems
                that bridge human intent and machine execution.
              </p>
              <p>
                I specialize in <strong>AI decision-making frameworks</strong> with LangGraph and LangChain,
                backed by high-performance <strong>FastAPI</strong> services. Rather than passive text
                generation, I design agents that <strong>think and act</strong>: <em>Reflection Agents</em> that
                critique and refine their own outputs, and workflow nodes that <strong>query databases</strong>—reading
                entire tables, filtering records, and using live data before choosing the next action.
              </p>
              <p>
                <strong>Example:</strong> A hospital operations agent loads patient and appointment rows from
                Supabase, compares capacity against schedules, drafts a staffing recommendation, then a reflection
                node reviews the draft for accuracy before the UI streams the final answer via the{" "}
                <strong>Vercel AI SDK</strong>. The result is a <strong>database-driven autonomous workflow</strong>,
                not a chatbot guessing from memory.
              </p>
              <p>
                Paired with elegant interfaces (<strong>shadcn/ui</strong>, Tailwind), these systems become
                intelligent partners for real business decisions—not novelty demos.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16 slide-in-right">
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">AI & Technical Expertise</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-yellow-300 mb-4">Intelligent Systems & Agents</h3>
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
                <h3 className="text-xl font-semibold text-yellow-300 mb-4">Development & Infrastructure</h3>
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
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Professional Journey</h2>
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
            <h2 className="text-3xl font-bold text-white mb-4">Build Autonomous Intelligent Systems</h2>
            <p className="text-white/80 mb-6 text-lg">
              Interested in agents that decide, reflect, and work with your database?
              Let&apos;s design your next intelligent workflow.
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

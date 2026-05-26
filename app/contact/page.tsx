// app/contact/page.tsx
"use client";

import SpaceBackground from "@/components/SpaceBackground";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";

interface FAQ {
  question: string;
  answer: string;
}

export default function ContactPage() {
  const faqs: FAQ[] = [
    {
      question: "How long does an autonomous agent project take?",
      answer:
        "Timelines depend on complexity. A focused agent with a few tools and a reflection loop often takes 2–4 weeks; full database-driven autonomous workflows with multiple LangGraph nodes can take 4–8 weeks. I provide a sprint plan after scoping your data and decisions."
    },
    {
      question: "Can agents query my database and use real table data?",
      answer:
        "Yes. I build database-driven autonomous workflows where agents run structured queries against PostgreSQL/Supabase (or your API), process rows from entire tables, aggregate results, and only then decide the next action—grounding outputs in live business data."
    },
    {
      question: "What is a Reflection Agent?",
      answer:
        "A reflection agent reviews its own draft output, scores quality, and revises before the user sees the final answer. This improves accuracy for reports, recommendations, and multi-step tasks without manual re-prompting."
    },
    {
      question: "What's included in your development services?",
      answer:
        "LangChain/LangGraph agent design, FastAPI services, database integration, decision-making and reflection nodes, Next.js UI with Vercel AI SDK streaming, testing, deployment, and documentation. Vector retrieval can be added when document search is required."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden pt-20">
      <SpaceBackground />

      <div className="relative z-10 w-full">
        <section className="fade-in mb-16 px-4">
          <div className="mb-8 flex flex-col items-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white text-center drop-shadow-2xl">
              Start Your <span className="text-yellow-300 glow-text">Agent Project</span>
            </h1>

            <div className="text-2xl md:text-3xl text-white/95 mb-4 slide-in-left text-center">
              <span className="pulse-slow font-semibold drop-shadow-lg">
                Autonomous AI Agents & Intelligent Systems
              </span>
            </div>

            <p className="text-xl text-white/85 max-w-2xl mx-auto slide-in-right text-center backdrop-blur-lg bg-black/40 p-6 rounded-2xl border border-white/20 shadow-2xl">
              Ready for agents that decide, reflect, and work with your database? Let&apos;s map your
              AI decision-making framework and ship a production-ready intelligent system.
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <ContactForm />
            <div className="slide-in-right">
              <ContactInfo />
            </div>
          </div>

          <section className="fade-in mb-16">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Intelligent Systems FAQs</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {faqs.map((faq, index) => (
                  <div key={index} className="group hover:bg-white/5 p-6 rounded-xl transition-all duration-300">
                    <h3 className="text-xl font-semibold text-yellow-300 mb-3 group-hover:text-yellow-200 transition-colors duration-300">
                      {faq.question}
                    </h3>
                    <p className="text-white/80 group-hover:text-white/90 transition-colors duration-300">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="text-center fade-in">
            <h3 className="text-2xl font-bold text-white mb-4 backdrop-blur-lg bg-black/40 p-4 rounded-2xl inline-block border border-white/20 shadow-2xl">
              Explore Intelligent Systems
            </h3>
            <p className="text-white/80 mb-6 backdrop-blur-lg bg-black/40 p-3 rounded-xl inline-block border border-white/20">
              See autonomous agents, reflection workflows, and full-stack case studies.
            </p>
            <br />
            <a
              href="/projects"
              className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-full shadow-2xl hover-lift text-lg font-semibold transition-all duration-300 inline-block backdrop-blur-lg border border-white/20 hover:from-green-600 hover:to-blue-700 transform hover:scale-105"
            >
              View Projects
            </a>
          </section>
        </div>
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

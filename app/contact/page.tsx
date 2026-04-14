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
      question: "How long does it take to build a RAG system?",
      answer: "RAG system development timelines vary based on complexity. Basic semantic search implementation takes 2-3 weeks, while full RAG pipelines with custom agents can take 1-2 months. I'll provide a detailed timeline after discussing your requirements."
    },
    {
      question: "Do you work with international AI projects?",
      answer: "Absolutely! I work with clients worldwide on RAG architectures, LLM applications, and intelligent Q&A systems. I'm comfortable with different time zones and various communication preferences."
    },
    {
      question: "What's included in your AI development services?",
      answer: "I provide end-to-end RAG architecture design, FastAPI backend development, Pinecone vector database integration, LangChain/LangGraph workflow implementation, Vercel AI SDK frontend integration, testing, deployment, and documentation."
    },
    {
      question: "How do you handle RAG system optimizations?",
      answer: "I include reasonable revisions for prompt engineering, chunking strategies, retrieval tuning, and response quality improvements. I believe in iterative development based on user feedback to optimize the RAG pipeline."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">
      {/* استفاده از کامپوننت SpaceBackground */}
      <SpaceBackground />

      {/* محتوای اصلی */}
      <div className="relative z-10 w-full">
        {/* Hero Section - RAG Consultation */}
        <section className="fade-in mb-16 px-4">
          <div className="mb-8 flex flex-col items-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white text-center drop-shadow-2xl">
              Start Your <span className="text-yellow-300 glow-text">RAG Project</span>
            </h1>

            <div className="text-2xl md:text-3xl text-white/95 mb-4 slide-in-left text-center">
              <span className="pulse-slow font-semibold drop-shadow-lg">
                Build Intelligent LLM Applications
              </span>
            </div>

            <p className="text-xl text-white/85 max-w-2xl mx-auto slide-in-right text-center backdrop-blur-lg bg-black/40 p-6 rounded-2xl border border-white/20 shadow-2xl">
              Ready to implement semantic search and context-aware Q&A systems? Let's discuss how RAG architecture can transform your data into intelligent conversations!
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Contact Form */}
            <ContactForm />
            
            {/* Contact Information */}
            <div className="slide-in-right">
              <ContactInfo />
            </div>
          </div>

          {/* FAQ Section - RAG Focused */}
          <section className="fade-in mb-16">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">RAG System FAQs</h2>
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

          {/* Call to Action - AI Projects */}
          <section className="text-center fade-in">
            <h3 className="text-2xl font-bold text-white mb-4 backdrop-blur-lg bg-black/40 p-4 rounded-2xl inline-block border border-white/20 shadow-2xl">
              Ready to Build Your RAG System?
            </h3>
            <p className="text-white/80 mb-6 backdrop-blur-lg bg-black/40 p-3 rounded-xl inline-block border border-white/20">
              Let's create intelligent Q&A experiences with semantic search!
            </p>
            <br />
            <a
              href="/projects"
              className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-full shadow-2xl hover-lift text-lg font-semibold transition-all duration-300 inline-block backdrop-blur-lg border border-white/20 hover:from-green-600 hover:to-blue-700 transform hover:scale-105"
            >
              View AI Projects
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
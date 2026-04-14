"use client";

interface LinkItem {
  href: string;
  label: string;
}

interface SocialItem {
  name: string;
  icon: string;
  url: string;
}

export default function Footer() {
  return (
    <footer className="bg-white/15 backdrop-blur-lg border-t border-white/20 mt-20 relative z-20">
      <div className="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section - RAG & AI Engineer */}
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
              Murtaza <span className="text-yellow-300">Afzali</span>
            </h3>
            <p className="text-white/80 leading-relaxed text-lg">
              AI Engineer specializing in RAG Architecture, LLM-powered applications, 
              and intelligent systems using LangChain, LangGraph, FastAPI, Pinecone vector database, 
              and Vercel AI SDK for semantic search and context-aware Q&A.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-xl font-semibold text-white mb-6 drop-shadow-lg">Quick Links</h4>
            <ul className="space-y-3">
              {([
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/projects", label: "AI Projects" },
                { href: "/contact", label: "Contact" }
              ] as LinkItem[]).map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    className="text-white/80 hover:text-yellow-300 transition-all duration-300 text-lg group"
                  >
                    <span className="group-hover:ml-2 transition-all duration-300">→</span> {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-left">
            <h4 className="text-xl font-semibold text-white mb-6 drop-shadow-lg">Connect With Me</h4>
            <div className="flex justify-center md:justify-start space-x-6">
              {([
                { name: "GitHub", icon: "🐙", url: "https://github.com/MurtazaAfzali13/" },
                { name: "LinkedIn", icon: "💼", url: "#" },
                { name: "Twitter", icon: "🐦", url: "#" },
                { name: "Email", icon: "📧", url: "mailto:murtazaafzali13@gmail.com" }
              ] as SocialItem[]).map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="text-3xl hover:text-yellow-300 transition-all duration-300 transform hover:scale-110 backdrop-blur-sm p-2 rounded-lg hover:bg-white/10"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="mt-6 text-center md:text-left">
              <p className="text-white/70 mb-2">📍 Herat, Afghanistan</p>
              <a 
                href="tel:+93783000247" 
                className="text-yellow-300 hover:text-yellow-200 transition-colors text-lg"
              >
                +93 783 000 247
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/80 text-lg mb-4 md:mb-0">
              © {new Date().getFullYear()} <span className="text-yellow-300 font-semibold">Murtaza Afzali</span>. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-white/60 text-lg">
              <span>Built with</span>
              <span className="text-red-500 animate-pulse">🧠</span>
              <span>using</span>
              <span className="text-yellow-300 font-semibold">RAG Architecture</span>
              <span>&</span>
              <span className="text-cyan-400 font-semibold">LLM Stack</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
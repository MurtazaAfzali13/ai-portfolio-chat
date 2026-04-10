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
  frontend: string[];
  tools: string[];
}

export default function AboutContent() {
  const skills: Skills = {
    frontend: [
      "React & Next.js",
      "JavaScript & TypeScript",
      "HTML5 & CSS3",
      "Tailwind CSS & Styled Components",
      "Responsive Design",
      "State Management (Redux, Zustand)"
    ],
    tools: [
      "Git & GitHub",
      "VS Code & DevTools",
      "Figma & Adobe XD",
      "Node.js & npm",
      "Webpack & Vite",
      "Testing (Jest, React Testing Library)"
    ]
  };

  const experiences: Experience[] = [
    {
      period: "2023 - Present",
      title: "Frontend Developer",
      company: "Freelance & Personal Projects",
      description: "Working on various web applications, focusing on React and Next.js development. Building responsive, modern interfaces and optimizing user experiences."
    },
    {
      period: "2022 - 2023",
      title: "Web Development Learning",
      company: "Self-Taught Journey",
      description: "Intensive learning of modern web development technologies, building projects, and contributing to open-source communities."
    }
  ];

  const interests: Interest[] = [
    {
      icon: "🎨",
      title: "Design",
      description: "Passionate about UI/UX design and creating visually appealing interfaces"
    },
    {
      icon: "📚",
      title: "Learning",
      description: "Always exploring new technologies and staying current with industry trends"
    },
    {
      icon: "🌱",
      title: "Growth",
      description: "Committed to continuous improvement and helping others grow"
    }
  ];

  return (
    <div className="relative z-10 w-full">
      {/* Hero Section */}
      <section className="fade-in mb-16 px-4">
        <div className="mb-8 flex flex-col items-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white text-center drop-shadow-2xl">
            About <span className="text-yellow-300 glow-text">Me</span>
          </h1>

          <div className="text-2xl md:text-3xl text-white/95 mb-4 slide-in-left text-center">
            <span className="pulse-slow font-semibold drop-shadow-lg">
              Passionate Developer Crafting Digital Experiences
            </span>
          </div>

          <p className="text-xl text-white/85 max-w-2xl mx-auto slide-in-right text-center backdrop-blur-lg bg-black/40 p-6 rounded-2xl border border-white/20 shadow-2xl">
            Passionate developer crafting digital experiences that make a difference
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4">
        {/* Story Section */}
        <section className="mb-16 slide-in-left">
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6">My Story</h2>
            <div className="text-white/90 leading-relaxed space-y-4 text-lg">
              <p>
                Hello! I am Murtaza Afzali, a passionate front-end developer with over 2 years of experience
                in creating beautiful, responsive, and user-friendly web applications. My journey in web
                development began with a curiosity about how websites work and has evolved into a deep
                passion for crafting digital experiences.
              </p>
              <p>
                I specialize in modern JavaScript frameworks, particularly React and Next.js, and I am
                always excited to learn new technologies and best practices. My goal is to create
                applications that not only look great but also provide exceptional user experiences.
              </p>
              <p>
                When I am not coding, you can find me exploring new design trends, contributing to open-source
                projects, or sharing knowledge with the developer community. I believe in continuous learning
                and staying up-to-date with the latest industry trends.
              </p>
            </div>
          </div>
        </section>

        {/* Skills & Expertise */}
        <section className="mb-16 slide-in-right">
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Skills & Expertise</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-yellow-300 mb-4">Frontend Development</h3>
                <div className="space-y-3">
                  {skills.frontend.map((skill, index) => (
                    <div key={skill} className="flex items-center text-white/90 group hover:bg-white/5 p-3 rounded-lg transition-all duration-300">
                      <span className="w-2 h-2 bg-yellow-300 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-300 mb-4">Tools & Technologies</h3>
                <div className="space-y-3">
                  {skills.tools.map((tool, index) => (
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

        {/* Experience Timeline */}
        <section className="mb-16 fade-in">
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Experience Timeline</h2>
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

        {/* Personal Interests */}
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

        {/* Call to Action */}
        <section className="text-center fade-in">
          <div className="bg-gradient-to-r from-blue-500/30 to-purple-600/30 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-4">Let us Work Together</h2>
            <p className="text-white/80 mb-6 text-lg">
              I am always interested in new opportunities and exciting projects.
              Let us discuss how we can bring your ideas to life!
            </p>
            <a
              href="/contact"
              className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-full shadow-2xl hover-lift text-lg font-semibold transition-all duration-300 inline-block backdrop-blur-lg border border-white/20 hover:from-green-600 hover:to-blue-700 transform hover:scale-105"
            >
              Get In Touch
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
"use client";

import { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Technology {
  name: string;
  icon: string;
  color: string;
  level: number;
}

const technologies: Technology[] = [
  { name: "React", icon: "⚛️", color: "#61DAFB", level: 90 },
  { name: "Next.js", icon: "▲", color: "#000000", level: 85 },
  { name: "JavaScript", icon: "🟨", color: "#F7DF1E", level: 95 },
  { name: "TypeScript", icon: "🔷", color: "#3178C6", level: 80 },
  { name: "Tailwind CSS", icon: "🎨", color: "#06B6D4", level: 95 },
  { name: "Git", icon: "📦", color: "#F05032", level: 75 },
  { name: "Figma", icon: "🎯", color: "#F24E1E", level: 70 },
  { name: "HTML5", icon: "🌐", color: "#E34F26", level: 98 },
  { name: "CSS3", icon: "🎭", color: "#1572B6", level: 90 },
  { name: "Redux", icon: "🟣", color: "#764ABC", level: 70 },
  { name: "Vite", icon: "⚡", color: "#646CFF", level: 85 },
  { name: "VS Code", icon: "💻", color: "#007ACC", level: 100 },
  { name: "AWS", icon: "☁️", color: "#FF9900", level: 60 },
];

export default function Technologies(){
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let position = 0;
    const speed = 1.2;

    const step = () => {
      position -= speed;
      track.style.transform = `translateX(${position}px)`;
      if (Math.abs(position) >= track.scrollWidth / 2) position = 0;
      requestAnimationFrame(step);
    };

    step();
  }, []);

  return (
    <TooltipProvider delayDuration={100}>
      <section className="w-full max-w-6xl mx-auto px-4">
        <div
          ref={trackRef}
          className="flex gap-10 items-center px-6 mt-16"
          style={{ whiteSpace: "nowrap", willChange: "transform" }}
        >
          {technologies.map((tech, idx) => (
            <DownloadTooltip key={idx} tech={tech} />
          ))}
        </div>
      </section>
    </TooltipProvider>
  );
}

interface DownloadTooltipProps {
  tech: Technology;
}

function DownloadTooltip({ tech }: DownloadTooltipProps) {
  const [progress, setProgress] = useState<number>(0);

  const startAnimation = (): void => {
    setProgress(0);

    let p = 0;
    const speed = 1.7; // سرعت دانلود

    const interval = setInterval(() => {
      p += 2;
      if (p >= tech.level) {
        p = tech.level;
        clearInterval(interval);
      }
      setProgress(p);
    }, 20);
  };

  return (
    <Tooltip onOpenChange={(open) => open && startAnimation()}>
      <TooltipTrigger asChild>
        <div
          className="flex-shrink-0 flex flex-col items-center justify-center 
          w-32 h-32 md:w-40 md:h-40
          bg-white/10 backdrop-blur-xl  
          rounded-3xl border border-white/20 shadow-xl 
          p-4 cursor-pointer transition-all duration-500
          hover:scale-110 hover:border-white/50 hover:shadow-[0_0_20px_white]"
        >
          <div
            className="text-5xl mb-3 transition-all duration-500"
            style={{
              filter: `drop-shadow(0 5px 15px ${tech.color}50)`,
            }}
          >
            {tech.icon}
          </div>
          <p className="text-white font-bold text-lg">{tech.name}</p>
        </div>
      </TooltipTrigger>

      <TooltipContent
        side="top"
        className="bg-black/80 text-white border border-white/20 rounded-xl p-4 shadow-xl backdrop-blur-xl w-44"
      >
        <p className="text-sm font-semibold mb-2">
          Skill Level: {progress}%
        </p>

        {/* Progress Download Animation */}
        <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-400 rounded-full transition-all"
            style={{
              width: `${progress}%`,
              boxShadow: "0 0 10px #22c55e",
            }}
          ></div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
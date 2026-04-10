// app/about/page.jsx
"use client";

import SpaceBackground from "@/components/SpaceBackground";
import AboutContent from "@/components/AboutContent";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">
      {/* استفاده از کامپوننت SpaceBackground */}
      <SpaceBackground />
      
      {/* استفاده از کامپوننت AboutContent */}
      <AboutContent />
    </div>
  );
}
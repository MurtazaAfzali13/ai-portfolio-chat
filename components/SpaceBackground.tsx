"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  opacity: number;
  pulseSpeed: number;
}

interface Planet {
  angle: number;
  radius: number;
  color: string;
  speed: number;
  distance: number;
  rings: boolean;
  pulseSpeed: number;
}

interface ResponsiveConfig {
  starCount: number;
  moonRadius: number;
  orbitScale: number;
  planetScale: number;
}

interface PlanetType {
  radius: number;
  color: string;
  speed: number;
  distance: number;
  rings: boolean;
}

export default function SpaceBackground(){
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const moonImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let stars: Star[] = [];
    let planets: Planet[] = [];
    let moonImg = new Image();
    
    // تنظیمات مقیاس‌پذیر بر اساس اندازه صفحه
    const getResponsiveConfig = (): ResponsiveConfig => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;

      return {
        starCount: isMobile ? 100 : isTablet ? 150 : 250,
        moonRadius: isMobile ? 40 : isTablet ? 60 : 80,
        orbitScale: isMobile ? 0.4 : isTablet ? 0.7 : 1, // ضریب فاصله مدارها
        planetScale: isMobile ? 0.6 : isTablet ? 0.8 : 1, // ضریب اندازه سیاره‌ها
      };
    };

    moonImg.src = "/images/moonlight.png";
    moonImageRef.current = moonImg;

    const createStars = (count: number): void => {
      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.6 + 0.4,
          pulseSpeed: Math.random() * 0.02 + 0.01,
        });
      }
    };

    const createPlanets = (config: ResponsiveConfig): void => {
      planets = [];
      const planetTypes: PlanetType[] = [
        { radius: 12, color: "#ff6b6b", speed: 0.5, distance: 120, rings: true },
        { radius: 14, color: "#4ecdc4", speed: 0.4, distance: 180, rings: true },
        { radius: 10, color: "#ffe66d", speed: 0.6, distance: 250, rings: true },
        { radius: 12, color: "#ff9ff3", speed: 0.3, distance: 320, rings: false },
      ];

      planetTypes.forEach((type) => {
        planets.push({
          angle: Math.random() * Math.PI * 2,
          ...type,
          radius: type.radius * config.planetScale,
          distance: type.distance * config.orbitScale,
          pulseSpeed: Math.random() * 0.02 + 0.01,
        });
      });
    };

    const resizeCanvas = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const config = getResponsiveConfig();
      createStars(config.starCount);
      createPlanets(config);
    };

    const drawMoon = (config: ResponsiveConfig): void => {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const moonRadius = config.moonRadius;

      // هاله نوری (متناسب با اندازه ماه)
      const globalLight = ctx!.createRadialGradient(cx, cy, 0, cx, cy, moonRadius * 6);
      globalLight.addColorStop(0, "rgba(200,200,255,0.2)");
      globalLight.addColorStop(1, "rgba(50,50,120,0)");
      ctx!.fillStyle = globalLight;
      ctx!.fillRect(0, 0, canvas.width, canvas.height);

      // بدنه ماه
      const moonGradient = ctx!.createRadialGradient(
        cx - (moonRadius/4), 
        cy - (moonRadius/4), 
        0, 
        cx, 
        cy, 
        moonRadius
      );
      moonGradient.addColorStop(0, "#ffffff");
      moonGradient.addColorStop(0.6, "#ccccff");
      moonGradient.addColorStop(1, "#7d51b7");
      
      ctx!.fillStyle = moonGradient;
      ctx!.beginPath();
      ctx!.arc(cx, cy, moonRadius, 0, Math.PI * 2);
      ctx!.fill();

      if (moonImg.complete && moonImg.naturalHeight !== 0) {
        ctx!.save();
        ctx!.beginPath();
        ctx!.arc(cx, cy, moonRadius - 2, 0, Math.PI * 2);
        ctx!.clip();
        ctx!.globalAlpha = 0.2;
        ctx!.drawImage(
          moonImg, 
          cx - moonRadius, 
          cy - moonRadius, 
          moonRadius * 2, 
          moonRadius * 2
        );
        ctx!.restore();
      }
    };

    const animate = (): void => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const config = getResponsiveConfig();

      // Background Gradient
      const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bg.addColorStop(0, "#040416");
      bg.addColorStop(1, "#2d1b69");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawMoon(config);

      // Stars
      stars.forEach(star => {
        star.x = (star.x + star.speedX + canvas.width) % canvas.width;
        star.y = (star.y + star.speedY + canvas.height) % canvas.height;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
        ctx.fill();
      });

      // Planets
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      planets.forEach(planet => {
        planet.angle += planet.speed * 0.005;
        const x = cx + Math.cos(planet.angle) * planet.distance;
        const y = cy + Math.sin(planet.angle) * planet.distance;

        // Orbit Line
        ctx.strokeStyle = "rgba(255,255,255,0.08)";
        ctx.beginPath();
        ctx.arc(cx, cy, planet.distance, 0, Math.PI * 2);
        ctx.stroke();

        // Planet Body
        ctx.fillStyle = planet.color;
        ctx.beginPath();
        ctx.arc(x, y, planet.radius, 0, Math.PI * 2);
        ctx.fill();
        
        if (planet.rings) {
           ctx.strokeStyle = "rgba(255,255,255,0.3)";
           ctx.beginPath();
           ctx.ellipse(x, y, planet.radius * 2, planet.radius * 0.6, planet.angle, 0, Math.PI * 2);
           ctx.stroke();
        }
      });

      requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
}
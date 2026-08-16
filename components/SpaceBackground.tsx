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
  labelFontSize: number;
}

interface PlanetType {
  radius: number;
  color: string;
  speed: number;
  distance: number;
  rings: boolean;
}

// موقعیت تکنالوژی‌ها به صورت نسبی (درصد از عرض/ارتفاع صفحه)
// این نسبت‌ها ثابت هستند و در هر ریسایز فقط دوباره محاسبه می‌شوند، تغییر نمی‌کنند
interface TechDefinition {
  name: string;
  xRatio: number;
  yRatio: number;
}

const TECH_STACK: TechDefinition[] = [
  { name: "React", xRatio: 0.13, yRatio: 0.16 },
  { name: "Next.js", xRatio: 0.87, yRatio: 0.14 },
  { name: "LangGraph", xRatio: 0.1, yRatio: 0.84 },
  { name: "LangChain", xRatio: 0.9, yRatio: 0.82 },
  { name: "FastAPI", xRatio: 0.5, yRatio: 0.94 },
];

interface TechLabel {
  name: string;
  x: number;
  y: number;
  baseOpacity: number;
  phase: number;
}

// بافت سطح مهتاب: موقعیت دریاها (ماریا) و دهانه‌ها به‌صورت نسبی نسبت به شعاع مهتاب
// این آرایه ثابت است تا سطح مهتاب در هر فریم یکسان بماند و چشمک نزند
interface MoonSurfaceSpot {
  xR: number;
  yR: number;
  rR: number;
  tone: "mare" | "crater";
}

const MOON_SURFACE: MoonSurfaceSpot[] = [
  { xR: -0.35, yR: -0.42, rR: 0.24, tone: "mare" },
  { xR: 0.18, yR: -0.5, rR: 0.14, tone: "mare" },
  { xR: 0.38, yR: -0.05, rR: 0.3, tone: "mare" },
  { xR: -0.08, yR: 0.32, rR: 0.16, tone: "mare" },
  { xR: -0.5, yR: 0.12, rR: 0.11, tone: "crater" },
  { xR: 0.06, yR: 0.04, rR: 0.065, tone: "crater" },
  { xR: 0.32, yR: 0.42, rR: 0.08, tone: "crater" },
  { xR: -0.24, yR: -0.08, rR: 0.05, tone: "crater" },
  { xR: 0.52, yR: -0.34, rR: 0.07, tone: "crater" },
  { xR: -0.42, yR: 0.46, rR: 0.06, tone: "crater" },
  { xR: -0.18, yR: 0.55, rR: 0.045, tone: "crater" },
  { xR: 0.14, yR: -0.2, rR: 0.04, tone: "crater" },
];

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let stars: Star[] = [];
    let planets: Planet[] = [];
    let techLabels: TechLabel[] = [];
    let time = 0;

    // تنظیمات مقیاس‌پذیر بر اساس اندازه صفحه
    const getResponsiveConfig = (): ResponsiveConfig => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;

      return {
        starCount: isMobile ? 100 : isTablet ? 150 : 250,
        moonRadius: isMobile ? 40 : isTablet ? 60 : 80,
        orbitScale: isMobile ? 0.4 : isTablet ? 0.7 : 1,
        planetScale: isMobile ? 0.6 : isTablet ? 0.8 : 1,
        labelFontSize: isMobile ? 11 : isTablet ? 12.5 : 14,
      };
    };

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

    // موقعیت برچسب‌های تکنالوژی فقط بر اساس نسبت صفحه محاسبه می‌شود
    // پس مکان آن‌ها هرگز در طول انیمیشن جابجا نمی‌شود، فقط با ریسایز صفحه هماهنگ می‌گردد
    const createTechLabels = (): void => {
      techLabels = TECH_STACK.map((tech, i) => ({
        name: tech.name,
        x: tech.xRatio * canvas.width,
        y: tech.yRatio * canvas.height,
        baseOpacity: 0.22,
        phase: i * 1.3,
      }));
    };

    const resizeCanvas = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const config = getResponsiveConfig();
      createStars(config.starCount);
      createPlanets(config);
      createTechLabels();
    };

    const drawMoon = (config: ResponsiveConfig): void => {
      if (!ctx) return;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const moonRadius = config.moonRadius;
      // منبع نور فرضی از گوشه بالا-چپ مهتاب، برای حس سه‌بعدی و طبیعی
      const lightX = cx - moonRadius * 0.42;
      const lightY = cy - moonRadius * 0.42;

      // === هاله مهتاب: کاملاً روشن در مرکز و با گذار نرم و تدریجی به سمت بیرون محو می‌شود ===
      const haloRadius = moonRadius * 9;
      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, haloRadius);
      halo.addColorStop(0, "rgba(238,238,255,0.32)");
      halo.addColorStop(0.05, "rgba(214,214,255,0.2)");
      halo.addColorStop(0.14, "rgba(178,176,244,0.11)");
      halo.addColorStop(0.3, "rgba(130,118,210,0.055)");
      halo.addColorStop(0.55, "rgba(80,68,160,0.02)");
      halo.addColorStop(1, "rgba(40,32,100,0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // گذار نرم بین لبه مهتاب و هاله، تا مرز مصنوعی دیده نشود
      const rim = ctx.createRadialGradient(cx, cy, moonRadius * 0.82, cx, cy, moonRadius * 1.6);
      rim.addColorStop(0, "rgba(255,255,255,0.16)");
      rim.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = rim;
      ctx.beginPath();
      ctx.arc(cx, cy, moonRadius * 1.6, 0, Math.PI * 2);
      ctx.fill();

      // === بدنه مهتاب با نورپردازی جهت‌دار (سایه‌روشن طبیعی مثل عکس واقعی) ===
      const body = ctx.createRadialGradient(lightX, lightY, moonRadius * 0.05, cx, cy, moonRadius);
      body.addColorStop(0, "#ffffff");
      body.addColorStop(0.22, "#f2f2f9");
      body.addColorStop(0.48, "#d7d7ec");
      body.addColorStop(0.7, "#aaa9cb");
      body.addColorStop(0.87, "#726f9e");
      body.addColorStop(1, "#42406f");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, moonRadius, 0, Math.PI * 2);
      ctx.fill();

      // === بافت سطح: دریاهای مهتابی و دهانه‌ها، محدود دقیقاً به داخل دایره مهتاب ===
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, moonRadius, 0, Math.PI * 2);
      ctx.clip();

      MOON_SURFACE.forEach((spot) => {
        const sx = cx + spot.xR * moonRadius;
        const sy = cy + spot.yR * moonRadius;
        const sr = spot.rR * moonRadius;

        if (spot.tone === "mare") {
          const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, sr);
          g.addColorStop(0, "rgba(88,86,128,0.32)");
          g.addColorStop(1, "rgba(88,86,128,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(sx, sy, sr, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // دهانه کوچک: سایه داخل دهانه + لبه‌ی نازک روشن سمت منبع نور
          const g = ctx.createRadialGradient(
            sx + sr * 0.15,
            sy + sr * 0.15,
            0,
            sx,
            sy,
            sr
          );
          g.addColorStop(0, "rgba(58,56,92,0.4)");
          g.addColorStop(0.7, "rgba(58,56,92,0.16)");
          g.addColorStop(1, "rgba(58,56,92,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(sx, sy, sr, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = "rgba(255,255,255,0.16)";
          ctx.lineWidth = Math.max(0.4, sr * 0.12);
          ctx.beginPath();
          ctx.arc(sx - sr * 0.12, sy - sr * 0.12, sr * 0.88, Math.PI * 0.9, Math.PI * 1.6);
          ctx.stroke();
        }
      });

      // سایه ملایم در سمت مقابل نور برای تقویت حس کروی بودن مهتاب
      const shade = ctx.createRadialGradient(
        cx + moonRadius * 0.32,
        cy + moonRadius * 0.32,
        moonRadius * 0.15,
        cx + moonRadius * 0.32,
        cy + moonRadius * 0.32,
        moonRadius * 1.15
      );
      shade.addColorStop(0, "rgba(28,20,58,0)");
      shade.addColorStop(1, "rgba(28,20,58,0.28)");
      ctx.fillStyle = shade;
      ctx.beginPath();
      ctx.arc(cx, cy, moonRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // رسم بج‌های ظریف تکنالوژی؛ موقعیت ثابت، فقط درخشش آن به‌آرامی تنفس می‌کند
    const drawTechLabels = (config: ResponsiveConfig): void => {
      if (!ctx) return;

      ctx.save();
      ctx.font = `600 ${config.labelFontSize}px 'Segoe UI', 'Inter', system-ui, sans-serif`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      techLabels.forEach((label) => {
        // نوسان بسیار ملایم فقط در opacity، بدون هیچ جابجایی مکانی
        const pulse = Math.sin(time * 0.6 + label.phase) * 0.06;
        const opacity = label.baseOpacity + pulse;

        const paddingX = 14;
        const paddingY = 8;
        const textWidth = ctx.measureText(label.name).width;
        const boxW = textWidth + paddingX * 2;
        const boxH = config.labelFontSize + paddingY * 2;
        const bx = label.x - boxW / 2;
        const by = label.y - boxH / 2;
        const radius = 8;

        // بج شیشه‌ای بسیار کم‌رنگ
        ctx.beginPath();
        ctx.moveTo(bx + radius, by);
        ctx.arcTo(bx + boxW, by, bx + boxW, by + boxH, radius);
        ctx.arcTo(bx + boxW, by + boxH, bx, by + boxH, radius);
        ctx.arcTo(bx, by + boxH, bx, by, radius);
        ctx.arcTo(bx, by, bx + boxW, by, radius);
        ctx.closePath();

        ctx.fillStyle = `rgba(125, 81, 183, ${opacity * 0.18})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(200, 190, 255, ${opacity * 0.6})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // متن با درخشش ظریف
        ctx.shadowColor = "rgba(180, 160, 255, 0.5)";
        ctx.shadowBlur = 6;
        ctx.fillStyle = `rgba(235, 230, 255, ${opacity + 0.35})`;
        ctx.fillText(label.name, label.x, label.y + 0.5);
        ctx.shadowBlur = 0;
      });

      ctx.restore();
    };

    const animate = (): void => {
      if (!ctx) return;
      time += 0.016;
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
      stars.forEach((star) => {
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
      planets.forEach((planet) => {
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

      // برچسب‌های تکنالوژی (موقعیت ثابت)
      drawTechLabels(config);

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

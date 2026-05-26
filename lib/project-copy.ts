/**
 * Portfolio-facing project descriptions (applied when titles match).
 * Keeps Supabase schema unchanged while reframing narrative for agent-focused systems.
 */

const PROJECT_COPY_OVERRIDES: { match: RegExp; desc: string }[] = [
  {
    match: /video|q\s*&\s*a|intelligent video/i,
    desc:
      "Full-stack video platform: Next.js (App Router, TypeScript, Tailwind) plus FastAPI for upload, streaming, and user workflows. An autonomous LangChain/LangGraph agent layer processes content, answers questions, and runs reflection loops before responding—decision-making grounded in processed media context, not generic chat.",
  },
  {
    match: /hospital|multilingual|health/i,
    desc:
      "Hospital management system built with Agile sprints—complex UI/UX and role-based access (Doctors, Patients, Admins) on Supabase/PostgreSQL. Database-driven autonomous workflows let agents query appointment and patient tables, reason over live rows, and recommend actions; reflection agents refine outputs before staff see them.",
  },
];

export function enrichProjectDescription(title: string, desc: string): string {
  for (const { match, desc: override } of PROJECT_COPY_OVERRIDES) {
    if (match.test(title)) return override;
  }
  return desc;
}

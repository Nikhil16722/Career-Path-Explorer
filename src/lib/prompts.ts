// ─── System Prompt ────────────────────────────────────────────────────────
export const CAREER_SYSTEM_PROMPT = `
You are an expert career coach and industry analyst specializing in the Indian job market.
You provide detailed, accurate, and actionable career guidance.
You ALWAYS respond with valid JSON only — no markdown fences, no explanation text.
All salary ranges must be in Indian Rupees (LPA format).
Skill levels are integers from 0 to 100.
`.trim();

// ─── Career Data Prompt ───────────────────────────────────────────────────
export function buildCareerPrompt(role: string): string {
  return `
Generate a complete career guidance report for the role: "${role}"

Return ONLY this exact JSON structure:
{
  "stats": {
    "levels": 5,
    "avgSalary": "₹XX LPA",
    "growth": "XX%",
    "demand": "High"
  },
  "positions": [
    {
      "title": "Junior ${role}",
      "experience": "0–2 years",
      "salary": "₹4–8 LPA",
      "skills": [
        { "name": "Skill Name", "type": "technical", "level": 80 },
        { "name": "Skill Name", "type": "tools", "level": 70 },
        { "name": "Skill Name", "type": "soft", "level": 65 },
        { "name": "Skill Name", "type": "domain", "level": 60 },
        { "name": "Skill Name", "type": "technical", "level": 55 },
        { "name": "Skill Name", "type": "tools", "level": 50 }
      ]
    },
    {
      "title": "${role}",
      "experience": "2–4 years",
      "salary": "₹8–15 LPA",
      "skills": [
        { "name": "Skill Name", "type": "technical", "level": 85 },
        { "name": "Skill Name", "type": "tools", "level": 80 },
        { "name": "Skill Name", "type": "soft", "level": 70 },
        { "name": "Skill Name", "type": "domain", "level": 75 },
        { "name": "Skill Name", "type": "technical", "level": 65 },
        { "name": "Skill Name", "type": "tools", "level": 60 }
      ]
    },
    {
      "title": "Senior ${role}",
      "experience": "4–7 years",
      "salary": "₹15–28 LPA",
      "skills": [
        { "name": "Skill Name", "type": "technical", "level": 90 },
        { "name": "Skill Name", "type": "tools", "level": 85 },
        { "name": "Skill Name", "type": "soft", "level": 80 },
        { "name": "Skill Name", "type": "domain", "level": 80 },
        { "name": "Skill Name", "type": "technical", "level": 75 },
        { "name": "Skill Name", "type": "soft", "level": 70 }
      ]
    },
    {
      "title": "Lead / Manager",
      "experience": "7–12 years",
      "salary": "₹28–50 LPA",
      "skills": [
        { "name": "Skill Name", "type": "soft", "level": 90 },
        { "name": "Skill Name", "type": "domain", "level": 88 },
        { "name": "Skill Name", "type": "technical", "level": 82 },
        { "name": "Skill Name", "type": "soft", "level": 85 },
        { "name": "Skill Name", "type": "tools", "level": 75 },
        { "name": "Skill Name", "type": "domain", "level": 78 }
      ]
    },
    {
      "title": "Director / VP",
      "experience": "12+ years",
      "salary": "₹50–100+ LPA",
      "skills": [
        { "name": "Skill Name", "type": "domain", "level": 95 },
        { "name": "Skill Name", "type": "soft", "level": 92 },
        { "name": "Skill Name", "type": "soft", "level": 90 },
        { "name": "Skill Name", "type": "domain", "level": 88 },
        { "name": "Skill Name", "type": "technical", "level": 80 },
        { "name": "Skill Name", "type": "soft", "level": 85 }
      ]
    }
  ],
  "phases": [
    {
      "name": "Phase 1: Foundations",
      "duration": "Month 1–2",
      "desc": "Core concepts and fundamentals",
      "skills": ["Skill A", "Skill B", "Skill C", "Skill D"]
    },
    {
      "name": "Phase 2: Core Tools",
      "duration": "Month 2–4",
      "desc": "Master the essential tools",
      "skills": ["Tool A", "Tool B", "Tool C", "Tool D"]
    },
    {
      "name": "Phase 3: Real Projects",
      "duration": "Month 4–6",
      "desc": "Build portfolio projects",
      "skills": ["Project type", "Domain skill", "Version control", "Collaboration"]
    },
    {
      "name": "Phase 4: Advanced Skills",
      "duration": "Month 6–9",
      "desc": "Level up with advanced topics",
      "skills": ["Advanced A", "Advanced B", "Cloud", "Automation"]
    },
    {
      "name": "Phase 5: Job Ready",
      "duration": "Month 9–12",
      "desc": "Interview prep and networking",
      "skills": ["Resume", "Portfolio", "LinkedIn", "Mock interviews"]
    }
  ],
  "future": [
    {
      "icon": "🤖",
      "title": "AI & Automation Impact",
      "desc": "Two sentences about how AI is transforming this role and creating new opportunities.",
      "color": "teal"
    },
    {
      "icon": "📈",
      "title": "Market Demand",
      "desc": "Two sentences about job market growth and hiring trends for this role.",
      "color": "blue"
    },
    {
      "icon": "🌏",
      "title": "Remote & Global Scope",
      "desc": "Two sentences about remote work opportunities and global demand for this skill.",
      "color": "purple"
    },
    {
      "icon": "💡",
      "title": "Emerging Specializations",
      "desc": "Two sentences about new niches and specializations emerging in this field.",
      "color": "amber"
    }
  ]
}

Replace ALL "Skill Name", "Skill A", "Tool A" etc. with REAL, SPECIFIC skills for "${role}".
Use real Indian salary ranges (LPA).
skill.type must be exactly one of: "technical", "tools", "soft", "domain".
skill.level must be an integer 0–100.
demand must be exactly: "High", "Medium", or "Low".
Return ONLY the JSON object. No extra text.
`.trim();
}

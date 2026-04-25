import { GoogleGenerativeAI } from "@google/generative-ai";
import type { CareerData } from "@/types/career";
import { CAREER_SYSTEM_PROMPT, buildCareerPrompt } from "./prompts";

// ─── Gemini Client (singleton) ────────────────────────────────────────────
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: CAREER_SYSTEM_PROMPT,
  generationConfig: {
    responseMimeType: "application/json",
    temperature: 0.7,
    maxOutputTokens: 8192,
  },
});

// ─── Main Generator ───────────────────────────────────────────────────────
export async function generateCareerData(role: string): Promise<CareerData> {
  const prompt = buildCareerPrompt(role);

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // Strip markdown fences if model wraps in ```json
  const clean = text.replace(/^```json\s*/m, "").replace(/\s*```$/m, "").trim();

  const parsed = JSON.parse(clean) as Omit<CareerData, "role" | "generatedAt">;

  return {
    ...parsed,
    role,
    generatedAt: new Date().toISOString(),
  };
}

// ─── Slug helpers ─────────────────────────────────────────────────────────
export function roleToSlug(role: string): string {
  return role.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export function slugToRole(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

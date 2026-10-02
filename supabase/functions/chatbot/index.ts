import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
const SITE_URL = "https://www.neu-data.com";
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

// Team member names + ids are not localized in the JSON (proper nouns),
// so they're listed here once. Everything else (bio, role, degrees,
// specialties) is pulled live from en.json / vi.json below.
const TEAM = [
  { id: "bernard-isekah-osangir", name: "Bernard Isekah Osang'ir" },
  { id: "james-wambua", name: "Dr. James Wambua" },
  { id: "my-luong-vuong", name: "My-Luong Vuong" },
];

let cache: { en: any; vi: any; fetchedAt: number } | null = null;

async function getSiteContent() {
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return cache;
  }
  const [enRes, viRes] = await Promise.all([
    fetch(`${SITE_URL}/locales/en.json`),
    fetch(`${SITE_URL}/locales/vi.json`),
  ]);
  const en = await enRes.json();
  const vi = await viRes.json();
  cache = { en, vi, fetchedAt: Date.now() };
  return cache;
}

function buildKnowledgeBase(data: any, lang: "en" | "vi"): string {
  const lines: string[] = [];

  // Company overview
  if (data?.home?.hero) {
    lines.push(`COMPANY: ${data.home.hero.title1 ?? ""} ${data.home.hero.titleHighlight ?? ""}`);
    if (data.home.hero.subtitle) lines.push(data.home.hero.subtitle);
  }
  if (data?.footer?.tagline) lines.push(`TAGLINE: ${data.footer.tagline}`);

  // Services
  if (data?.servicesPage?.items) {
    lines.push("\nSERVICES:");
    for (const key of Object.keys(data.servicesPage.items)) {
      const item = data.servicesPage.items[key];
      if (item?.title && item?.desc) {
        lines.push(`- ${item.title}: ${item.desc}`);
      }
    }
  }

  // Team
  if (data?.experts?.members) {
    lines.push("\nTEAM:");
    for (const member of TEAM) {
      const m = data.experts.members[member.id];
      if (m) {
        const specialties = Array.isArray(m.specialties) ? m.specialties.join(", ") : "";
        lines.push(`- ${member.name}, ${m.role ?? ""} (${m.degrees ?? ""}). Specialties: ${specialties}. ${m.bio ?? ""}`);
      }
    }
  }

  // Training
  if (data?.training) {
    lines.push(`\nTRAINING: ${data.training.subtitle ?? ""}`);
    if (data.training.courses) {
      for (const key of Object.keys(data.training.courses)) {
        const c = data.training.courses[key];
        if (c?.title) lines.push(`- ${c.title}${c.desc ? ": " + c.desc : ""}`);
      }
    }
  }

  // Contact
  if (data?.contact) {
    lines.push("\nCONTACT: info@neu-data.com, contact@neu-data.com. Response within 24 hours on business days.");
  }

  return lines.join("\n");
}

function detectLanguage(message: string): "en" | "vi" {
  // Vietnamese uses diacritics not present in English; a quick heuristic.
  const vietnameseChars = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
  return vietnameseChars.test(message) ? "vi" : "en";
}

Deno.serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    const lang = detectLanguage(message);

    const { en, vi } = await getSiteContent();
    const knowledge = buildKnowledgeBase(lang === "vi" ? vi : en, lang);

    const systemPrompt = lang === "vi"
      ? `Bạn là trợ lý website của Neudata. Trả lời bằng tiếng Việt, ngắn gọn và hữu ích, chỉ dựa trên thông tin dưới đây về Neudata. Nếu không biết câu trả lời, hãy đề nghị người dùng truy cập trang Liên hệ hoặc email info@neu-data.com.\n\n${knowledge}`
      : `You are Neudata's website assistant. Answer in English, helpfully and concisely, based only on the information below about Neudata. If you don't know the answer, suggest the person visit the Contact page or email info@neu-data.com.\n\n${knowledge}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: `${systemPrompt}\n\nUser question: ${message}` }] },
          ],
        }),
      }
    );

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

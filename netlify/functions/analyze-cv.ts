import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

// Lazy init — Netlify Dev may not load .env at module scope
function getClient() {
  return new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });
}

// --- Validation ---

const CriterionSchema = z.object({
  name: z.string(),
  category: z.string(),
  level: z.enum(['exige', 'souhaite', 'bonus']),
  weight: z.number().min(1).max(10),
});

const RequestSchema = z.object({
  cvText: z.string().optional(),
  cvBase64: z.string().optional(),
  cvFileName: z.string().optional(),
  candidateProfile: z.string().optional(),
  offreTitle: z.string(),
  offreDescription: z.string().optional(),
  criteria: z.array(CriterionSchema).min(1),
}).refine(d => d.cvText || d.cvBase64, { message: 'CV requis (texte ou PDF)' });

// --- Rate limiting ---

const requestCounts = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 3600000; // 1h
const RATE_LIMIT_MAX = 20; // 20 analyses per hour per IP

function getRateLimitKey(event: any): string {
  return (
    event.headers['client-ip'] ||
    event.headers['x-forwarded-for']?.split(',')[0] ||
    'unknown'
  );
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const existing = requestCounts.get(key);
  if (!existing || now - existing.timestamp > RATE_LIMIT_WINDOW) {
    requestCounts.set(key, { count: 1, timestamp: now });
    return true;
  }
  if (existing.count >= RATE_LIMIT_MAX) return false;
  existing.count++;
  return true;
}

// --- Handler ---

export const handler = async (event: any) => {
  // CORS headers for local dev
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'ANTHROPIC_API_KEY non configurée' }),
    };
  }

  const ipKey = getRateLimitKey(event);
  if (!checkRateLimit(ipKey)) {
    return {
      statusCode: 429,
      headers,
      body: JSON.stringify({ error: 'Trop de requêtes. Réessayez plus tard.' }),
    };
  }

  try {
    const parsed = JSON.parse(event.body);
    const data = RequestSchema.parse(parsed);

    const criteriaPrompt = data.criteria
      .map(
        (c, i) =>
          `${i + 1}. "${c.name}" (catégorie: ${c.category}, niveau: ${c.level === 'exige' ? 'EXIGÉ' : c.level === 'souhaite' ? 'Souhaité' : 'Bonus'}, poids: ${c.weight}/10)`
      )
      .join('\n');

    const systemPrompt = `Tu es un expert RH et recruteur senior spécialisé dans l'analyse de CV.
Tu dois analyser un CV par rapport à une offre d'emploi et ses critères d'évaluation.

RÈGLES IMPORTANTES :
- Sois objectif et factuel. Base-toi UNIQUEMENT sur ce qui est écrit dans le CV.
- Si une compétence n'est pas mentionnée dans le CV, le score doit être bas.
- Les critères "EXIGÉ" ont plus d'impact sur le score global.
- Réponds UNIQUEMENT en JSON valide, sans markdown, sans backticks, sans texte avant/après.`;

    let textInstruction = `Analyse ce CV pour le poste "${data.offreTitle}"${data.offreDescription ? ` (${data.offreDescription})` : ''}.

CRITÈRES D'ÉVALUATION :
${criteriaPrompt}
`;

    if (data.candidateProfile) {
      textInstruction += `
PROFIL CANDIDAT (auto-évaluation) :
${data.candidateProfile}
`;
    }

    textInstruction += `
Réponds en JSON avec EXACTEMENT cette structure :
{
  "score": <number 0-100, score global pondéré>,
  "recommendation": "<accept|review|reject>",
  "criteriaScores": {
    "<nom du critère exact>": <number 0-100>,
    ...pour chaque critère listé ci-dessus
  },
  "strengths": ["<point fort 1>", "<point fort 2>", "<point fort 3 max>"],
  "weaknesses": ["<axe d'amélioration 1>", "<axe d'amélioration 2 max>"],
  "summary": "<synthèse en 2-3 phrases du profil par rapport au poste>",
  "skillsDetected": ["<compétence détectée 1>", "<compétence 2>", ...]
}

Règles pour le score :
- score >= 75 → recommendation = "accept"
- 55 <= score < 75 → recommendation = "review"
- score < 55 → recommendation = "reject"
- Le score global doit refléter la pondération (weight) de chaque critère
- Les critères EXIGÉ manquants doivent fortement pénaliser le score`;

    // Build message content: PDF document or text
    const userContent: Anthropic.MessageCreateParams['messages'][0]['content'] = [];

    if (data.cvBase64) {
      // Send PDF directly to Claude — it reads PDFs natively
      userContent.push({
        type: 'document',
        source: {
          type: 'base64',
          media_type: 'application/pdf',
          data: data.cvBase64,
        },
      } as any);
      userContent.push({ type: 'text', text: textInstruction });
    } else {
      // Text-based CV
      userContent.push({
        type: 'text',
        text: `CV DU CANDIDAT :\n---\n${data.cvText!.slice(0, 15000)}\n---\n\n${textInstruction}`,
      });
    }

    const message = await getClient().messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{ role: 'user', content: userContent }],
      system: systemPrompt,
    });

    // Extract text content
    const textBlock = message.content.find((b) => b.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      throw new Error('No text response from Claude');
    }

    // Parse JSON response (handle potential markdown wrapping)
    let jsonStr = textBlock.text.trim();
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    }

    const analysis = JSON.parse(jsonStr);

    // Validate the shape minimally
    if (
      typeof analysis.score !== 'number' ||
      !analysis.recommendation ||
      !analysis.criteriaScores
    ) {
      throw new Error('Invalid analysis structure from Claude');
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(analysis),
    };
  } catch (error: any) {
    console.error('Analyze CV error:', error);

    if (error instanceof z.ZodError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Données invalides', details: error.errors }),
      };
    }

    if (error instanceof SyntaxError) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Erreur de parsing de la réponse IA" }),
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Erreur serveur lors de l\'analyse',
      }),
    };
  }
};

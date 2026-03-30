// Types & localStorage CRUD for the public demo tool

export interface DemoCriterion {
  id: string;
  name: string;
  category: 'skill' | 'experience' | 'education' | 'language' | 'soft_skill' | 'certification' | 'other';
  level: 'exige' | 'souhaite' | 'bonus';
  weight: number; // 1-10
}

export interface DemoOffre {
  id: string;
  title: string;
  description: string;
  location: string;
  contractType: string;
  salaryMin: string;
  salaryMax: string;
  criteria: DemoCriterion[];
  createdAt: string;
}

export interface DemoAnalysis {
  score: number;
  recommendation: 'accept' | 'review' | 'reject';
  criteriaScores: Record<string, number>;
  strengths: string[];
  weaknesses: string[];
  summary: string;
  skillsDetected: string[];
}

export interface DemoApplication {
  id: string;
  offreId: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  cvFileName: string;
  analysis: DemoAnalysis | null;
  createdAt: string;
}

const OFFRES_KEY = 'skillcruit_demo_offres';
const APPLICATIONS_KEY = 'skillcruit_demo_applications';

function generateId(): string {
  return crypto.randomUUID();
}

// --- Offres ---

export function getOffres(): DemoOffre[] {
  try {
    return JSON.parse(localStorage.getItem(OFFRES_KEY) || '[]');
  } catch {
    return [];
  }
}

export function getOffre(id: string): DemoOffre | null {
  return getOffres().find(o => o.id === id) || null;
}

export function saveOffre(offre: Omit<DemoOffre, 'id' | 'createdAt'>): DemoOffre {
  const full: DemoOffre = {
    ...offre,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  const offres = getOffres();
  offres.push(full);
  localStorage.setItem(OFFRES_KEY, JSON.stringify(offres));
  return full;
}

// --- Applications ---

export function getApplications(offreId: string): DemoApplication[] {
  try {
    const all: DemoApplication[] = JSON.parse(localStorage.getItem(APPLICATIONS_KEY) || '[]');
    return all.filter(a => a.offreId === offreId);
  } catch {
    return [];
  }
}

export function saveApplication(app: Omit<DemoApplication, 'id' | 'createdAt' | 'analysis'>): DemoApplication {
  const full: DemoApplication = {
    ...app,
    id: generateId(),
    createdAt: new Date().toISOString(),
    analysis: null,
  };
  const all: DemoApplication[] = JSON.parse(localStorage.getItem(APPLICATIONS_KEY) || '[]');
  all.push(full);
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(all));
  return full;
}

export function updateApplicationAnalysis(appId: string, analysis: DemoAnalysis): void {
  const all: DemoApplication[] = JSON.parse(localStorage.getItem(APPLICATIONS_KEY) || '[]');
  const idx = all.findIndex(a => a.id === appId);
  if (idx !== -1) {
    all[idx].analysis = analysis;
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(all));
  }
}

// --- Real AI Analysis via Claude API ---

async function fileToBase64(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function analyzeCV(offre: DemoOffre, cvFile: File, candidateProfile?: string): Promise<DemoAnalysis> {
  const isPdf = cvFile.name.toLowerCase().endsWith('.pdf');

  // For PDFs: send as base64 so Claude reads the document directly
  // For other files: send as text
  const payload: Record<string, unknown> = {
    offreTitle: offre.title,
    offreDescription: offre.description,
    candidateProfile: candidateProfile || undefined,
    criteria: offre.criteria.map(c => ({
      name: c.name,
      category: c.category,
      level: c.level,
      weight: c.weight,
    })),
  };

  if (isPdf) {
    payload.cvBase64 = await fileToBase64(cvFile);
    payload.cvFileName = cvFile.name;
  } else {
    payload.cvText = await cvFile.text();
  }

  const response = await fetch('/.netlify/functions/analyze-cv', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Erreur serveur' }));
    throw new Error(err.error || `Erreur ${response.status}`);
  }

  return response.json();
}

// --- Mock AI Analysis Generator (fallback) ---

const STRENGTH_TEMPLATES = [
  (name: string) => `Excellente maîtrise de ${name}, en adéquation avec les exigences du poste.`,
  (name: string) => `Compétence ${name} confirmée et bien documentée dans le parcours.`,
  (name: string) => `Profil solide en ${name} avec des réalisations concrètes.`,
  (name: string) => `Expérience significative en ${name} qui renforce la candidature.`,
  (name: string) => `${name} est un point fort majeur de ce profil.`,
];

const WEAKNESS_TEMPLATES = [
  (name: string) => `${name} n'apparaît pas clairement dans le parcours du candidat.`,
  (name: string) => `Le niveau en ${name} semble insuffisant par rapport aux exigences.`,
  (name: string) => `Lacune identifiée sur ${name}, compétence pourtant requise.`,
  (name: string) => `${name} nécessiterait un approfondissement ou une formation complémentaire.`,
];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

export function generateMockAnalysis(offre: DemoOffre, candidateName: string, cvFileName: string): DemoAnalysis {
  // Use candidate name + cv filename as seed for reproducible-looking results
  const seed = (candidateName + cvFileName).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const rand = seededRandom(seed);

  const criteriaScores: Record<string, number> = {};
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const skillsDetected: string[] = [];

  let totalWeighted = 0;
  let totalWeight = 0;

  for (const criterion of offre.criteria) {
    // Base score depends on level: exige criteria score higher (harder to match), souhaite medium, bonus easier
    const levelBonus = criterion.level === 'exige' ? -5 : criterion.level === 'souhaite' ? 0 : 5;
    const base = Math.floor(rand() * 45 + 45 + levelBonus); // 40-95 range roughly
    const score = Math.max(20, Math.min(98, base));
    criteriaScores[criterion.name] = score;

    totalWeighted += score * criterion.weight;
    totalWeight += criterion.weight;

    if (score >= 70) {
      strengths.push(STRENGTH_TEMPLATES[Math.floor(rand() * STRENGTH_TEMPLATES.length)](criterion.name));
      if (criterion.category === 'skill' || criterion.category === 'certification') {
        skillsDetected.push(criterion.name);
      }
    } else {
      weaknesses.push(WEAKNESS_TEMPLATES[Math.floor(rand() * WEAKNESS_TEMPLATES.length)](criterion.name));
    }

    // Randomly detect extra related skills
    if (criterion.category === 'skill' && rand() > 0.4) {
      skillsDetected.push(criterion.name);
    }
  }

  const overallScore = totalWeight > 0 ? Math.round(totalWeighted / totalWeight) : 50;
  const recommendation: DemoAnalysis['recommendation'] =
    overallScore >= 75 ? 'accept' : overallScore >= 55 ? 'review' : 'reject';

  // Keep max 3 strengths and 2 weaknesses for readability
  const finalStrengths = strengths.slice(0, 3);
  const finalWeaknesses = weaknesses.slice(0, 2);

  const recText = recommendation === 'accept'
    ? 'Le profil est fortement recommandé pour un entretien.'
    : recommendation === 'review'
      ? 'Le profil mérite un examen approfondi avant décision.'
      : 'Le profil ne correspond pas suffisamment aux exigences actuelles.';

  const summary = `${candidateName} obtient un score global de ${overallScore}% pour le poste "${offre.title}". ` +
    (finalStrengths.length > 0 ? `Points forts identifiés : ${finalStrengths.map(s => s.split(',')[0]).join(' ')} ` : '') +
    (finalWeaknesses.length > 0 ? `Points d'attention : ${finalWeaknesses[0]} ` : '') +
    recText;

  return {
    score: overallScore,
    recommendation,
    criteriaScores,
    strengths: finalStrengths,
    weaknesses: finalWeaknesses,
    summary,
    skillsDetected: [...new Set(skillsDetected)],
  };
}

export function createDemoCriterion(partial: Partial<DemoCriterion> & { name: string }): DemoCriterion {
  return {
    id: generateId(),
    category: 'skill',
    level: 'souhaite',
    weight: 5,
    ...partial,
  };
}

export const CATEGORY_LABELS: Record<DemoCriterion['category'], string> = {
  skill: 'Compétence technique',
  experience: 'Expérience',
  education: 'Formation',
  language: 'Langue',
  soft_skill: 'Soft skill',
  certification: 'Certification',
  other: 'Autre',
};

export const LEVEL_LABELS: Record<DemoCriterion['level'], string> = {
  exige: 'Exigé',
  souhaite: 'Souhaité',
  bonus: 'Bonus',
};

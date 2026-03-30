import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, MapPin, Briefcase, Upload, CheckCircle,
  FileText, Share2, BarChart3, Loader2, ChevronDown, GraduationCap,
  Code2, Globe, Users, Car, Plus, X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import {
  getOffre, saveApplication, updateApplicationAnalysis, analyzeCV,
  type DemoOffre, type DemoAnalysis,
} from '@/lib/demo-store';

// --- Constants ---

const EDUCATION_LEVELS = [
  { value: 0, label: 'Bac' },
  { value: 1, label: 'Bac+2' },
  { value: 2, label: 'Bac+3' },
  { value: 3, label: 'Bac+5 / Master' },
  { value: 4, label: 'Doctorat' },
];

const SKILL_LEVEL_LABELS = ['Débutant', 'Basique', 'Intermédiaire', 'Avancé', 'Expert'];
const LANG_LEVEL_LABELS = ['Débutant', 'Élémentaire', 'Intermédiaire', 'Courant', 'Natif / Bilingue'];

// Autocomplete suggestions — generic, NOT related to the offer criteria
const SKILL_SUGGESTIONS = [
  'HTML/CSS', 'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Next.js', 'Node.js',
  'Python', 'Java', 'C#', 'PHP', 'Go', 'Rust', 'SQL', 'PostgreSQL', 'MongoDB', 'Docker',
  'AWS', 'Git', 'Tailwind CSS', 'Redux', 'Express.js', 'Django', 'FastAPI', 'Spring Boot',
  '.NET', 'Laravel', 'Flutter', 'React Native', 'Kubernetes', 'CI/CD', 'Linux', 'Terraform',
  'GraphQL', 'Redis', 'Figma', 'Photoshop', 'Excel avancé', 'Power BI', 'Tableau', 'SAP',
  'Salesforce', 'HubSpot', 'Jira', 'Gestion de projet', 'Management', 'Relation client',
  'Négociation', 'Recrutement', 'Comptabilité', 'Marketing digital', 'SEO', 'Rédaction',
];

const LANG_SUGGESTIONS = [
  'Français', 'Anglais', 'Espagnol', 'Allemand', 'Arabe', 'Chinois',
  'Portugais', 'Italien', 'Japonais', 'Russe', 'Néerlandais', 'Turc',
];

const SOFT_SKILL_SUGGESTIONS = [
  'Travail en équipe', 'Communication', 'Leadership', 'Autonomie',
  'Résolution de problèmes', 'Créativité', 'Adaptabilité', 'Esprit critique',
  'Empathie', 'Rigueur', 'Organisation', 'Gestion du stress',
];

// --- Components ---

function SkillTag({ name, level, labels, onRemove, onChangeLevel }: {
  name: string; level: number; labels: string[];
  onRemove: () => void; onChangeLevel: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-3 bg-slate-50 rounded-lg px-3 py-2">
      <span className="text-sm text-foreground w-32 shrink-0 truncate font-medium">{name}</span>
      <Slider
        value={[level]}
        min={0} max={4} step={1}
        onValueChange={([v]) => onChangeLevel(v)}
        className="flex-1"
      />
      <span className={`text-[10px] font-medium w-24 text-right shrink-0 ${level >= 3 ? 'text-green-700' : level >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
        {labels[level]}
      </span>
      <button type="button" onClick={onRemove} className="text-muted-foreground hover:text-red-500 transition-colors">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function SkillAdder({ placeholder, suggestions, onAdd, addedSkills }: {
  placeholder: string; suggestions: string[];
  onAdd: (name: string) => void; addedSkills: Set<string>;
}) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.length > 0
    ? suggestions.filter(s => !addedSkills.has(s) && s.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : [];

  const handleAdd = (name: string) => {
    if (name.trim() && !addedSkills.has(name.trim())) {
      onAdd(name.trim());
      setQuery('');
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered.length > 0) {
        handleAdd(filtered[0]);
      } else if (query.trim()) {
        handleAdd(query.trim());
      }
    }
  };

  return (
    <div className="relative">
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          value={query}
          onChange={e => { setQuery(e.target.value); setShowSuggestions(true); }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button
          type="button" variant="outline" size="sm"
          disabled={!query.trim() || addedSkills.has(query.trim())}
          onClick={() => handleAdd(query.trim())}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      {showSuggestions && filtered.length > 0 && (
        <div className="absolute z-10 top-full left-0 right-12 mt-1 bg-white border border-border rounded-lg shadow-lg overflow-hidden">
          {filtered.map(s => (
            <button
              key={s} type="button"
              className="w-full text-left px-3 py-2 text-sm hover:bg-primary/5 transition-colors"
              onMouseDown={() => handleAdd(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// --- Page ---

const DemoOffre = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [offre, setOffre] = useState<DemoOffre | null>(null);
  const [loading, setLoading] = useState(true);

  // Description accordion
  const [descOpen, setDescOpen] = useState(false);

  // Form state
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Rich form state
  const [education, setEducation] = useState(2);
  const [mobility, setMobility] = useState(2);
  const [techSkills, setTechSkills] = useState<Record<string, number>>({});
  const [languages, setLanguages] = useState<Record<string, number>>({});
  const [softSkills, setSoftSkills] = useState<Record<string, number>>({});

  useEffect(() => {
    const found = getOffre(id || '');
    setOffre(found);
    setLoading(false);
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCvFile(file);
  };

  // Build candidate profile text from the form for analysis
  const buildProfileText = (): string => {
    const lines: string[] = [];
    lines.push(`Formation : ${EDUCATION_LEVELS[education].label}`);

    const mobilityLabels = ['Non mobile', 'Peu mobile', 'Mobilité modérée', 'Mobile', 'Très mobile (international)'];
    lines.push(`Mobilité : ${mobilityLabels[mobility]}`);

    const allSkills = [
      ...Object.entries(techSkills).map(([name, level]) => `- ${name} : ${SKILL_LEVEL_LABELS[level]}`),
      ...Object.entries(languages).map(([name, level]) => `- ${name} : ${LANG_LEVEL_LABELS[level]}`),
      ...Object.entries(softSkills).map(([name, level]) => `- ${name} : ${SKILL_LEVEL_LABELS[level]}`),
    ];

    if (allSkills.length > 0) {
      lines.push('\nCompétences auto-évaluées :');
      lines.push(...allSkills);
    }

    return lines.join('\n');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!offre || !candidateName.trim() || !candidateEmail.trim() || !cvFile) return;

    setSubmitting(true);
    setError(null);

    const app = saveApplication({
      offreId: offre.id,
      candidateName: candidateName.trim(),
      candidateEmail: candidateEmail.trim(),
      candidatePhone: candidatePhone.trim(),
      cvFileName: cvFile.name,
    });

    try {
      // Show success immediately, analyze in background
      const profileText = buildProfileText();
      setSubmitting(false);
      setSubmitted(true);

      // Silent background analysis — candidate doesn't see results
      const result = await analyzeCV(offre, cvFile, profileText);
      updateApplicationAnalysis(app.id, result);
    } catch (err: any) {
      // Analysis failed silently — candidature is still saved
      console.error('Background analysis error:', err);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!offre) {
    return (
      <div className="min-h-screen bg-transparent text-foreground">
        <Navbar />
        <div className="pt-28 pb-16 text-center">
          <p className="text-muted-foreground mb-4">Offre introuvable.</p>
          <Link to="/demo"><Button variant="outline">Retour à la démo</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const salaryText = offre.salaryMin && offre.salaryMax
    ? `${offre.salaryMin} – ${offre.salaryMax}€`
    : offre.salaryMin || offre.salaryMax
      ? `${offre.salaryMin || offre.salaryMax}€`
      : null;

  const hasLongDesc = (offre.description?.length || 0) > 200;

  const techSkillSet = new Set(Object.keys(techSkills));
  const langSet = new Set(Object.keys(languages));
  const softSkillSet = new Set(Object.keys(softSkills));

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <SEOHead
        title={`${offre.title} - Postuler | Skillcruit`}
        description={`Postulez à l'offre ${offre.title}.`}
      />
      <Navbar />

      <section className="pt-28 pb-16">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Back + Actions */}
            <div className="flex items-center justify-between">
              <button onClick={() => navigate('/demo')} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" />Retour
              </button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopyLink}>
                  <Share2 className="w-4 h-4 mr-1.5" />{copied ? 'Copié !' : 'Partager le lien'}
                </Button>
                <Link to={`/demo/dashboard/${offre.id}`}>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="w-4 h-4 mr-1.5" />Voir les résultats
                  </Button>
                </Link>
              </div>
            </div>

            {/* Offer details with collapsible description */}
            <div className="bg-white rounded-xl border border-border p-6">
              <div className="mb-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs text-amber-700 mb-3">
                  Offre de démonstration
                </div>
                <h1 className="text-2xl font-bold text-foreground">{offre.title}</h1>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2 flex-wrap">
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{offre.location}</span>
                <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" />{offre.contractType}</span>
                {salaryText && <span className="font-medium text-foreground">{salaryText}</span>}
              </div>

              {/* Collapsible description */}
              {offre.description && (
                <div className="mt-4">
                  <div className={`relative ${!descOpen && hasLongDesc ? 'max-h-20 overflow-hidden' : ''}`}>
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{offre.description}</p>
                    {!descOpen && hasLongDesc && (
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
                    )}
                  </div>
                  {hasLongDesc && (
                    <button
                      onClick={() => setDescOpen(!descOpen)}
                      className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-1 hover:underline"
                    >
                      {descOpen ? 'Voir moins' : 'Voir plus'}
                      <ChevronDown className={`w-3 h-3 transition-transform ${descOpen ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Application form or success */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                  <span className="text-red-600 text-lg mt-0.5">!</span>
                  <div>
                    <p className="font-medium text-red-800">Erreur</p>
                    <p className="text-sm text-red-700 mt-0.5">{error}</p>
                    <Button variant="outline" size="sm" className="mt-2" onClick={() => setError(null)}>Réessayer</Button>
                  </div>
                </motion.div>
              )}

              {!submitted && !error && (
                <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Section 1: Personal info */}
                    <div className="bg-white rounded-xl border border-border p-6 space-y-4">
                      <h2 className="font-semibold text-foreground flex items-center gap-2">
                        <Upload className="w-4 h-4 text-primary" />
                        Postuler à cette offre
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Complétez votre profil et envoyez votre candidature.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label>Nom complet *</Label>
                          <Input className="mt-1.5" placeholder="Jean Dupont" value={candidateName} onChange={e => setCandidateName(e.target.value)} required />
                        </div>
                        <div>
                          <Label>Email *</Label>
                          <Input className="mt-1.5" type="email" placeholder="jean@email.com" value={candidateEmail} onChange={e => setCandidateEmail(e.target.value)} required />
                        </div>
                      </div>
                      <div>
                        <Label>Téléphone</Label>
                        <Input className="mt-1.5" placeholder="+33 6 12 34 56 78" value={candidatePhone} onChange={e => setCandidatePhone(e.target.value)} />
                      </div>
                    </div>

                    {/* Section 2: Education & Mobility */}
                    <div className="bg-white rounded-xl border border-border p-6 space-y-5">
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-primary" />
                        Formation & Mobilité
                      </h3>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <Label className="text-sm">Niveau de formation</Label>
                          <span className="text-xs font-semibold text-primary">{EDUCATION_LEVELS[education].label}</span>
                        </div>
                        <Slider value={[education]} min={0} max={4} step={1} onValueChange={([v]) => setEducation(v)} />
                        <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                          <span>Bac</span><span>Bac+2</span><span>Bac+3</span><span>Master</span><span>Doctorat</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <Label className="text-sm flex items-center gap-1.5">
                            <Car className="w-3.5 h-3.5" />Mobilité
                          </Label>
                          <span className="text-xs font-semibold text-primary">
                            {['Non mobile', 'Peu mobile', 'Mobilité modérée', 'Mobile', 'Très mobile'][mobility]}
                          </span>
                        </div>
                        <Slider value={[mobility]} min={0} max={4} step={1} onValueChange={([v]) => setMobility(v)} />
                        <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                          <span>Fixe</span><span>International</span>
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Skills — free-form input */}
                    <div className="bg-white rounded-xl border border-border p-6 space-y-5">
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-primary" />
                        Compétences
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Ajoutez vos compétences et évaluez votre niveau.
                      </p>

                      {/* Technical skills */}
                      <div className="space-y-3">
                        <Label className="flex items-center gap-1.5 text-sm">
                          <Code2 className="w-3.5 h-3.5 text-primary" />Compétences techniques
                        </Label>
                        <SkillAdder
                          placeholder="Ex: React, Python, Excel..."
                          suggestions={SKILL_SUGGESTIONS}
                          addedSkills={techSkillSet}
                          onAdd={name => setTechSkills(prev => ({ ...prev, [name]: 2 }))}
                        />
                        {Object.keys(techSkills).length > 0 && (
                          <div className="space-y-1.5">
                            {Object.entries(techSkills).map(([name, level]) => (
                              <SkillTag
                                key={name} name={name} level={level}
                                labels={SKILL_LEVEL_LABELS}
                                onRemove={() => setTechSkills(prev => { const next = { ...prev }; delete next[name]; return next; })}
                                onChangeLevel={v => setTechSkills(prev => ({ ...prev, [name]: v }))}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Languages */}
                      <div className="space-y-3 border-t border-border pt-5">
                        <Label className="flex items-center gap-1.5 text-sm">
                          <Globe className="w-3.5 h-3.5 text-primary" />Langues
                        </Label>
                        <SkillAdder
                          placeholder="Ex: Anglais, Français, Espagnol..."
                          suggestions={LANG_SUGGESTIONS}
                          addedSkills={langSet}
                          onAdd={name => setLanguages(prev => ({ ...prev, [name]: 2 }))}
                        />
                        {Object.keys(languages).length > 0 && (
                          <div className="space-y-1.5">
                            {Object.entries(languages).map(([name, level]) => (
                              <SkillTag
                                key={name} name={name} level={level}
                                labels={LANG_LEVEL_LABELS}
                                onRemove={() => setLanguages(prev => { const next = { ...prev }; delete next[name]; return next; })}
                                onChangeLevel={v => setLanguages(prev => ({ ...prev, [name]: v }))}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Soft skills */}
                      <div className="space-y-3 border-t border-border pt-5">
                        <Label className="flex items-center gap-1.5 text-sm">
                          <Users className="w-3.5 h-3.5 text-primary" />Soft Skills
                        </Label>
                        <SkillAdder
                          placeholder="Ex: Leadership, Communication..."
                          suggestions={SOFT_SKILL_SUGGESTIONS}
                          addedSkills={softSkillSet}
                          onAdd={name => setSoftSkills(prev => ({ ...prev, [name]: 2 }))}
                        />
                        {Object.keys(softSkills).length > 0 && (
                          <div className="space-y-1.5">
                            {Object.entries(softSkills).map(([name, level]) => (
                              <SkillTag
                                key={name} name={name} level={level}
                                labels={SKILL_LEVEL_LABELS}
                                onRemove={() => setSoftSkills(prev => { const next = { ...prev }; delete next[name]; return next; })}
                                onChangeLevel={v => setSoftSkills(prev => ({ ...prev, [name]: v }))}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Section 4: CV Upload */}
                    <div className="bg-white rounded-xl border border-border p-6 space-y-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        CV *
                      </h3>
                      <label className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-6 cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-colors">
                        <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
                        {cvFile ? (
                          <div className="flex items-center gap-2 text-sm text-primary">
                            <FileText className="w-5 h-5" />
                            <span className="font-medium">{cvFile.name}</span>
                            <span className="text-muted-foreground">({(cvFile.size / 1024).toFixed(0)} Ko)</span>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">Cliquez pour uploader votre CV</p>
                            <p className="text-xs text-muted-foreground mt-1">PDF, DOC ou DOCX (max 5 Mo)</p>
                          </>
                        )}
                      </label>

                      <div className="flex justify-end pt-2">
                        <Button type="submit" disabled={submitting || !candidateName.trim() || !candidateEmail.trim() || !cvFile} className="min-w-[200px]">
                          {submitting ? (
                            <span className="flex items-center gap-2">
                              <Loader2 className="w-4 h-4 animate-spin" />Envoi en cours...
                            </span>
                          ) : (
                            'Envoyer ma candidature'
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                </motion.div>
              )}

              {submitted && (
                <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="bg-white rounded-xl border border-border p-10 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Candidature envoyée !</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      Merci {candidateName.split(' ')[0]}, votre candidature pour le poste <strong>{offre.title}</strong> a bien été prise en compte. Vous serez contacté(e) prochainement.
                    </p>
                  </div>

                  <Button variant="outline" className="w-full" onClick={() => {
                    setSubmitted(false);
                    setCandidateName('');
                    setCandidateEmail('');
                    setCandidatePhone('');
                    setCvFile(null);
                    setTechSkills({});
                    setLanguages({});
                    setSoftSkills({});
                    setEducation(2);
                    setMobility(2);
                  }}>
                    Soumettre une autre candidature
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DemoOffre;

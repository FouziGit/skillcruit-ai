import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Sparkles, Plus, X, CheckCircle, GripVertical, Copy, ExternalLink, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import {
  saveOffre, createDemoCriterion, CATEGORY_LABELS, LEVEL_LABELS,
  type DemoCriterion,
} from '@/lib/demo-store';

const CATEGORY_OPTIONS = Object.entries(CATEGORY_LABELS) as [DemoCriterion['category'], string][];
const LEVEL_OPTIONS = Object.entries(LEVEL_LABELS) as [DemoCriterion['level'], string][];

const LEVEL_COLORS: Record<string, string> = {
  exige: 'bg-red-50 text-red-700 border-red-200',
  souhaite: 'bg-blue-50 text-blue-700 border-blue-200',
  bonus: 'bg-slate-50 text-slate-600 border-slate-200',
};

const SUGGESTED_CRITERIA: Record<string, string[]> = {
  tech: ['React', 'TypeScript', 'Node.js', 'Python', 'SQL', 'Docker', 'AWS', 'Git', 'Java', 'C#'],
  langues: ['Anglais courant', 'Français natif', 'Espagnol', 'Allemand'],
  soft: ['Travail en équipe', 'Communication', 'Leadership', 'Autonomie', 'Résolution de problèmes'],
  formation: ['Bac+5 Informatique', 'Bac+3 minimum', 'Formation ingénieur', 'Master spécialisé'],
};

const DemoCreerOffre = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [published, setPublished] = useState(false);
  const [offreId, setOffreId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [form, setForm] = useState({
    title: '', description: '', location: '', contractType: 'CDI',
    salaryMin: '', salaryMax: '',
  });

  const [criteria, setCriteria] = useState<DemoCriterion[]>([]);
  const [newCriterionName, setNewCriterionName] = useState('');
  const [suggestionTab, setSuggestionTab] = useState('tech');

  const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

  // Criteria management
  const addCriterion = (name: string) => {
    if (!name.trim() || criteria.some(c => c.name.toLowerCase() === name.toLowerCase())) return;
    setCriteria(prev => [...prev, createDemoCriterion({ name: name.trim() })]);
  };

  const removeCriterion = (id: string) => setCriteria(prev => prev.filter(c => c.id !== id));

  const updateCriterion = (id: string, updates: Partial<DemoCriterion>) => {
    setCriteria(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const handlePublish = () => {
    setSubmitting(true);
    const offre = saveOffre({
      title: form.title,
      description: form.description,
      location: form.location,
      contractType: form.contractType,
      salaryMin: form.salaryMin,
      salaryMax: form.salaryMax,
      criteria,
    });
    setOffreId(offre.id);
    setTimeout(() => {
      setSubmitting(false);
      setPublished(true);
    }, 800);
  };

  const offreLink = offreId ? `${window.location.origin}/demo/offre/${offreId}` : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(offreLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const step1Valid = form.title.trim() && form.location.trim();
  const step2Valid = criteria.length >= 1;

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <SEOHead
        title="Créer une offre de test - Skillcruit Demo"
        description="Créez une offre d'emploi de test et configurez vos critères IA pour analyser automatiquement les CV des candidats."
        canonical="https://skillcruit.app/demo/creer-offre"
      />
      <Navbar />

      <section className="pt-28 pb-16">
        <div className="container px-6">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <button onClick={() => navigate('/demo')} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" />Retour à la démo
              </button>
              <h1 className="text-2xl font-bold text-foreground">Créer une offre de test</h1>
              <p className="text-muted-foreground">Configurez votre offre et vos critères — l'IA scorera automatiquement les CV reçus.</p>
            </div>

            {/* Step indicator */}
            {!published && (
              <div className="flex items-center gap-3">
                {[1, 2, 3].map(s => (
                  <div key={s} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      step >= s ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {step > s ? '✓' : s}
                    </div>
                    <span className={`text-sm hidden sm:block ${step >= s ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                      {s === 1 ? 'Informations' : s === 2 ? 'Critères & coefficients' : 'Publication'}
                    </span>
                    {s < 3 && <div className={`w-8 h-0.5 ${step > s ? 'bg-primary' : 'bg-slate-200'}`} />}
                  </div>
                ))}
              </div>
            )}

            {/* Step 1: Job Info */}
            {!published && step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-xl border border-border p-6 space-y-4">
                <h2 className="font-semibold text-foreground">Informations du poste</h2>
                <div>
                  <Label>Intitulé du poste *</Label>
                  <Input className="mt-1.5" placeholder="ex : Développeur Full Stack React" value={form.title} onChange={e => update('title', e.target.value)} />
                </div>
                <div>
                  <Label>Description du poste</Label>
                  <textarea
                    className="w-full mt-1.5 border border-border rounded-lg px-3 py-2 text-sm resize-none h-24 bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Décrivez le contexte, les missions et l'environnement de travail..."
                    value={form.description} onChange={e => update('description', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Localisation *</Label>
                    <Input className="mt-1.5" placeholder="ex : Paris" value={form.location} onChange={e => update('location', e.target.value)} />
                  </div>
                  <div>
                    <Label>Type de contrat</Label>
                    <select value={form.contractType} onChange={e => update('contractType', e.target.value)}
                      className="w-full mt-1.5 border border-border rounded-lg px-3 py-2 text-sm bg-white text-foreground">
                      <option>CDI</option><option>CDD</option><option>Stage</option><option>Alternance</option><option>Freelance</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Salaire minimum</Label>
                    <Input className="mt-1.5" placeholder="ex : 40000" value={form.salaryMin} onChange={e => update('salaryMin', e.target.value)} />
                  </div>
                  <div>
                    <Label>Salaire maximum</Label>
                    <Input className="mt-1.5" placeholder="ex : 55000" value={form.salaryMax} onChange={e => update('salaryMax', e.target.value)} />
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <Button onClick={() => setStep(2)} disabled={!step1Valid}>Suivant</Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Criteria with coefficients */}
            {!published && step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-xl border border-border p-6 space-y-5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <h2 className="font-semibold text-foreground">Critères & coefficients</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Définissez vos critères d'évaluation. Pour chaque critère, choisissez le niveau d'exigence et le poids (coefficient) de 1 à 10.
                </p>

                {/* Quick suggestions */}
                <div>
                  <Label className="text-xs text-muted-foreground">Suggestions rapides</Label>
                  <div className="flex gap-2 mt-2 mb-3 flex-wrap">
                    {Object.keys(SUGGESTED_CRITERIA).map(tab => (
                      <button key={tab} onClick={() => setSuggestionTab(tab)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${suggestionTab === tab ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-muted-foreground hover:bg-slate-200'}`}>
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {SUGGESTED_CRITERIA[suggestionTab].map(name => {
                      const exists = criteria.some(c => c.name.toLowerCase() === name.toLowerCase());
                      return (
                        <button key={name} onClick={() => addCriterion(name)} disabled={exists}
                          className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                            exists ? 'bg-primary text-white border-primary' : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                          }`}>
                          {exists ? '✓ ' : '+ '}{name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Add custom criterion */}
                <div className="flex gap-2">
                  <Input placeholder="Ajouter un critère personnalisé..." value={newCriterionName}
                    onChange={e => setNewCriterionName(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && newCriterionName.trim()) { addCriterion(newCriterionName); setNewCriterionName(''); } }}
                    className="text-sm" />
                  <Button variant="outline" size="sm" onClick={() => { if (newCriterionName.trim()) { addCriterion(newCriterionName); setNewCriterionName(''); } }}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Criteria list with configuration */}
                {criteria.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-foreground">Critères configurés ({criteria.length})</p>
                    {criteria.map(criterion => (
                      <div key={criterion.id} className="border border-border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <GripVertical className="w-4 h-4 text-muted-foreground shrink-0" />
                            <span className="font-medium text-sm text-foreground truncate">{criterion.name}</span>
                          </div>
                          <button onClick={() => removeCriterion(criterion.id)} className="text-muted-foreground hover:text-red-500 transition-colors shrink-0">
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          {/* Category */}
                          <div>
                            <Label className="text-xs">Catégorie</Label>
                            <select value={criterion.category}
                              onChange={e => updateCriterion(criterion.id, { category: e.target.value as DemoCriterion['category'] })}
                              className="w-full mt-1 border border-border rounded-lg px-2 py-1.5 text-xs bg-white text-foreground">
                              {CATEGORY_OPTIONS.map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                              ))}
                            </select>
                          </div>

                          {/* Level */}
                          <div>
                            <Label className="text-xs">Niveau d'exigence</Label>
                            <div className="flex gap-1 mt-1">
                              {LEVEL_OPTIONS.map(([value, label]) => (
                                <button key={value} onClick={() => updateCriterion(criterion.id, { level: value })}
                                  className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                                    criterion.level === value ? LEVEL_COLORS[value] : 'border-border text-muted-foreground hover:border-slate-300'
                                  }`}>
                                  {label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Weight slider */}
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <Label className="text-xs">Coefficient (poids)</Label>
                            <span className="text-xs font-bold text-primary">{criterion.weight}/10</span>
                          </div>
                          <Slider
                            value={[criterion.weight]}
                            min={1} max={10} step={1}
                            onValueChange={([v]) => updateCriterion(criterion.id, { weight: v })}
                            className="w-full"
                          />
                          <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
                            <span>Faible</span><span>Important</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {criteria.length === 0 && (
                  <div className="text-center py-6 text-muted-foreground text-sm">
                    Ajoutez au moins 1 critère pour continuer.
                  </div>
                )}

                <div className="flex justify-between pt-2">
                  <Button variant="outline" onClick={() => setStep(1)}>Retour</Button>
                  <Button onClick={() => setStep(3)} disabled={!step2Valid}>Suivant</Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Review & Publish */}
            {!published && step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <div className="bg-white rounded-xl border border-border p-6">
                  <h2 className="font-semibold text-foreground mb-4">Récapitulatif</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Poste</span>
                      <span className="font-medium text-foreground">{form.title}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Localisation</span>
                      <span className="font-medium text-foreground">{form.location} · {form.contractType}</span>
                    </div>
                    {(form.salaryMin || form.salaryMax) && (
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Salaire</span>
                        <span className="font-medium text-foreground">
                          {form.salaryMin && form.salaryMax ? `${form.salaryMin} – ${form.salaryMax}€` : form.salaryMin || form.salaryMax + '€'}
                        </span>
                      </div>
                    )}
                    <div className="py-2">
                      <span className="text-muted-foreground block mb-2">Critères IA ({criteria.length})</span>
                      <div className="space-y-1.5">
                        {criteria.map(c => (
                          <div key={c.id} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-foreground">{c.name}</span>
                              <span className={`px-1.5 py-0.5 rounded-full border text-[10px] font-medium ${LEVEL_COLORS[c.level]}`}>
                                {LEVEL_LABELS[c.level]}
                              </span>
                            </div>
                            <span className="text-muted-foreground">Poids : {c.weight}/10</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground mb-1">L'IA est prête</p>
                    <p className="text-muted-foreground">
                      Un lien public sera généré. Les candidats pourront y déposer leur CV et recevoir une analyse IA instantanée basée sur vos critères.
                    </p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)}>Retour</Button>
                  <Button onClick={handlePublish} disabled={submitting} className="min-w-[160px]">
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Publication...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />Publier l'offre
                      </span>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Published - Share link */}
            {published && offreId && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5">
                <div className="bg-white rounded-xl border border-border p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-green-50 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Offre publiée avec succès !</h2>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Partagez ce lien avec vos candidats. Ils pourront postuler et leur CV sera automatiquement analysé par l'IA.
                  </p>

                  {/* Link display & copy */}
                  <div className="flex items-center gap-2 bg-slate-50 border border-border rounded-lg p-3 max-w-lg mx-auto">
                    <input
                      type="text"
                      readOnly
                      value={offreLink}
                      className="flex-1 bg-transparent text-sm text-foreground font-mono truncate outline-none"
                    />
                    <Button variant="outline" size="sm" onClick={handleCopyLink} className="shrink-0">
                      <Copy className="w-4 h-4 mr-1.5" />
                      {copied ? 'Copié !' : 'Copier'}
                    </Button>
                  </div>
                </div>

                {/* Action cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link to={`/demo/offre/${offreId}`}
                    className="bg-white rounded-xl border border-border p-5 hover:border-primary/40 hover:shadow-sm transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <ExternalLink className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Voir la page candidat</p>
                        <p className="text-xs text-muted-foreground">Tester le formulaire de candidature</p>
                      </div>
                    </div>
                  </Link>

                  <Link to={`/demo/dashboard/${offreId}`}
                    className="bg-white rounded-xl border border-border p-5 hover:border-primary/40 hover:shadow-sm transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Dashboard RH</p>
                        <p className="text-xs text-muted-foreground">Voir les candidatures et résultats</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DemoCreerOffre;

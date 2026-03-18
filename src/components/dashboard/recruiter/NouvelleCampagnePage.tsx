import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Sparkles, Plus, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SUGGESTED_SKILLS: Record<string, string[]> = {
  tech: ['React', 'TypeScript', 'Node.js', 'Python', 'SQL', 'Docker', 'AWS', 'Git'],
  product: ['Product Management', 'Agile', 'Jira', 'Figma', 'Analytics', 'SQL'],
  data: ['Python', 'SQL', 'Spark', 'Airflow', 'Machine Learning', 'DBT', 'AWS'],
  marketing: ['SEO', 'Google Ads', 'Analytics', 'CRM', 'Content Marketing'],
};

export function NouvelleCampagnePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: '', company: 'Skillcruit Demo', location: '', type: 'CDI',
    salary: '', description: '', minExperience: '3',
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [category, setCategory] = useState('tech');

  const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

  const addSkill = (skill: string) => {
    if (!skills.includes(skill)) setSkills(prev => [...prev, skill]);
  };
  const removeSkill = (skill: string) => setSkills(prev => prev.filter(s => s !== skill));

  const handlePublish = () => {
    setSubmitting(true);
    setTimeout(() => navigate('/dashboard/campagnes'), 1800);
  };

  const step1Valid = form.title && form.location && form.type;
  const step2Valid = skills.length >= 2;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link to="/dashboard/campagnes" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />Retour aux campagnes
        </Link>
        <h1 className="text-2xl font-bold text-foreground">Nouvelle campagne</h1>
        <p className="text-muted-foreground">Configurez le poste — l'IA scorera automatiquement les CV reçus</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-3">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
              step > s ? 'bg-primary text-white' : step === s ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'
            }`}>
              {step > s ? '✓' : s}
            </div>
            <span className={`text-sm hidden sm:block ${step >= s ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              {s === 1 ? 'Informations' : s === 2 ? 'Critères IA' : 'Publication'}
            </span>
            {s < 3 && <div className={`w-8 h-0.5 ${step > s ? 'bg-primary' : 'bg-slate-200'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Infos */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-xl border border-border p-6 space-y-4">
          <h2 className="font-semibold text-foreground">Informations du poste</h2>
          <div>
            <Label>Intitulé du poste *</Label>
            <Input className="mt-1.5" placeholder="ex : Développeur Full Stack React" value={form.title} onChange={e => update('title', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Entreprise</Label>
              <Input className="mt-1.5" value={form.company} onChange={e => update('company', e.target.value)} />
            </div>
            <div>
              <Label>Localisation *</Label>
              <Input className="mt-1.5" placeholder="ex : Paris" value={form.location} onChange={e => update('location', e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Type de contrat *</Label>
              <select value={form.type} onChange={e => update('type', e.target.value)}
                className="w-full mt-1.5 border border-border rounded-lg px-3 py-2 text-sm bg-white text-foreground">
                <option>CDI</option><option>CDD</option><option>Stage</option><option>Alternance</option><option>Freelance</option>
              </select>
            </div>
            <div>
              <Label>Fourchette salariale</Label>
              <Input className="mt-1.5" placeholder="ex : 45–55K€" value={form.salary} onChange={e => update('salary', e.target.value)} />
            </div>
          </div>
          <div>
            <Label>Description du poste</Label>
            <textarea
              className="w-full mt-1.5 border border-border rounded-lg px-3 py-2 text-sm resize-none h-24 bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Décrivez le contexte, les missions et l'environnement de travail..."
              value={form.description} onChange={e => update('description', e.target.value)}
            />
          </div>
          <div className="flex justify-end pt-2">
            <Button onClick={() => setStep(2)} disabled={!step1Valid}>Suivant</Button>
          </div>
        </motion.div>
      )}

      {/* Step 2: Critères IA */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-xl border border-border p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <h2 className="font-semibold text-foreground">Critères pour l'IA</h2>
          </div>
          <p className="text-sm text-muted-foreground">Ces critères seront utilisés par l'IA pour scorer automatiquement chaque CV reçu.</p>

          <div>
            <Label>Expérience minimum requise</Label>
            <div className="flex gap-2 mt-1.5">
              {['1', '2', '3', '5', '7'].map(y => (
                <button key={y} onClick={() => update('minExperience', y)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                    form.minExperience === y ? 'bg-primary text-white border-primary' : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                  }`}>{y} an{parseInt(y) > 1 ? 's' : ''}</button>
              ))}
            </div>
          </div>

          <div>
            <Label>Compétences clés * <span className="text-muted-foreground font-normal">(min. 2)</span></Label>
            {/* Quick category */}
            <div className="flex gap-2 mt-2 mb-3 flex-wrap">
              {Object.keys(SUGGESTED_SKILLS).map(cat => (
                <button key={cat} onClick={() => setCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${category === cat ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-muted-foreground hover:bg-slate-200'}`}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
            {/* Suggestions */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {SUGGESTED_SKILLS[category].map(s => (
                <button key={s} onClick={() => addSkill(s)}
                  disabled={skills.includes(s)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                    skills.includes(s) ? 'bg-primary text-white border-primary' : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                  }`}>
                  {skills.includes(s) ? '✓ ' : '+ '}{s}
                </button>
              ))}
            </div>
            {/* Custom */}
            <div className="flex gap-2">
              <Input placeholder="Compétence personnalisée..." value={newSkill} onChange={e => setNewSkill(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && newSkill.trim()) { addSkill(newSkill.trim()); setNewSkill(''); } }}
                className="text-sm" />
              <Button variant="outline" size="sm" onClick={() => { if (newSkill.trim()) { addSkill(newSkill.trim()); setNewSkill(''); } }}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Selected skills */}
          {skills.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">Compétences sélectionnées ({skills.length})</p>
              <div className="flex flex-wrap gap-1.5">
                {skills.map(s => (
                  <span key={s} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-primary text-white rounded-full">
                    {s}<button onClick={() => removeSkill(s)}><X className="w-3 h-3 ml-0.5" /></button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-2">
            <Button variant="outline" onClick={() => setStep(1)}>Retour</Button>
            <Button onClick={() => setStep(3)} disabled={!step2Valid}>Suivant</Button>
          </div>
        </motion.div>
      )}

      {/* Step 3: Publication */}
      {step === 3 && (
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
                <span className="font-medium text-foreground">{form.location} · {form.type}</span>
              </div>
              {form.salary && (
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Salaire</span>
                  <span className="font-medium text-foreground">{form.salary}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Expérience min.</span>
                <span className="font-medium text-foreground">{form.minExperience} an{parseInt(form.minExperience) > 1 ? 's' : ''}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Compétences IA</span>
                <span className="font-medium text-foreground text-right max-w-[200px]">{skills.join(', ')}</span>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-1">L'IA est prête</p>
              <p className="text-muted-foreground">Dès la première candidature reçue, Skillcruit analysera automatiquement le CV, attribuera un score par critère et générera un résumé en moins de 30 secondes.</p>
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
                  <CheckCircle className="w-4 h-4" />Publier la campagne
                </span>
              )}
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

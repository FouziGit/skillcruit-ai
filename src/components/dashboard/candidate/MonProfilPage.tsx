import { useState } from 'react';
import { Save, Upload, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';

const INIT_SKILLS = ['React', 'TypeScript', 'Node.js', 'SQL', 'Git'];

export function MonProfilPage() {
  const { profile } = useAuth();
  const [saved, setSaved] = useState(false);
  const [skills, setSkills] = useState(INIT_SKILLS);
  const [newSkill, setNewSkill] = useState('');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills(prev => [...prev, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => setSkills(prev => prev.filter(s => s !== skill));

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mon profil</h1>
        <p className="text-muted-foreground">Complétez votre profil pour améliorer votre score de matching</p>
      </div>

      {/* Completion bar */}
      <div className="bg-white rounded-xl border border-border p-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-foreground">Complétude du profil</p>
          <p className="text-sm font-bold text-primary">78%</p>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: '78%' }} />
        </div>
        <p className="text-xs text-muted-foreground mt-2">Ajoutez votre CV et vos expériences pour atteindre 100%</p>
      </div>

      {/* CV Upload */}
      <div className="bg-white rounded-xl border border-border p-5">
        <h2 className="font-semibold text-foreground mb-4">CV</h2>
        <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm font-medium text-foreground">Déposer votre CV ici</p>
          <p className="text-xs text-muted-foreground mt-1">PDF, DOCX — max 5MB</p>
          <Button variant="outline" size="sm" className="mt-4">Choisir un fichier</Button>
        </div>
      </div>

      {/* Personal info */}
      <div className="bg-white rounded-xl border border-border p-5">
        <h2 className="font-semibold text-foreground mb-4">Informations personnelles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Prénom</Label>
            <Input className="mt-1.5" defaultValue={profile?.full_name?.split(' ')[0] || 'Jean'} />
          </div>
          <div>
            <Label>Nom</Label>
            <Input className="mt-1.5" defaultValue={profile?.full_name?.split(' ')[1] || 'Martin'} />
          </div>
          <div>
            <Label>Email</Label>
            <Input className="mt-1.5" defaultValue={profile?.email || 'test@test.com'} type="email" />
          </div>
          <div>
            <Label>Téléphone</Label>
            <Input className="mt-1.5" defaultValue="+33 7 89 12 34 56" />
          </div>
          <div>
            <Label>Ville</Label>
            <Input className="mt-1.5" defaultValue="Paris, France" />
          </div>
          <div>
            <Label>LinkedIn</Label>
            <Input className="mt-1.5" defaultValue="linkedin.com/in/jeanmartin" />
          </div>
          <div className="sm:col-span-2">
            <Label>Titre professionnel</Label>
            <Input className="mt-1.5" defaultValue="Développeur Full Stack · 4 ans d'expérience" />
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white rounded-xl border border-border p-5">
        <h2 className="font-semibold text-foreground mb-4">Compétences</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map(skill => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full font-medium"
            >
              {skill}
              <button onClick={() => removeSkill(skill)} className="hover:text-red-500 transition-colors">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Ajouter une compétence..."
            value={newSkill}
            onChange={e => setNewSkill(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addSkill()}
            className="max-w-xs"
          />
          <Button variant="outline" size="sm" onClick={addSkill}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Experience */}
      <div className="bg-white rounded-xl border border-border p-5">
        <h2 className="font-semibold text-foreground mb-4">Expérience</h2>
        <div className="space-y-4">
          {[
            { role: 'Développeur Full Stack', company: 'AgenceTech Paris', period: '2023 – Aujourd\'hui', desc: 'Développement d\'applications React/Node.js pour des clients grands comptes.' },
            { role: 'Développeur Frontend', company: 'StartupSaaS', period: '2021 – 2023', desc: 'Intégration d\'interfaces React, optimisation des performances.' },
          ].map((exp, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-1 bg-primary/20 rounded-full shrink-0" />
              <div className="pb-4">
                <p className="font-medium text-foreground">{exp.role}</p>
                <p className="text-sm text-primary">{exp.company}</p>
                <p className="text-xs text-muted-foreground">{exp.period}</p>
                <p className="text-sm text-muted-foreground mt-1">{exp.desc}</p>
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-1.5" />
            Ajouter une expérience
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          {saved ? 'Enregistré ✓' : 'Enregistrer le profil'}
        </Button>
        {saved && <span className="text-sm text-green-600">Profil mis à jour</span>}
      </div>
    </div>
  );
}

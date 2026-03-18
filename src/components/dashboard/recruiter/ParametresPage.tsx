import { useState } from 'react';
import { Save, Building2, User, Bell, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';

const TABS = [
  { key: 'profile', label: 'Mon profil', icon: User },
  { key: 'company', label: 'Entreprise', icon: Building2 },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'security', label: 'Sécurité', icon: Shield },
];

export function ParametresPage() {
  const { profile } = useAuth();
  const [tab, setTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Paramètres</h1>
        <p className="text-muted-foreground">Gérez vos préférences et informations</p>
      </div>

      {/* Tab nav */}
      <div className="flex gap-1 border-b border-border">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              tab === t.key
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-border p-6">
        {tab === 'profile' && (
          <div className="space-y-5">
            <div className="flex items-center gap-4 pb-5 border-b border-border">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl">
                {profile?.full_name?.charAt(0) || 'M'}
              </div>
              <div>
                <p className="font-semibold text-foreground">{profile?.full_name || 'Marie Dupont'}</p>
                <p className="text-sm text-muted-foreground">{profile?.email || 'test@test.com'}</p>
                <Button variant="outline" size="sm" className="mt-2">Changer la photo</Button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Prénom</Label>
                <Input className="mt-1.5" defaultValue={profile?.full_name?.split(' ')[0] || 'Marie'} />
              </div>
              <div>
                <Label>Nom</Label>
                <Input className="mt-1.5" defaultValue={profile?.full_name?.split(' ')[1] || 'Dupont'} />
              </div>
              <div>
                <Label>Email</Label>
                <Input className="mt-1.5" defaultValue={profile?.email || 'test@test.com'} type="email" />
              </div>
              <div>
                <Label>Téléphone</Label>
                <Input className="mt-1.5" defaultValue="+33 6 12 34 56 78" />
              </div>
              <div className="sm:col-span-2">
                <Label>Poste</Label>
                <Input className="mt-1.5" defaultValue="Responsable RH" />
              </div>
            </div>
          </div>
        )}

        {tab === 'company' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label>Nom de l'entreprise</Label>
                <Input className="mt-1.5" defaultValue="Skillcruit Demo" />
              </div>
              <div>
                <Label>Secteur</Label>
                <Input className="mt-1.5" defaultValue="Technologie / SaaS" />
              </div>
              <div>
                <Label>Taille</Label>
                <Input className="mt-1.5" defaultValue="50-200 employés" />
              </div>
              <div>
                <Label>Site web</Label>
                <Input className="mt-1.5" defaultValue="skillcruit.app" />
              </div>
              <div>
                <Label>Ville</Label>
                <Input className="mt-1.5" defaultValue="Paris, France" />
              </div>
            </div>
          </div>
        )}

        {tab === 'notifications' && (
          <div className="space-y-4">
            {[
              { label: 'Nouvelle candidature reçue', desc: 'Recevoir un email à chaque nouvelle candidature', enabled: true },
              { label: 'Analyse IA terminée', desc: 'Notification quand les CV ont été scorés', enabled: true },
              { label: 'Rappel d\'entretien', desc: 'Rappel 1h avant chaque entretien planifié', enabled: true },
              { label: 'Résumé hebdomadaire', desc: 'Rapport de la semaine chaque lundi matin', enabled: false },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={item.enabled} className="sr-only peer" />
                  <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                </label>
              </div>
            ))}
          </div>
        )}

        {tab === 'security' && (
          <div className="space-y-4">
            <div>
              <Label>Mot de passe actuel</Label>
              <Input className="mt-1.5" type="password" placeholder="••••••••" />
            </div>
            <div>
              <Label>Nouveau mot de passe</Label>
              <Input className="mt-1.5" type="password" placeholder="••••••••" />
            </div>
            <div>
              <Label>Confirmer le nouveau mot de passe</Label>
              <Input className="mt-1.5" type="password" placeholder="••••••••" />
            </div>
            <p className="text-xs text-muted-foreground">Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre.</p>
          </div>
        )}

        <div className="mt-6 flex items-center gap-3">
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            {saved ? 'Enregistré ✓' : 'Enregistrer'}
          </Button>
          {saved && <span className="text-sm text-green-600">Modifications sauvegardées</span>}
        </div>
      </div>
    </div>
  );
}

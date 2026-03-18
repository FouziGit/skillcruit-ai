import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Briefcase, Clock, CheckCircle, Sparkles, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OFFRES_DATA: Record<string, any> = {
  '1': {
    id: '1', title: 'Développeur Backend Node.js', company: 'TechCorp', location: 'Paris', type: 'CDI',
    salary: '45–55K€', posted: 'Il y a 2 jours', match: 91,
    description: 'TechCorp recherche un Développeur Backend Node.js pour renforcer son équipe produit. Vous serez en charge de concevoir et maintenir les APIs REST et microservices de notre plateforme à fort trafic (50M requêtes/jour).',
    missions: [
      'Développer et maintenir les APIs REST en Node.js / TypeScript',
      'Optimiser les performances des requêtes PostgreSQL',
      'Participer aux revues de code et à l\'architecture technique',
      'Collaborer avec les équipes frontend et DevOps',
    ],
    requirements: ['Node.js / TypeScript (3 ans min.)', 'PostgreSQL ou MongoDB', 'Docker & CI/CD', 'Méthodes Agile', 'Anglais technique'],
    tags: ['Node.js', 'TypeScript', 'AWS', 'PostgreSQL', 'Docker'],
    matchReasons: [
      { label: 'Node.js / TypeScript', match: true },
      { label: 'PostgreSQL', match: true },
      { label: 'Docker', match: true },
      { label: 'AWS', match: true },
      { label: 'Anglais courant', match: false },
    ],
  },
  '2': {
    id: '2', title: 'Marketing Digital Manager', company: 'AgenceMedia', location: 'Remote', type: 'CDI',
    salary: '40–50K€', posted: 'Il y a 3 jours', match: 78,
    description: 'AgenceMedia cherche un Marketing Digital Manager pour piloter nos stratégies d\'acquisition et de rétention clients sur l\'ensemble des canaux digitaux.',
    missions: [
      'Définir et déployer la stratégie d\'acquisition multicanale',
      'Gérer les campagnes Google Ads, Meta et LinkedIn',
      'Analyser les performances et optimiser le ROI',
      'Manager une équipe de 3 personnes',
    ],
    requirements: ['5 ans en marketing digital', 'Maîtrise Google Ads & Meta Ads', 'Google Analytics / Looker', 'SEO/SEA avancé', 'Management'],
    tags: ['SEO', 'Analytics', 'Google Ads', 'CRM'],
    matchReasons: [
      { label: 'Google Analytics', match: true },
      { label: 'SEO/SEA', match: true },
      { label: 'Management d\'équipe', match: false },
      { label: 'Meta Ads avancé', match: false },
    ],
  },
};

export function OffreDetailPage() {
  const { id } = useParams<{ id: string }>();
  const offre = OFFRES_DATA[id || '1'];
  const [applied, setApplied] = useState(false);

  if (!offre) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Offre introuvable.</p>
        <Link to="/dashboard/offres"><Button variant="outline" className="mt-4">Retour aux offres</Button></Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <Link to="/dashboard/offres" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />Retour aux offres
        </Link>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">{offre.title}</h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
              <span className="font-medium text-foreground">{offre.company}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{offre.location}</span>
              <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{offre.type}</span>
              <span className="font-medium">{offre.salary}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{offre.posted}</span>
            </div>
          </div>
          <div className={`text-xl font-bold px-4 py-2 rounded-xl ${offre.match >= 85 ? 'bg-green-50 text-green-700' : offre.match >= 70 ? 'bg-yellow-50 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>
            {offre.match}% match
          </div>
        </div>
      </div>

      {/* AI Match card */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-primary/5 border border-primary/20 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-primary" />
          <p className="font-semibold text-primary text-sm">Analyse IA — Compatibilité avec votre profil</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {offre.matchReasons.map((r: any) => (
            <div key={r.label} className={`flex items-center gap-2 text-sm ${r.match ? 'text-green-700' : 'text-muted-foreground'}`}>
              {r.match
                ? <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                : <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />}
              {r.label}
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-border p-5">
            <h2 className="font-semibold text-foreground mb-3">Description</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{offre.description}</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-5">
            <h2 className="font-semibold text-foreground mb-3">Missions</h2>
            <ul className="space-y-2">
              {offre.missions.map((m: string) => (
                <li key={m} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-1 shrink-0">•</span>{m}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-xl border border-border p-5">
            <h2 className="font-semibold text-foreground mb-3">Prérequis</h2>
            <ul className="space-y-2">
              {offre.requirements.map((r: string) => (
                <li key={r} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" />{r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-border p-5">
            <div className="flex flex-wrap gap-1.5 mb-4">
              {offre.tags.map((t: string) => (
                <span key={t} className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-full">{t}</span>
              ))}
            </div>
            {applied ? (
              <div className="text-center py-2">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="font-medium text-green-700 text-sm">Candidature envoyée !</p>
                <p className="text-xs text-muted-foreground mt-1">Vous serez notifié de la réponse</p>
              </div>
            ) : (
              <Button className="w-full" onClick={() => setApplied(true)}>
                <Send className="w-4 h-4 mr-2" />Postuler maintenant
              </Button>
            )}
            <Link to="/dashboard/offres">
              <Button variant="outline" className="w-full mt-2" size="sm">Voir d'autres offres</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

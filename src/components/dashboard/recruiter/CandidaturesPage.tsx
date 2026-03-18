import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Download, Eye, ChevronUp, ChevronDown, X, Send, FileText, StickyNote, Sparkles, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const APPLICATIONS = [
  {
    id: '1', name: 'Alice Bernard', campaign: 'Développeur Full Stack React', score: 92, recommendation: 'accept', status: 'shortlisted', date: '15 mars 2026', experience: '5 ans',
    title: 'Développeuse Full Stack Senior', location: 'Paris', email: 'alice.bernard@email.com', phone: '+33 6 12 34 56 78',
    summary: 'Alice dispose d\'une solide expérience en développement React et Node.js, avec une forte capacité à travailler en équipe Agile. Son parcours en startup lui confère une adaptabilité remarquable et une culture du résultat.',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    criteria: [
      { label: 'Compétences techniques', score: 95 },
      { label: 'Expérience', score: 90 },
      { label: 'Formation', score: 88 },
      { label: 'Localisation', score: 100 },
      { label: 'Prétentions salariales', score: 85 },
    ],
  },
  {
    id: '2', name: 'Lucas Petit', campaign: 'Développeur Full Stack React', score: 88, recommendation: 'accept', status: 'interview', date: '10 mars 2026', experience: '4 ans',
    title: 'Développeur Full Stack', location: 'Paris', email: 'lucas.petit@email.com', phone: '+33 6 98 76 54 32',
    summary: 'Lucas présente un profil très complet avec une maîtrise avancée de React et une bonne compréhension des architectures microservices. Il a conduit plusieurs projets en autonomie et fait preuve d\'une grande rigueur.',
    skills: ['React', 'Vue.js', 'Node.js', 'MongoDB', 'CI/CD'],
    criteria: [
      { label: 'Compétences techniques', score: 90 },
      { label: 'Expérience', score: 85 },
      { label: 'Formation', score: 82 },
      { label: 'Localisation', score: 100 },
      { label: 'Prétentions salariales', score: 88 },
    ],
  },
  {
    id: '3', name: 'Sophie Martin', campaign: 'Product Manager Senior', score: 85, recommendation: 'accept', status: 'shortlisted', date: '13 mars 2026', experience: '7 ans',
    title: 'Product Manager', location: 'Paris', email: 'sophie.martin@email.com', phone: '+33 6 55 44 33 22',
    summary: 'Sophie possède une expérience significative en gestion de produit dans des environnements B2B SaaS. Elle maîtrise les méthodologies Agile/Scrum et a démontré sa capacité à aligner les équipes tech et business.',
    skills: ['Roadmap', 'Agile/Scrum', 'SQL', 'Figma', 'Jira', 'OKR'],
    criteria: [
      { label: 'Compétences produit', score: 90 },
      { label: 'Expérience', score: 95 },
      { label: 'Formation', score: 80 },
      { label: 'Localisation', score: 100 },
      { label: 'Prétentions salariales', score: 72 },
    ],
  },
  {
    id: '4', name: 'Thomas Leblanc', campaign: 'Développeur Full Stack React', score: 78, recommendation: 'review', status: 'analyzed', date: '14 mars 2026', experience: '3 ans',
    title: 'Développeur Frontend React', location: 'Versailles', email: 'thomas.leblanc@email.com', phone: '+33 6 11 22 33 44',
    summary: 'Thomas a une bonne maîtrise de React mais son expérience backend reste limitée. Son profil convient bien à un rôle frontend. Des lacunes sont notées sur les tests unitaires et l\'architecture API.',
    skills: ['React', 'JavaScript', 'CSS', 'Figma', 'Git'],
    criteria: [
      { label: 'Compétences techniques', score: 80 },
      { label: 'Expérience', score: 70 },
      { label: 'Formation', score: 75 },
      { label: 'Localisation', score: 85 },
      { label: 'Prétentions salariales', score: 92 },
    ],
  },
  {
    id: '5', name: 'Emma Duval', campaign: 'Data Engineer', score: 73, recommendation: 'review', status: 'analyzed', date: '9 mars 2026', experience: '4 ans',
    title: 'Data Engineer', location: 'Lyon', email: 'emma.duval@email.com', phone: '+33 6 77 88 99 00',
    summary: 'Emma dispose de bonnes bases en ingénierie de la donnée avec une expérience sur Spark et Airflow. Sa localisation à Lyon nécessite une discussion sur le remote. Son profil mérite un entretien de qualification.',
    skills: ['Python', 'Spark', 'Airflow', 'SQL', 'dbt', 'GCP'],
    criteria: [
      { label: 'Compétences techniques', score: 78 },
      { label: 'Expérience', score: 75 },
      { label: 'Formation', score: 80 },
      { label: 'Localisation', score: 55 },
      { label: 'Prétentions salariales', score: 80 },
    ],
  },
  {
    id: '6', name: 'Camille Roux', campaign: 'Product Manager Senior', score: 67, recommendation: 'review', status: 'analyzed', date: '11 mars 2026', experience: '3 ans',
    title: 'Product Owner', location: 'Paris', email: 'camille.roux@email.com', phone: '+33 6 44 55 66 77',
    summary: 'Camille a une expérience de Product Owner en agence digitale. Son background est davantage orienté exécution que stratégie produit. Elle manque d\'expérience sur les indicateurs de croissance et l\'analyse data.',
    skills: ['Agile', 'Jira', 'Confluence', 'UX', 'Roadmap'],
    criteria: [
      { label: 'Compétences produit', score: 68 },
      { label: 'Expérience', score: 60 },
      { label: 'Formation', score: 72 },
      { label: 'Localisation', score: 100 },
      { label: 'Prétentions salariales', score: 78 },
    ],
  },
  {
    id: '7', name: 'Noah Blanc', campaign: 'Data Engineer', score: 55, recommendation: 'review', status: 'pending', date: '8 mars 2026', experience: '2 ans',
    title: 'Data Analyst Junior', location: 'Marseille', email: 'noah.blanc@email.com', phone: '+33 6 33 44 55 66',
    summary: 'Noah est en début de carrière avec un profil analytics plutôt que data engineering. Il manque d\'expérience sur les pipelines de données et les outils cloud. Profil à considérer pour un poste junior ou en alternance.',
    skills: ['Python', 'SQL', 'Power BI', 'Excel'],
    criteria: [
      { label: 'Compétences techniques', score: 55 },
      { label: 'Expérience', score: 45 },
      { label: 'Formation', score: 68 },
      { label: 'Localisation', score: 40 },
      { label: 'Prétentions salariales', score: 95 },
    ],
  },
  {
    id: '8', name: 'Karim Benzara', campaign: 'Développeur Full Stack React', score: 45, recommendation: 'reject', status: 'rejected', date: '12 mars 2026', experience: '1 an',
    title: 'Développeur Web Junior', location: 'Bordeaux', email: 'karim.benzara@email.com', phone: '+33 6 22 33 44 55',
    summary: 'Karim dispose d\'une expérience insuffisante pour ce poste senior. Son profil est principalement axé sur le HTML/CSS avec une maîtrise très partielle de React. Il ne répond pas aux critères minimaux du poste.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React (débutant)'],
    criteria: [
      { label: 'Compétences techniques', score: 40 },
      { label: 'Expérience', score: 30 },
      { label: 'Formation', score: 55 },
      { label: 'Localisation', score: 35 },
      { label: 'Prétentions salariales', score: 90 },
    ],
  },
];

const REC_LABEL: Record<string, string> = { accept: 'Accepté', review: 'À revoir', reject: 'Refusé' };
const REC_COLOR: Record<string, string> = {
  accept: 'bg-green-50 text-green-700',
  review: 'bg-yellow-50 text-yellow-700',
  reject: 'bg-red-50 text-red-700',
};
const STATUS_LABEL: Record<string, string> = {
  pending: 'En attente', analyzed: 'Analysé', shortlisted: 'Présélectionné',
  interview: 'Entretien', rejected: 'Refusé', hired: 'Embauché',
};
const STATUS_COLOR: Record<string, string> = {
  pending: 'bg-gray-100 text-gray-600',
  analyzed: 'bg-blue-50 text-blue-700',
  shortlisted: 'bg-green-50 text-green-700',
  interview: 'bg-purple-50 text-purple-700',
  rejected: 'bg-red-50 text-red-700',
  hired: 'bg-teal-50 text-teal-700',
};

type Application = typeof APPLICATIONS[number];

function CandidateDrawer({ app, onClose }: { app: Application; onClose: () => void }) {
  const [note, setNote] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);
  const [cvSent, setCvSent] = useState(false);

  const saveNote = () => {
    if (!note.trim()) return;
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
      />
      {/* Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="fixed right-0 top-0 h-full w-full max-w-[480px] bg-white shadow-2xl z-50 flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0">
              {app.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-bold text-foreground text-lg leading-tight">{app.name}</h2>
              <p className="text-sm text-muted-foreground">{app.title}</p>
              <p className="text-xs text-muted-foreground">{app.location} · {app.experience} d'expérience</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Score global */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-border">
            <div className={`text-2xl font-bold ${app.score >= 80 ? 'text-green-700' : app.score >= 60 ? 'text-yellow-700' : 'text-red-600'}`}>
              {app.score}%
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Score IA global</p>
              <p className="text-xs text-muted-foreground">{app.campaign}</p>
            </div>
            <span className={`ml-auto text-xs px-2.5 py-1 rounded-full font-medium ${REC_COLOR[app.recommendation]}`}>
              {REC_LABEL[app.recommendation]}
            </span>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Contact</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4 shrink-0" />{app.email}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4 shrink-0" />{app.phone}
            </div>
          </div>

          {/* AI Summary */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <p className="text-sm font-semibold text-primary">Résumé IA du profil</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{app.summary}</p>
          </div>

          {/* Score breakdown */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Détail des critères</h3>
            <div className="space-y-3">
              {app.criteria.map((c) => (
                <div key={c.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">{c.label}</span>
                    <span className={`text-sm font-bold ${c.score >= 80 ? 'text-green-700' : c.score >= 60 ? 'text-yellow-700' : 'text-red-600'}`}>
                      {c.score}%
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${c.score}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className={`h-full rounded-full ${c.score >= 80 ? 'bg-green-500' : c.score >= 60 ? 'bg-yellow-500' : 'bg-red-400'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">Compétences détectées</h3>
            <div className="flex flex-wrap gap-1.5">
              {app.skills.map(s => (
                <span key={s} className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-full font-medium">{s}</span>
              ))}
            </div>
          </div>

          {/* Note */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
              <StickyNote className="w-4 h-4" />Note recruteur
            </h3>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Ajouter une note sur ce candidat..."
              rows={3}
              className="w-full text-sm border border-border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
            />
            <button
              onClick={saveNote}
              className="mt-1.5 text-xs text-primary hover:underline font-medium"
            >
              {noteSaved ? 'Note enregistrée ✓' : 'Enregistrer la note'}
            </button>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-5 border-t border-border space-y-2 shrink-0">
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Télécharger le CV
            </Button>
            <Button
              className="flex-1"
              size="sm"
              variant={cvSent ? 'outline' : 'default'}
              onClick={() => setCvSent(true)}
              disabled={cvSent}
            >
              {cvSent ? (
                <><FileText className="w-4 h-4 mr-2" />CV transmis ✓</>
              ) : (
                <><Send className="w-4 h-4 mr-2" />Transmettre le CV</>
              )}
            </Button>
          </div>
          <Button variant="outline" className="w-full" size="sm">
            <Mail className="w-4 h-4 mr-2" />
            Contacter le candidat
          </Button>
        </div>
      </motion.div>
    </>
  );
}

export function CandidaturesPage() {
  const [search, setSearch] = useState('');
  const [campaignFilter, setCampaignFilter] = useState('all');
  const [sortDir, setSortDir] = useState<'desc' | 'asc'>('desc');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const campaigns = Array.from(new Set(APPLICATIONS.map(a => a.campaign)));

  const filtered = APPLICATIONS
    .filter(a => {
      const matchSearch = a.name.toLowerCase().includes(search.toLowerCase());
      const matchCampaign = campaignFilter === 'all' || a.campaign === campaignFilter;
      return matchSearch && matchCampaign;
    })
    .sort((a, b) => sortDir === 'desc' ? b.score - a.score : a.score - b.score);

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {selectedApp && <CandidateDrawer app={selectedApp} onClose={() => setSelectedApp(null)} />}
      </AnimatePresence>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Candidatures</h1>
          <p className="text-muted-foreground">{APPLICATIONS.length} candidatures reçues</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Exporter CSV
        </Button>
      </div>

      {/* Summary chips */}
      <div className="flex gap-3 flex-wrap">
        <span className="text-sm px-3 py-1.5 bg-green-50 text-green-700 rounded-full font-medium">
          {APPLICATIONS.filter(a => a.recommendation === 'accept').length} acceptés
        </span>
        <span className="text-sm px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-full font-medium">
          {APPLICATIONS.filter(a => a.recommendation === 'review').length} à revoir
        </span>
        <span className="text-sm px-3 py-1.5 bg-red-50 text-red-700 rounded-full font-medium">
          {APPLICATIONS.filter(a => a.recommendation === 'reject').length} refusés
        </span>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un candidat..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={campaignFilter}
          onChange={e => setCampaignFilter(e.target.value)}
          className="border border-border rounded-lg px-3 py-2 text-sm text-foreground bg-white"
        >
          <option value="all">Toutes les campagnes</option>
          {campaigns.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-slate-50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Candidat</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Campagne</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  <button
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                    onClick={() => setSortDir(d => d === 'desc' ? 'asc' : 'desc')}
                  >
                    Score IA
                    {sortDir === 'desc' ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
                  </button>
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Recommandation</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Statut</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Date</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((app, i) => (
                <motion.tr
                  key={app.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm shrink-0">
                        {app.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{app.name}</p>
                        <p className="text-xs text-muted-foreground">{app.experience} d'exp.</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground max-w-[180px]">
                    <span className="truncate block">{app.campaign}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold w-10 ${app.score >= 80 ? 'text-green-700' : app.score >= 60 ? 'text-yellow-700' : 'text-red-600'}`}>
                        {app.score}%
                      </span>
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${app.score >= 80 ? 'bg-green-500' : app.score >= 60 ? 'bg-yellow-500' : 'bg-red-400'}`}
                          style={{ width: `${app.score}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${REC_COLOR[app.recommendation]}`}>
                      {REC_LABEL[app.recommendation]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${STATUS_COLOR[app.status]}`}>
                      {STATUS_LABEL[app.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">{app.date}</td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedApp(app)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">
            Aucune candidature trouvée
          </div>
        )}
      </div>
    </div>
  );
}

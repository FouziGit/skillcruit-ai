import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, Users, TrendingUp, CheckCircle, Clock, MapPin, Briefcase,
  Sparkles, ChevronDown, ChevronUp, Calendar, Download, Mail, Phone, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const CAMPAIGNS_DATA: Record<string, any> = {
  '1': {
    id: '1', title: 'Développeur Full Stack React', company: 'Skillcruit Demo',
    location: 'Paris', type: 'CDI', salary: '45–55K€', status: 'active', createdAt: '10 mars 2026',
    description: 'Nous recherchons un Développeur Full Stack React passionné pour rejoindre notre équipe produit en forte croissance. Vous travaillerez en étroite collaboration avec le CTO et les équipes design sur notre plateforme SaaS.',
    requirements: ['React / TypeScript (3 ans min.)', 'Node.js / Express', 'PostgreSQL ou MongoDB', 'Git & CI/CD', 'Méthodes Agile / Scrum'],
    candidates: [
      {
        id: '1', name: 'Alice Bernard', score: 92, recommendation: 'accept',
        email: 'alice.b@email.com', phone: '+33 6 12 34 56 78', location: 'Paris',
        experience: '5 ans', education: 'Master Informatique — EPITA (2020)',
        skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
        breakdown: { 'Compétences techniques': 96, 'Expérience': 91, 'Formation': 85, 'Localisation': 100 },
        summary: 'Alice présente un profil excellent pour ce poste. Ses 5 ans d\'expérience React en entreprise tech, sa maîtrise avancée de TypeScript et son passage chez une startup SaaS similaire en font la candidate la mieux positionnée. Score de compétences techniques parmi les plus élevés analysés.',
      },
      {
        id: '2', name: 'Lucas Petit', score: 88, recommendation: 'accept',
        email: 'lucas.p@email.com', phone: '+33 6 98 76 54 32', location: 'Paris',
        experience: '4 ans', education: 'Licence Informatique — Paris Nanterre (2021)',
        skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Docker'],
        breakdown: { 'Compétences techniques': 91, 'Expérience': 86, 'Formation': 78, 'Localisation': 100 },
        summary: 'Lucas est un candidat solide avec une excellente maîtrise des technologies clés. Légèrement moins expérimenté qu\'Alice, il compense par un portfolio de projets à fort trafic. Son profil est recommandé pour un entretien technique sans réserve.',
      },
      {
        id: '7', name: 'Thomas Leblanc', score: 78, recommendation: 'review',
        email: 'thomas.l@email.com', phone: '+33 7 11 22 33 44', location: 'Lyon',
        experience: '3 ans', education: 'DUT Informatique — IUT Lyon (2022)',
        skills: ['React', 'JavaScript', 'Node.js', 'MySQL'],
        breakdown: { 'Compétences techniques': 78, 'Expérience': 74, 'Formation': 65, 'Localisation': 70 },
        summary: 'Thomas maîtrise les bases mais l\'absence de TypeScript et sa localisation à Lyon peuvent être des points bloquants. Son niveau d\'expérience correspond aux exigences minimales. À évaluer selon la tolérance sur la mobilité géographique.',
      },
      {
        id: '8', name: 'Karim Benzara', score: 45, recommendation: 'reject',
        email: 'karim.b@email.com', phone: '+33 6 55 44 33 22', location: 'Marseille',
        experience: '1 an', education: 'Bootcamp développement web (2024)',
        skills: ['React', 'JavaScript', 'HTML/CSS'],
        breakdown: { 'Compétences techniques': 48, 'Expérience': 32, 'Formation': 40, 'Localisation': 50 },
        summary: 'Le profil de Karim ne correspond pas encore aux exigences du poste (3 ans requis). Ses compétences sont partielles — TypeScript, Node.js et les outils DevOps sont absents. Profil à reconsidérer dans 2–3 ans.',
      },
    ],
  },
  '2': {
    id: '2', title: 'Product Manager Senior', company: 'Skillcruit Demo',
    location: 'Paris', type: 'CDI', salary: '50–65K€', status: 'active', createdAt: '5 mars 2026',
    description: 'Nous recrutons un Product Manager Senior pour piloter notre roadmap produit en lien avec les équipes tech, design et commerciales. Vous définirez la vision produit et prioriserez le backlog.',
    requirements: ['5+ ans en Product Management', 'Expérience SaaS B2B obligatoire', 'Maîtrise Agile/Scrum', 'Outils analytics (Mixpanel, Amplitude)', 'Anglais courant'],
    candidates: [
      {
        id: '3', name: 'Sophie Martin', score: 85, recommendation: 'accept',
        email: 'sophie.m@email.com', phone: '+33 6 77 88 99 00', location: 'Paris',
        experience: '7 ans', education: 'Master Management — HEC Paris (2018)',
        skills: ['Product Management', 'Agile', 'Jira', 'Mixpanel', 'SQL', 'Figma'],
        breakdown: { 'Compétences métier': 88, 'Expérience': 92, 'Formation': 90, 'Localisation': 100 },
        summary: 'Sophie est une candidate senior très qualifiée avec 7 ans d\'expérience PM dont 4 en SaaS B2B. Son parcours HEC, sa maîtrise des outils analytics et son track record de lancement produit en font un profil rare. Fortement recommandée.',
      },
      {
        id: '5', name: 'Camille Roux', score: 67, recommendation: 'review',
        email: 'camille.r@email.com', phone: '+33 7 22 33 44 55', location: 'Paris',
        experience: '3 ans', education: 'Master Marketing — Sciences Po (2022)',
        skills: ['Product Management', 'UX Research', 'Jira', 'Google Analytics'],
        breakdown: { 'Compétences métier': 68, 'Expérience': 61, 'Formation': 82, 'Localisation': 100 },
        summary: 'Camille a un profil junior-PM prometteur avec une bonne culture produit et UX. Son expérience (3 ans) reste inférieure aux 5 ans requis. À considérer si le budget ou la séniorité peuvent être ajustés.',
      },
    ],
  },
  '4': {
    id: '4', title: 'Data Engineer', company: 'Skillcruit Demo',
    location: 'Lyon', type: 'CDI', salary: '48–60K€', status: 'paused', createdAt: '15 fév 2026',
    description: 'Nous recherchons un Data Engineer pour construire et maintenir notre infrastructure de données. Vous travaillerez sur des pipelines ETL, la data lake et les outils de BI.',
    requirements: ['Python & SQL avancé', 'Spark / Airflow', 'AWS ou GCP', 'DBT', 'Kafka (apprécié)'],
    candidates: [
      {
        id: '6', name: 'Emma Duval', score: 73, recommendation: 'review',
        email: 'emma.d@email.com', phone: '+33 6 33 44 55 66', location: 'Lyon',
        experience: '4 ans', education: 'Master Data Science — INSA Lyon (2021)',
        skills: ['Python', 'SQL', 'Airflow', 'AWS', 'Spark'],
        breakdown: { 'Compétences techniques': 76, 'Expérience': 71, 'Formation': 88, 'Localisation': 100 },
        summary: 'Emma a un profil data solide avec une bonne maîtrise de Python, SQL et Airflow. Son absence de DBT et Kafka est un manque, compensé par son expérience AWS. Profil intéressant à approfondir en entretien technique.',
      },
      {
        id: '9', name: 'Noah Blanc', score: 55, recommendation: 'review',
        email: 'noah.b@email.com', phone: '+33 7 66 77 88 99', location: 'Grenoble',
        experience: '2 ans', education: 'Licence Pro Data — Université Grenoble (2023)',
        skills: ['Python', 'SQL', 'Pandas', 'PostgreSQL'],
        breakdown: { 'Compétences techniques': 55, 'Expérience': 48, 'Formation': 60, 'Localisation': 75 },
        summary: 'Noah est en début de carrière data. Il maîtrise les fondamentaux Python/SQL mais n\'a pas encore d\'expérience avec les outils big data (Spark, Airflow). Profil junior à envisager uniquement si vous disposez d\'un plan d\'accompagnement.',
      },
    ],
  },
};

const REC_COLOR: Record<string, string> = {
  accept: 'bg-green-50 text-green-700 border-green-200',
  review: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  reject: 'bg-red-50 text-red-700 border-red-200',
};
const REC_LABEL: Record<string, string> = { accept: 'Accepté', review: 'À revoir', reject: 'Non retenu' };

function ScoreBar({ label, value, delay }: { label: string; value: number; delay: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-muted-foreground">{label}</span>
        <span className={`font-semibold ${value >= 80 ? 'text-green-700' : value >= 60 ? 'text-yellow-700' : 'text-red-600'}`}>{value}%</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ delay, duration: 0.6 }}
          className={`h-full rounded-full ${value >= 80 ? 'bg-green-500' : value >= 60 ? 'bg-yellow-500' : 'bg-red-400'}`}
        />
      </div>
    </div>
  );
}

export function CampagneDetailPage() {
  const { id } = useParams<{ id: string }>();
  const campaign = CAMPAIGNS_DATA[id || '1'];
  const [tab, setTab] = useState<'candidats' | 'description'>('candidats');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Record<string, string>>({});

  if (!campaign) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Campagne introuvable.</p>
        <Link to="/dashboard/campagnes"><Button variant="outline" className="mt-4">Retour</Button></Link>
      </div>
    );
  }

  const candidates = campaign.candidates;
  const accepted = candidates.filter((c: any) => (recommendations[c.id] || c.recommendation) === 'accept').length;
  const avgScore = Math.round(candidates.reduce((a: number, c: any) => a + c.score, 0) / candidates.length);

  const getEffectiveRec = (c: any) => recommendations[c.id] || c.recommendation;

  return (
    <div className="space-y-6">
      {/* Back + header */}
      <div>
        <Link to="/dashboard/campagnes" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour aux campagnes
        </Link>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-1 flex-wrap">
              <h1 className="text-2xl font-bold text-foreground">{campaign.title}</h1>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${campaign.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                {campaign.status === 'active' ? 'Active' : 'En pause'}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{campaign.location}</span>
              <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" />{campaign.type}</span>
              <span className="font-medium text-foreground">{campaign.salary}</span>
              <span>Créée le {campaign.createdAt}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1.5" />Exporter</Button>
            <Link to="/dashboard/campagnes/nouvelle"><Button variant="outline" size="sm">Dupliquer</Button></Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Candidatures', value: candidates.length, icon: Users, color: 'text-blue-600 bg-blue-50' },
          { label: 'Acceptés', value: accepted, icon: CheckCircle, color: 'text-green-600 bg-green-50' },
          { label: 'Score moyen IA', value: `${avgScore}%`, icon: TrendingUp, color: 'text-purple-600 bg-purple-50' },
          { label: 'Temps moyen', value: '< 30s', icon: Clock, color: 'text-orange-600 bg-orange-50' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-white rounded-xl border border-border p-4">
            <div className={`p-2 rounded-lg w-fit mb-2 ${s.color}`}><s.icon className="w-4 h-4" /></div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {[{ key: 'candidats', label: `Candidatures (${candidates.length})` }, { key: 'description', label: 'Description du poste' }].map(t => (
          <button key={t.key} onClick={() => setTab(t.key as any)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${tab === t.key ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Candidatures tab */}
      {tab === 'candidats' && (
        <div className="space-y-3">
          {candidates.map((candidate: any, i: number) => {
            const isExpanded = expanded === candidate.id;
            const rec = getEffectiveRec(candidate);
            return (
              <motion.div key={candidate.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className={`bg-white rounded-xl border transition-all ${isExpanded ? 'border-primary/30 shadow-sm' : 'border-border'}`}>
                {/* Candidate row */}
                <div className="p-4 flex items-center gap-4 flex-wrap">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                    {candidate.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <p className="font-semibold text-foreground">{candidate.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${REC_COLOR[rec]}`}>
                        {REC_LABEL[rec]}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{candidate.experience} d'exp. · {candidate.location} · {candidate.education.split('—')[0].trim()}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right hidden sm:block">
                      <p className={`text-xl font-bold ${candidate.score >= 80 ? 'text-green-700' : candidate.score >= 60 ? 'text-yellow-700' : 'text-red-600'}`}>
                        {candidate.score}%
                      </p>
                      <p className="text-xs text-muted-foreground">Score IA</p>
                    </div>
                    <button onClick={() => setExpanded(isExpanded ? null : candidate.id)}
                      className="p-2 rounded-lg hover:bg-slate-50 transition-colors text-muted-foreground">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }} className="overflow-hidden border-t border-border">
                      <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left: AI Analysis */}
                        <div className="space-y-4">
                          {/* AI Summary */}
                          <div className="bg-primary/5 rounded-xl p-4 border border-primary/15">
                            <div className="flex items-center gap-2 mb-2">
                              <Sparkles className="w-4 h-4 text-primary" />
                              <p className="text-sm font-semibold text-primary">Analyse IA</p>
                            </div>
                            <p className="text-sm text-foreground leading-relaxed">{candidate.summary}</p>
                          </div>

                          {/* Score breakdown */}
                          <div>
                            <p className="text-sm font-semibold text-foreground mb-3">Détail du score</p>
                            <div className="space-y-2.5">
                              {Object.entries(candidate.breakdown).map(([label, value], idx) => (
                                <ScoreBar key={label} label={label} value={value as number} delay={idx * 0.08} />
                              ))}
                            </div>
                          </div>

                          {/* Skills */}
                          <div>
                            <p className="text-sm font-semibold text-foreground mb-2">Compétences détectées</p>
                            <div className="flex flex-wrap gap-1.5">
                              {candidate.skills.map((s: string) => (
                                <span key={s} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">{s}</span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right: Contact + Actions */}
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-semibold text-foreground mb-3">Coordonnées</p>
                            <div className="space-y-2">
                              <a href={`mailto:${candidate.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                <Mail className="w-4 h-4" />{candidate.email}
                              </a>
                              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="w-4 h-4" />{candidate.phone}
                              </p>
                              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4" />{candidate.location}
                              </p>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-foreground mb-2">Formation</p>
                            <p className="text-sm text-muted-foreground">{candidate.education}</p>
                          </div>

                          {/* Actions */}
                          <div>
                            <p className="text-sm font-semibold text-foreground mb-3">Action</p>
                            <div className="flex flex-wrap gap-2">
                              <Button size="sm" className="bg-green-600 hover:bg-green-700"
                                onClick={() => setRecommendations(r => ({ ...r, [candidate.id]: 'accept' }))}>
                                <CheckCircle className="w-3.5 h-3.5 mr-1.5" />Accepter
                              </Button>
                              <Button size="sm" variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                                onClick={() => setRecommendations(r => ({ ...r, [candidate.id]: 'review' }))}>
                                À revoir
                              </Button>
                              <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50"
                                onClick={() => setRecommendations(r => ({ ...r, [candidate.id]: 'reject' }))}>
                                <X className="w-3.5 h-3.5 mr-1.5" />Refuser
                              </Button>
                              <Button size="sm" variant="outline">
                                <Calendar className="w-3.5 h-3.5 mr-1.5" />Entretien
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Description tab */}
      {tab === 'description' && (
        <div className="bg-white rounded-xl border border-border p-6 space-y-5 max-w-2xl">
          <div>
            <p className="text-sm font-semibold text-foreground mb-2">Description du poste</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{campaign.description}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Prérequis / Critères IA</p>
            <ul className="space-y-2">
              {campaign.requirements.map((req: string) => (
                <li key={req} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" />{req}
                </li>
              ))}
            </ul>
          </div>
          <Button variant="outline" size="sm">
            Modifier le poste
          </Button>
        </div>
      )}
    </div>
  );
}

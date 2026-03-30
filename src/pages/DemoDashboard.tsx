import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, Users, TrendingUp, CheckCircle, Clock, MapPin, Briefcase,
  Sparkles, ChevronDown, ChevronUp, Mail, Phone, Share2, LinkIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import {
  getOffre, getApplications,
  type DemoOffre, type DemoApplication,
} from '@/lib/demo-store';

const REC_COLOR: Record<string, string> = {
  accept: 'bg-green-50 text-green-700 border-green-200',
  review: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  reject: 'bg-red-50 text-red-700 border-red-200',
};
const REC_LABEL: Record<string, string> = { accept: 'Recommandé', review: 'À examiner', reject: 'Non retenu' };

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

const DemoDashboard = () => {
  const { id } = useParams<{ id: string }>();
  const [offre, setOffre] = useState<DemoOffre | null>(null);
  const [applications, setApplications] = useState<DemoApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const found = getOffre(id || '');
    setOffre(found);
    if (found) {
      const apps = getApplications(found.id).sort((a, b) => {
        const scoreA = a.analysis?.score ?? 0;
        const scoreB = b.analysis?.score ?? 0;
        return scoreB - scoreA;
      });
      setApplications(apps);
    }
    setLoading(false);
  }, [id]);

  const handleCopyLink = () => {
    if (!offre) return;
    navigator.clipboard.writeText(`${window.location.origin}/demo/offre/${offre.id}`);
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

  const analyzedApps = applications.filter(a => a.analysis);
  const accepted = analyzedApps.filter(a => a.analysis?.recommendation === 'accept').length;
  const avgScore = analyzedApps.length > 0
    ? Math.round(analyzedApps.reduce((sum, a) => sum + (a.analysis?.score ?? 0), 0) / analyzedApps.length)
    : 0;

  const salaryText = offre.salaryMin && offre.salaryMax
    ? `${offre.salaryMin} – ${offre.salaryMax}€`
    : offre.salaryMin || offre.salaryMax
      ? `${offre.salaryMin || offre.salaryMax}€`
      : null;

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <SEOHead
        title={`Dashboard RH - ${offre.title} | Skillcruit Demo`}
        description={`Consultez les résultats d'analyse IA pour l'offre ${offre.title}.`}
      />
      <Navbar />

      <section className="pt-28 pb-16">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <Link to={`/demo/offre/${offre.id}`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" />Retour à l'offre
              </Link>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h1 className="text-2xl font-bold text-foreground">Dashboard RH</h1>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-50 text-green-700">Active</span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">{offre.title}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1 flex-wrap">
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{offre.location}</span>
                    <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" />{offre.contractType}</span>
                    {salaryText && <span className="font-medium text-foreground">{salaryText}</span>}
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleCopyLink}>
                  <Share2 className="w-4 h-4 mr-1.5" />{copied ? 'Copié !' : 'Lien candidat'}
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Candidatures', value: applications.length, icon: Users, color: 'text-blue-600 bg-blue-50' },
                { label: 'Recommandés', value: accepted, icon: CheckCircle, color: 'text-green-600 bg-green-50' },
                { label: 'Score moyen IA', value: avgScore > 0 ? `${avgScore}%` : '—', icon: TrendingUp, color: 'text-purple-600 bg-purple-50' },
                { label: 'Temps d\'analyse', value: '< 30s', icon: Clock, color: 'text-orange-600 bg-orange-50' },
              ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-xl border border-border p-4">
                  <div className={`p-2 rounded-lg w-fit mb-2 ${s.color}`}><s.icon className="w-4 h-4" /></div>
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Candidates list */}
            {applications.length === 0 ? (
              <div className="bg-white rounded-xl border border-border p-10 text-center">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Aucune candidature pour le moment</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Partagez le lien de l'offre pour recevoir des candidatures et voir les analyses IA ici.
                </p>
                <div className="flex items-center justify-center gap-2">
                  <div className="bg-slate-50 border border-border rounded-lg px-3 py-2 text-sm text-muted-foreground flex items-center gap-2 max-w-md truncate">
                    <LinkIcon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{window.location.origin}/demo/offre/{offre.id}</span>
                  </div>
                  <Button size="sm" onClick={handleCopyLink}>
                    {copied ? 'Copié !' : 'Copier'}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Candidatures ({applications.length})</h3>
                {applications.map((app, i) => {
                  const isExpanded = expanded === app.id;
                  const analysis = app.analysis;
                  const rec = analysis?.recommendation || 'review';

                  return (
                    <motion.div key={app.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                      className={`bg-white rounded-xl border transition-all ${isExpanded ? 'border-primary/30 shadow-sm' : 'border-border'}`}>
                      {/* Candidate row */}
                      <div className="p-4 flex items-center gap-4 flex-wrap">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                          {app.candidateName.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-0.5">
                            <p className="font-semibold text-foreground">{app.candidateName}</p>
                            {analysis && (
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${REC_COLOR[rec]}`}>
                                {REC_LABEL[rec]}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{app.candidateEmail} · {app.cvFileName}</p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          {analysis && (
                            <div className="text-right hidden sm:block">
                              <p className={`text-xl font-bold ${analysis.score >= 75 ? 'text-green-700' : analysis.score >= 55 ? 'text-yellow-700' : 'text-red-600'}`}>
                                {analysis.score}%
                              </p>
                              <p className="text-xs text-muted-foreground">Score IA</p>
                            </div>
                          )}
                          <button onClick={() => setExpanded(isExpanded ? null : app.id)}
                            className="p-2 rounded-lg hover:bg-slate-50 transition-colors text-muted-foreground">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Expanded detail */}
                      <AnimatePresence>
                        {isExpanded && analysis && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }} className="overflow-hidden border-t border-border">
                            <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
                              {/* Left: AI Analysis */}
                              <div className="space-y-4">
                                <div className="bg-primary/5 rounded-xl p-4 border border-primary/15">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Sparkles className="w-4 h-4 text-primary" />
                                    <p className="text-sm font-semibold text-primary">Analyse IA</p>
                                  </div>
                                  <p className="text-sm text-foreground leading-relaxed">{analysis.summary}</p>
                                </div>

                                <div>
                                  <p className="text-sm font-semibold text-foreground mb-3">Détail du score</p>
                                  <div className="space-y-2.5">
                                    {Object.entries(analysis.criteriaScores).map(([label, value], idx) => (
                                      <ScoreBar key={label} label={label} value={value} delay={idx * 0.08} />
                                    ))}
                                  </div>
                                </div>

                                {analysis.skillsDetected.length > 0 && (
                                  <div>
                                    <p className="text-sm font-semibold text-foreground mb-2">Compétences détectées</p>
                                    <div className="flex flex-wrap gap-1.5">
                                      {analysis.skillsDetected.map(s => (
                                        <span key={s} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">{s}</span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Right: Contact + Strengths/Weaknesses */}
                              <div className="space-y-4">
                                <div>
                                  <p className="text-sm font-semibold text-foreground mb-3">Coordonnées</p>
                                  <div className="space-y-2">
                                    <a href={`mailto:${app.candidateEmail}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                      <Mail className="w-4 h-4" />{app.candidateEmail}
                                    </a>
                                    {app.candidatePhone && (
                                      <p className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Phone className="w-4 h-4" />{app.candidatePhone}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div>
                                  <p className="text-sm font-semibold text-green-700 mb-2">Points forts</p>
                                  <ul className="space-y-1.5">
                                    {analysis.strengths.map((s, idx) => (
                                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1.5">
                                        <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />{s}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {analysis.weaknesses.length > 0 && (
                                  <div>
                                    <p className="text-sm font-semibold text-amber-700 mb-2">Axes d'amélioration</p>
                                    <ul className="space-y-1.5">
                                      {analysis.weaknesses.map((w, idx) => (
                                        <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1.5">
                                          <span className="text-amber-500 shrink-0 mt-0.5">!</span>{w}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
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
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DemoDashboard;

import { motion } from 'motion/react';
import { TrendingUp, Target, Clock, Award } from 'lucide-react';

const SCORE_DIST = [
  { label: 'Développeur Full Stack React', score: 88, company: 'TechCorp' },
  { label: 'Product Manager', score: 72, company: 'StartupXYZ' },
  { label: 'Data Analyst', score: 45, company: 'Finance SA' },
];

const TIMELINE = [
  { date: '10 mars', event: 'Candidature envoyée', detail: 'Développeur Full Stack React · TechCorp', color: 'bg-primary' },
  { date: '11 mars', event: 'CV analysé par IA', detail: 'Score de matching : 88%', color: 'bg-blue-500' },
  { date: '12 mars', event: 'Présélectionné', detail: 'Ajouté à la shortlist TechCorp', color: 'bg-green-500' },
  { date: '14 mars', event: 'Invitation entretien', detail: 'Entretien planifié le 25 mars', color: 'bg-purple-500' },
];

export function StatistiquesPage() {
  const avgScore = Math.round(SCORE_DIST.reduce((a, b) => a + b.score, 0) / SCORE_DIST.length);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Statistiques</h1>
        <p className="text-muted-foreground">Suivez vos performances de candidature</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Candidatures', value: 3, icon: Target, color: 'text-blue-600 bg-blue-50' },
          { label: 'Score moyen IA', value: `${avgScore}%`, icon: TrendingUp, color: 'text-green-600 bg-green-50' },
          { label: 'Présélections', value: 1, icon: Award, color: 'text-purple-600 bg-purple-50' },
          { label: 'Taux de réponse', value: '67%', icon: Clock, color: 'text-orange-600 bg-orange-50' },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-xl border border-border p-4"
          >
            <div className={`p-2 rounded-lg w-fit mb-3 ${kpi.color}`}>
              <kpi.icon className="w-4 h-4" />
            </div>
            <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
            <p className="text-sm text-muted-foreground">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score par candidature */}
        <div className="bg-white rounded-xl border border-border p-5">
          <h2 className="font-semibold text-foreground mb-4">Score IA par candidature</h2>
          <div className="space-y-4">
            {SCORE_DIST.map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <p className="text-sm font-medium text-foreground truncate max-w-[200px]">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.company}</p>
                  </div>
                  <span className={`text-sm font-bold ${
                    item.score >= 80 ? 'text-green-700' :
                    item.score >= 60 ? 'text-yellow-700' :
                    'text-red-600'
                  }`}>{item.score}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.score}%` }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.7 }}
                    className={`h-full rounded-full ${
                      item.score >= 80 ? 'bg-green-500' :
                      item.score >= 60 ? 'bg-yellow-500' :
                      'bg-red-400'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Average */}
          <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Score moyen global</p>
            <p className="text-lg font-bold text-primary">{avgScore}%</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-xl border border-border p-5">
          <h2 className="font-semibold text-foreground mb-4">Activité récente</h2>
          <div className="space-y-0">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 pb-5 last:pb-0 relative"
              >
                {/* Line */}
                {i < TIMELINE.length - 1 && (
                  <div className="absolute left-[11px] top-6 w-0.5 h-full bg-border" />
                )}
                {/* Dot */}
                <div className={`w-5 h-5 rounded-full ${item.color} shrink-0 mt-0.5 relative z-10 ring-2 ring-white`} />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{item.event}</p>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-2">💡 Conseils pour améliorer votre score</h3>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li>• Complétez votre profil à 100% pour un meilleur matching (+15 pts en moyenne)</li>
          <li>• Adaptez votre CV aux mots-clés de chaque offre</li>
          <li>• Ajoutez vos certifications et formations récentes</li>
        </ul>
      </div>
    </div>
  );
}

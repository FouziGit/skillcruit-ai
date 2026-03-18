import { motion } from 'motion/react';
import { CheckCircle, Clock, XCircle, MessageSquare, ArrowRight } from 'lucide-react';

const APPLICATIONS = [
  {
    id: '1',
    title: 'Développeur Full Stack React',
    company: 'TechCorp',
    location: 'Paris',
    score: 88,
    date: '10 mars 2026',
    status: 'interview',
    steps: ['Envoyée', 'Analysée', 'Présélectionné', 'Entretien', 'Décision'],
    currentStep: 3,
    note: 'Entretien planifié le 25 mars à 11h00',
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'StartupXYZ',
    location: 'Lyon',
    score: 72,
    date: '8 mars 2026',
    status: 'analyzed',
    steps: ['Envoyée', 'Analysée', 'Présélectionné', 'Entretien', 'Décision'],
    currentStep: 1,
    note: 'En cours d\'examen par le recruteur',
  },
  {
    id: '3',
    title: 'Data Analyst',
    company: 'Finance SA',
    location: 'Bordeaux',
    score: 45,
    date: '5 mars 2026',
    status: 'rejected',
    steps: ['Envoyée', 'Analysée', 'Refusée', '', ''],
    currentStep: 2,
    note: 'Profil non retenu pour cette offre',
  },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: typeof CheckCircle }> = {
  interview: { label: 'Entretien planifié', color: 'text-purple-700 bg-purple-50', icon: MessageSquare },
  analyzed: { label: 'En cours d\'analyse', color: 'text-blue-700 bg-blue-50', icon: Clock },
  shortlisted: { label: 'Présélectionné', color: 'text-green-700 bg-green-50', icon: CheckCircle },
  rejected: { label: 'Non retenu', color: 'text-red-700 bg-red-50', icon: XCircle },
  pending: { label: 'En attente', color: 'text-gray-600 bg-gray-100', icon: Clock },
};

export function MesCandidaturesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mes candidatures</h1>
        <p className="text-muted-foreground">{APPLICATIONS.length} candidatures envoyées</p>
      </div>

      <div className="space-y-4">
        {APPLICATIONS.map((app, i) => {
          const config = STATUS_CONFIG[app.status] || STATUS_CONFIG.pending;
          const Icon = config.icon;

          return (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-xl border border-border p-5"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">{app.title}</h3>
                  <p className="text-sm text-muted-foreground">{app.company} · {app.location} · Postulé le {app.date}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    app.score >= 80 ? 'bg-green-50 text-green-700' :
                    app.score >= 60 ? 'bg-yellow-50 text-yellow-700' :
                    'bg-red-50 text-red-700'
                  }`}>
                    Score {app.score}%
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 ${config.color}`}>
                    <Icon className="w-3 h-3" />
                    {config.label}
                  </span>
                </div>
              </div>

              {/* Progress steps */}
              <div className="mb-4">
                <div className="flex items-center gap-0">
                  {app.steps.filter(s => s).map((step, idx) => {
                    const isCompleted = idx < app.currentStep;
                    const isCurrent = idx === app.currentStep;
                    const isRejected = app.status === 'rejected' && idx === app.currentStep;

                    return (
                      <div key={idx} className="flex items-center flex-1">
                        <div className="flex flex-col items-center">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                            isRejected ? 'bg-red-100 text-red-600 border-2 border-red-300' :
                            isCompleted || isCurrent ? 'bg-primary text-white' :
                            'bg-slate-100 text-slate-400'
                          }`}>
                            {isRejected ? '✕' : isCompleted ? '✓' : idx + 1}
                          </div>
                          <span className={`text-xs mt-1 text-center whitespace-nowrap ${
                            isRejected ? 'text-red-600 font-medium' :
                            isCurrent || isCompleted ? 'text-foreground font-medium' :
                            'text-muted-foreground'
                          }`}>
                            {step}
                          </span>
                        </div>
                        {idx < app.steps.filter(s => s).length - 1 && (
                          <div className={`flex-1 h-0.5 mx-1 mb-4 ${
                            idx < app.currentStep ? 'bg-primary' : 'bg-slate-100'
                          }`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Note */}
              {app.note && (
                <div className={`text-sm px-3 py-2 rounded-lg flex items-center gap-2 ${
                  app.status === 'rejected' ? 'bg-red-50 text-red-700' :
                  app.status === 'interview' ? 'bg-purple-50 text-purple-700' :
                  'bg-blue-50 text-blue-700'
                }`}>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  {app.note}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

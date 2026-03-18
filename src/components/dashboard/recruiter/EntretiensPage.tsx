import { motion } from 'motion/react';
import { Calendar, Clock, Video, MapPin, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UPCOMING = [
  { id: '1', candidate: 'Alice Bernard', campaign: 'Développeur Full Stack React', type: 'Entretien RH', date: '20 mars 2026', time: '14:00', mode: 'visio', score: 92 },
  { id: '2', candidate: 'Sophie Martin', campaign: 'Product Manager Senior', type: 'Entretien technique', date: '21 mars 2026', time: '10:30', mode: 'présentiel', score: 85 },
  { id: '3', candidate: 'Lucas Petit', campaign: 'Développeur Full Stack React', type: 'Entretien final', date: '22 mars 2026', time: '15:00', mode: 'visio', score: 88 },
];

const PAST = [
  { id: '4', candidate: 'Marie Fontaine', campaign: 'Data Engineer', type: 'Entretien RH', date: '12 mars 2026', outcome: 'Retenu' },
  { id: '5', candidate: 'Paul Renard', campaign: 'Data Engineer', type: 'Entretien technique', date: '10 mars 2026', outcome: 'Non retenu' },
];

export function EntretiensPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Entretiens</h1>
        <p className="text-muted-foreground">{UPCOMING.length} entretiens planifiés · {PAST.length} passés</p>
      </div>

      {/* Upcoming */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">À venir</h2>
        <div className="space-y-3">
          {UPCOMING.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-xl border border-border p-5 flex items-center gap-5 flex-wrap"
            >
              {/* Date badge */}
              <div className="bg-primary/10 rounded-xl p-3 text-center min-w-[56px]">
                <p className="text-xs font-medium text-primary">{item.date.split(' ')[1]}</p>
                <p className="text-2xl font-bold text-primary leading-none">{item.date.split(' ')[0]}</p>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-semibold text-foreground">{item.candidate}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-medium">Score {item.score}%</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{item.type} · {item.campaign}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {item.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    {item.mode === 'visio' ? <Video className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                    {item.mode === 'visio' ? 'Visioconférence' : 'Présentiel'}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {item.mode === 'visio' && (
                  <Button size="sm">
                    <Video className="w-4 h-4 mr-1.5" />
                    Rejoindre
                  </Button>
                )}
                <Button variant="outline" size="sm">Annuler</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Past */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">Passés</h2>
        <div className="bg-white rounded-xl border border-border divide-y divide-border overflow-hidden">
          {PAST.map((item) => (
            <div key={item.id} className="px-5 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-semibold text-sm">
                  {item.candidate.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.candidate}</p>
                  <p className="text-xs text-muted-foreground">{item.type} · {item.campaign} · {item.date}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1 ${
                item.outcome === 'Retenu' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {item.outcome === 'Retenu' && <CheckCircle className="w-3 h-3" />}
                {item.outcome}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Marquee } from "@/components/ui/marquee";
import { Shield, Plug, Brain, FileText, Users, Zap } from "lucide-react";

const stats = [
  { value: 30, suffix: "sec", label: "Temps d'analyse moyen" },
  { value: 5, suffix: "x", label: "Plus de mandats traités" },
  { value: 80, suffix: "%", label: "De temps gagné sur le tri" },
  { value: 100, suffix: "%", label: "RGPD conforme" },
];

const trustSignals = [
  { icon: Shield, label: "RGPD Conforme" },
  { icon: Plug, label: "Intégration ATS" },
  { icon: Brain, label: "NLP Avancé" },
  { icon: FileText, label: "Tous formats CV" },
  { icon: Users, label: "Multi-utilisateurs" },
  { icon: Zap, label: "Scoring instantané" },
];

const TrustCard = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white border border-border/60 shadow-sm">
    <Icon className="w-5 h-5 text-primary" />
    <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">{label}</span>
  </div>
);

export const Stats = () => {
  return (
    <section className="py-20 section-light relative overflow-hidden" aria-label="Statistiques">
      <div className="container px-6 relative">
        {/* Stats counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
          {stats.map((stat, index) => (
            <BlurFade key={stat.label} delay={index * 0.1} inView>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                  <NumberTicker value={stat.value} />
                  <span className="text-primary">{stat.suffix}</span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </BlurFade>
          ))}
        </div>

        {/* Trust marquee */}
        <BlurFade delay={0.4} inView>
          <div className="relative">
            <Marquee pauseOnHover className="[--duration:30s] [--gap:1rem]">
              {trustSignals.map((signal) => (
                <TrustCard key={signal.label} {...signal} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:25s] [--gap:1rem] mt-3">
              {trustSignals.map((signal) => (
                <TrustCard key={signal.label} {...signal} />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-slate-50/80" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-slate-50/80" />
          </div>
        </BlurFade>
      </div>
    </section>
  );
};

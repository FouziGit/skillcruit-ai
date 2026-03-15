import { Brain, Zap, Shield, Target, Upload, ListChecks, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { BlurFade } from "@/components/ui/blur-fade";
import { GridPattern } from "@/components/ui/grid-pattern";
import { NumberTicker } from "@/components/ui/number-ticker";

const features = [
  {
    Icon: Brain,
    name: "Analyse contextuelle NLP",
    description: "Le moteur NLP comprend le sens des expériences, pas juste les mots-clés. Scoring intelligent selon vos critères.",
    href: "/technologie",
    cta: "Voir la technologie",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
        <div className="flex items-center gap-8">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <div className="w-px h-12 bg-blue-300" />
          <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center">
            <Brain className="w-8 h-8 text-violet-600" />
          </div>
          <div className="w-px h-12 bg-violet-300" />
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center">
            <Target className="w-8 h-8 text-emerald-600" />
          </div>
        </div>
      </div>
    ),
  },
  {
    Icon: Zap,
    name: "Résultats en 30 secondes",
    description: "Scoring instantané, classement automatique, shortlist prête à l'emploi.",
    href: "/demo",
    cta: "Essayer la démo",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute right-6 top-6 flex items-baseline gap-1 opacity-30 group-hover:opacity-50 transition-opacity">
        <span className="text-6xl font-bold text-amber-500">
          <NumberTicker value={30} />
        </span>
        <span className="text-2xl font-semibold text-amber-400">sec</span>
      </div>
    ),
  },
  {
    Icon: Upload,
    name: "3 étapes simples",
    description: "Importez vos CV, l'IA analyse et score, votre shortlist est prête. PDF, Word, tous formats.",
    href: "/technologie",
    cta: "Comment ça marche",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute right-6 top-6 flex flex-col gap-2 opacity-20 group-hover:opacity-30 transition-opacity">
        {["Import", "Analyse", "Shortlist"].map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">{i + 1}</div>
            <span className="text-sm font-medium text-muted-foreground">{step}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    Icon: Shield,
    name: "Matching multicritère & RGPD",
    description: "Compétences, expérience, localisation, soft skills pondérés. Données hébergées en Europe, chiffrées, droits garantis.",
    href: "/conformite",
    cta: "Conformité RGPD",
    className: "col-span-3 lg:col-span-2",
    background: (
      <GridPattern
        width={30}
        height={30}
        className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity [mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
      />
    ),
  },
];

export const FeaturesGrid = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden" aria-labelledby="features-title">
      <div className="container px-6 relative">
        <BlurFade delay={0} inView>
          <div className="max-w-2xl mx-auto text-center mb-14">
            <h2 id="features-title" className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Pourquoi <span className="text-primary">Skillcruit</span> ?
            </h2>
            <p className="text-muted-foreground text-lg">
              De l'import à la shortlist, la présélection conçue pour les recruteurs exigeants.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.15} inView>
          <BentoGrid className="max-w-5xl mx-auto auto-rows-[20rem] grid-cols-3">
            {features.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <div className="text-center mt-12">
            <Button variant="outline" asChild className="group">
              <Link to="/technologie">
                Voir toutes les fonctionnalités
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </BlurFade>
      </div>
    </section>
  );
};

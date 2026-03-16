import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Clock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { GridPattern } from "@/components/ui/grid-pattern";

export const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16 bg-gradient-to-b from-slate-50/30 to-white/30" aria-labelledby="hero-title">
      <GridPattern width={40} height={40} className="absolute inset-0 opacity-[0.03] [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]" />

      <div className="container relative z-10 px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <BlurFade delay={0} inView>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/15">
              <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
              <AnimatedShinyText className="text-sm font-medium" shimmerWidth={80}>
                Présélection intelligente de candidats
              </AnimatedShinyText>
            </div>
          </BlurFade>

          {/* Headline */}
          <BlurFade delay={0.1} inView>
            <h1
              id="hero-title"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-balance text-foreground"
            >
              Recrutez les bons profils,
              <br />
              <AnimatedGradientText
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
                colorFrom="hsl(220, 90%, 50%)"
                colorTo="hsl(220, 70%, 65%)"
                speed={1.5}
              >
                plus vite
              </AnimatedGradientText>
            </h1>
          </BlurFade>

          {/* Subheadline */}
          <BlurFade delay={0.2} inView>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Analysez, scorez et hiérarchisez vos candidatures en quelques secondes.
              Scoring intelligent, matching automatique, conformité RGPD.
            </p>
          </BlurFade>

          {/* CTAs */}
          <BlurFade delay={0.3} inView>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="group text-base px-8 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                onClick={scrollToContact}
              >
                Demander une démo
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Button>
              <Button variant="outline" size="lg" asChild className="text-base px-8">
                <Link to="/demo">
                  Voir la démo interactive
                </Link>
              </Button>
            </div>
          </BlurFade>

          {/* Trust indicators */}
          <BlurFade delay={0.4} inView>
            <div className="flex flex-wrap justify-center gap-6 pt-8">
              {[
                { icon: Clock, text: "Essai gratuit 14 jours" },
                { icon: Shield, text: "RGPD conforme" },
                { icon: Zap, text: "Résultats en 30 sec" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border text-sm text-muted-foreground shadow-sm hover:scale-105 transition-transform"
                >
                  <item.icon className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
};

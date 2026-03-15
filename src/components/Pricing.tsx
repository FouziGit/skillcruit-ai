import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";

export const Pricing = () => {
  const plans = [
    {
      name: "Essai",
      price: "0€",
      period: "14 jours",
      features: ["50 candidatures", "Scoring intelligent", "Résumés auto", "Support email"],
      cta: "Essayer",
      highlighted: false,
    },
    {
      name: "Start-up",
      price: "299€",
      period: "/mois",
      features: ["500 candidatures", "Matching intelligent", "Base de talents", "API", "Support prioritaire"],
      cta: "Démarrer",
      highlighted: true,
    },
    {
      name: "Entreprise",
      price: "Sur devis",
      period: "",
      features: ["Illimité", "Multi-utilisateurs", "RGPD avancé", "Support 24/7", "Compte dédié"],
      cta: "Contacter",
      highlighted: false,
    },
  ];

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" aria-labelledby="pricing-title">
      <div className="container px-6 relative">
        <BlurFade delay={0} inView>
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 id="pricing-title" className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Tarifs <span className="text-primary">simples</span>
            </h2>
            <p className="text-muted-foreground text-lg">Sans engagement. Résiliable à tout moment.</p>
          </div>
        </BlurFade>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <BlurFade key={index} delay={0.1 + index * 0.15} inView>
              {plan.highlighted ? (
                <NeonGradientCard
                  neonColors={{ firstColor: "hsl(220, 90%, 50%)", secondColor: "hsl(220, 70%, 65%)" }}
                  borderRadius={16}
                  borderSize={2}
                  className="h-full"
                >
                  <div className="relative">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-primary text-white text-sm font-medium flex items-center gap-1.5 shadow-md z-10">
                      <Sparkles className="w-3.5 h-3.5" />
                      Populaire
                    </div>

                    <div className="mb-8 pt-2">
                      <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground">{plan.period}</span>
                      </div>
                    </div>

                    <Button className="w-full shadow-md shadow-primary/20 mb-8" onClick={scrollToContact}>
                      {plan.cta}
                    </Button>

                    <ul className="space-y-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-primary" aria-hidden="true" />
                          </div>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </NeonGradientCard>
              ) : (
                <MagicCard className="p-8 rounded-2xl h-full" gradientColor="hsl(220, 14%, 96%)">
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mb-8" onClick={scrollToContact}>
                    {plan.cta}
                  </Button>

                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-primary" aria-hidden="true" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </MagicCard>
              )}
            </BlurFade>
          ))}
        </div>

        <BlurFade delay={0.5} inView>
          <p className="text-center mt-10 text-sm text-muted-foreground">
            Données sécurisées RGPD · Support réactif inclus · Hébergement européen
          </p>
        </BlurFade>
      </div>
    </section>
  );
};

import { Brain, Zap, Shield, Target } from "lucide-react";
import { motion } from "motion/react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";

const benefits = [
  {
    icon: Brain,
    title: "Analyse contextuelle",
    description: "Le moteur NLP comprend le sens des expériences, pas juste les mots-clés.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Zap,
    title: "Résultats en 30 secondes",
    description: "Scoring instantané, classement automatique, shortlist prête à l'emploi.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Target,
    title: "Matching multicritère",
    description: "Compétences, expérience, localisation, soft skills : tout est pondéré.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Shield,
    title: "100% RGPD conforme",
    description: "Données hébergées en Europe, chiffrées, droits garantis.",
    color: "bg-violet-50 text-violet-600",
  },
];

export const ValueProposition = () => {
  return (
    <section className="py-20 relative overflow-hidden" aria-labelledby="value-prop-title">
      <div className="container px-6 relative">
        <AnimatedSection className="max-w-2xl mx-auto text-center mb-14">
          <h2 id="value-prop-title" className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Pourquoi <span className="text-primary">Skillcruit</span> ?
          </h2>
          <p className="text-muted-foreground text-lg">
            La présélection conçue pour les recruteurs exigeants.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-xl bg-white border border-border/60 shadow-sm hover:shadow-md text-center h-full group transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl ${benefit.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

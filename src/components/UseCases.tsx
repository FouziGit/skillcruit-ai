import { Users, Briefcase, Building2, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";

const useCases = [
  {
    icon: Briefcase,
    title: "Cabinets de recrutement",
    description: "Traitez plus de missions en moins de temps. Scoring instantané pour vos clients.",
    benefit: "5x plus de mandats traités",
    iconColor: "bg-blue-50 text-blue-600",
  },
  {
    icon: Building2,
    title: "Équipes RH internes",
    description: "Libérez vos recruteurs du tri pour qu'ils se concentrent sur l'humain.",
    benefit: "80% de temps gagné sur le tri",
    iconColor: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Users,
    title: "Recrutement volume",
    description: "Campagnes massives, stages, alternances. Traitement rapide et équitable.",
    benefit: "1000 CV analysés en 10 min",
    iconColor: "bg-amber-50 text-amber-600",
  },
  {
    icon: Clock,
    title: "Postes urgents",
    description: "Shortlist qualifiée en quelques minutes. Time-to-hire divisé par 3.",
    benefit: "Premiers profils en 30 secondes",
    iconColor: "bg-rose-50 text-rose-600",
  },
];

export const UseCases = () => {
  return (
    <section className="py-24 md:py-32 section-light relative overflow-hidden" aria-labelledby="use-cases-title">
      <div className="container px-6 relative">
        <AnimatedSection className="max-w-2xl mx-auto text-center mb-16">
          <h2 id="use-cases-title" className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Cas d'usage <span className="text-primary">RH</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Skillcruit s'adapte à tous les contextes de recrutement.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto" staggerDelay={0.1}>
          {useCases.map((useCase, index) => (
            <StaggerItem key={index}>
              <motion.article
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-2xl bg-white border border-border/60 shadow-sm hover:shadow-md h-full group transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${useCase.iconColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <useCase.icon className="w-6 h-6" aria-hidden="true" />
                </div>

                <h3 className="font-semibold text-lg mb-2">{useCase.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{useCase.description}</p>

                <div className="pt-4 border-t border-border/50">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {useCase.benefit}
                  </span>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

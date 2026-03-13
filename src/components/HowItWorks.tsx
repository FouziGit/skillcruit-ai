import { Upload, Brain, ListChecks } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";

const steps = [
  {
    icon: Upload,
    step: "1",
    title: "Importez vos CV",
    description: "Drag & drop ou import depuis votre ATS. PDF, Word, tous formats acceptés.",
  },
  {
    icon: Brain,
    step: "2",
    title: "Analyse et scoring",
    description: "Le moteur NLP comprend le sens des expériences et génère un score objectif.",
  },
  {
    icon: ListChecks,
    step: "3",
    title: "Shortlist prête",
    description: "Top candidats classés avec résumés. Vous décidez qui rencontrer.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-24 md:py-32 section-light relative overflow-hidden" aria-labelledby="how-it-works-title">
      <div className="container px-6 relative">
        <AnimatedSection className="max-w-2xl mx-auto text-center mb-16">
          <h2 id="how-it-works-title" className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Comment ça <span className="text-primary">fonctionne</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            De l'import à la shortlist en 3 étapes simples.
          </p>
        </AnimatedSection>

        <div className="max-w-5xl mx-auto">
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {steps.map((item, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="relative p-8 rounded-2xl bg-white border border-border/60 shadow-sm hover:shadow-md text-center group transition-all duration-300"
                >
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-border" aria-hidden="true" />
                  )}

                  {/* Step number */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-2xl bg-primary text-white font-bold text-xl flex items-center justify-center mx-auto mb-6 shadow-md shadow-primary/20"
                  >
                    {item.step}
                  </motion.div>

                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>

                  <h3 className="font-semibold text-xl mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { ValueProposition } from "@/components/ValueProposition";
import { UseCases } from "@/components/UseCases";
import { Brain, Target, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SEOHead, softwareApplicationSchema, organizationSchema, faqSchema, productSchema } from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";

const faqs = [
  {
    question: "Comment Skillcruit évalue-t-il un CV ?",
    answer: "Notre moteur NLP comprend le sens des expériences, pas seulement les mots-clés. Il génère un score objectif basé sur vos critères personnalisés.",
  },
  {
    question: "Skillcruit est-il conforme au RGPD ?",
    answer: "Oui, 100% conforme. Données hébergées en Europe, chiffrées, avec droits d'accès et suppression garantis.",
  },
  {
    question: "Puis-je intégrer Skillcruit à mon ATS ?",
    answer: "Oui, via API avec les principaux ATS (Workday, Greenhouse, Lever). Import manuel ou email aussi disponible.",
  },
  {
    question: "Skillcruit remplace-t-il les recruteurs ?",
    answer: "Non, Skillcruit vous libère du tri répétitif pour vous concentrer sur l'humain : entretiens et décision finale.",
  },
];

const combinedJsonLd = [
  softwareApplicationSchema,
  productSchema,
  organizationSchema,
  faqSchema(faqs),
];

const features = [
  {
    icon: Brain,
    title: "Scoring intelligent",
    description: "Évaluation instantanée selon vos critères : compétences, expérience, localisation.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Target,
    title: "Matching dynamique",
    description: "L'algorithme suggère les meilleurs profils pour chaque offre d'emploi.",
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: FileText,
    title: "Résumé automatique",
    description: "Synthèse du parcours professionnel générée automatiquement en quelques secondes.",
    color: "bg-emerald-50 text-emerald-600",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Skillcruit - Présélection intelligente de CV | Recrutez mieux, plus vite"
        description="Analysez, scorez et classez vos candidatures en 30 secondes. Présélection intelligente pour recruteurs. Essai gratuit 14 jours, 100% RGPD."
        canonical="https://skillcruit.fr"
        jsonLd={combinedJsonLd}
      />

      <Navbar />
      <Hero />

      {/* Value Proposition */}
      <ValueProposition />

      {/* How it works */}
      <HowItWorks />

      {/* Features Section */}
      <section className="py-24 md:py-32 relative overflow-hidden" aria-labelledby="features-title">
        <div className="container px-6 relative">
          <AnimatedSection className="max-w-2xl mx-auto text-center mb-16">
            <h2 id="features-title" className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Automatisez votre présélection
            </h2>
            <p className="text-muted-foreground text-lg">
              Skillcruit analyse les CV avec le NLP pour des décisions plus rapides et objectives.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto" staggerDelay={0.15}>
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <motion.article
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 rounded-2xl bg-white border border-border/60 shadow-sm hover:shadow-md group h-full transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </motion.article>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection delay={0.4} className="text-center mt-12">
            <Button variant="outline" asChild className="group">
              <Link to="/technologie">
                Voir toutes les fonctionnalités
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Use Cases */}
      <UseCases />

      {/* Pricing */}
      <div id="pricing">
        <Pricing />
      </div>

      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;

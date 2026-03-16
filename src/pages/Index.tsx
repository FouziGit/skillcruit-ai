import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { Stats } from "@/components/Stats";
import { UseCases } from "@/components/UseCases";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SEOHead, softwareApplicationSchema, organizationSchema, faqSchema, productSchema } from "@/components/SEOHead";

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

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <SEOHead
        title="Skillcruit - Présélection intelligente de CV | Recrutez mieux, plus vite"
        description="Analysez, scorez et classez vos candidatures en 30 secondes. Présélection intelligente pour recruteurs. Essai gratuit 14 jours, 100% RGPD."
        canonical="https://skillcruit.app"
        jsonLd={combinedJsonLd}
      />

      <Navbar />
      <Hero />
      <FeaturesGrid />
      <Stats />
      <UseCases />

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

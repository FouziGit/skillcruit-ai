import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Brain, FileText, Target, BarChart3, Database, Filter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";

export default function Technology() {
  const features = [
    { icon: Brain, title: "Scoring NLP", desc: "Analyse sémantique des compétences et expériences" },
    { icon: FileText, title: "Résumé auto", desc: "Synthèse instantanée du parcours professionnel" },
    { icon: Target, title: "Matching", desc: "Suggestion automatique des meilleurs profils" },
    { icon: BarChart3, title: "Classement", desc: "Tri multicritère en temps réel" },
    { icon: Database, title: "Talent pool", desc: "Base évolutive avec apprentissage continu" },
    { icon: Filter, title: "Filtres avancés", desc: "Recherche par compétences, secteur, langues" },
  ];

  const steps = [
    { num: "1", title: "Définissez vos critères", desc: "Compétences, expérience, localisation, salaire" },
    { num: "2", title: "Analyse automatique", desc: "Scoring de chaque candidature en quelques secondes" },
    { num: "3", title: "Shortlist prête", desc: "Top candidats classés avec résumés" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Technologie NLP - Skillcruit | Analyse sémantique de CV"
        description="Découvrez notre moteur de présélection : scoring NLP, matching intelligent, résumés automatiques. Technologie made in France, 100% RGPD."
        canonical="https://skillcruit.app/technologie"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Technologie NLP Skillcruit",
          "description": "Moteur de présélection : scoring NLP, matching intelligent, résumés automatiques.",
          "url": "https://skillcruit.app/technologie",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://skillcruit.app" },
              { "@type": "ListItem", "position": 2, "name": "Technologie", "item": "https://skillcruit.app/technologie" },
            ],
          },
        }}
      />
      
      <Navbar />
      
      <main className="pt-16">
        {/* Hero */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_-10%,hsl(199_100%_50%_/_0.08),transparent)]" aria-hidden="true" />
          
          <div className="container relative z-10 px-6">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Notre <span className="text-gradient">technologie</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Skillcruit utilise le traitement du langage naturel pour analyser les CV en profondeur 
                et attribuer un score de compatibilité intelligent.
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 border-t border-border/50" aria-labelledby="how-it-works">
          <div className="container px-6">
            <h2 id="how-it-works" className="text-2xl md:text-3xl font-bold text-center mb-12">Comment ça fonctionne</h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6">
                {steps.map((step, i) => (
                  <article key={i} className="p-6 rounded-lg glass-card text-center">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center mx-auto mb-4">
                      {step.num}
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features grid */}
        <section className="py-16 bg-card/30 border-y border-border/50" aria-labelledby="features-title">
          <div className="container px-6">
            <h2 id="features-title" className="text-2xl md:text-3xl font-bold text-center mb-12">Fonctionnalités</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {features.map((f, i) => (
                <article key={i} className="p-5 rounded-lg glass-card hover:border-primary/30 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <f.icon className="w-4 h-4 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{f.title}</h3>
                      <p className="text-sm text-muted-foreground">{f.desc}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20" aria-labelledby="cta-title">
          <div className="container px-6">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 id="cta-title" className="text-2xl md:text-3xl font-bold">Prêt à tester ?</h2>
              <p className="text-muted-foreground">Découvrez Skillcruit en action avec une démo personnalisée.</p>
              <Button 
                size="lg" 
                className="group"
                onClick={() => window.location.href = "/#contact"}
              >
                Demander une démo
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Target, Users, Lightbulb, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";

export default function AboutPage() {
  const values = [
    { icon: Lightbulb, title: "Innovation", desc: "Technologie de pointe" },
    { icon: Shield, title: "Transparence", desc: "Process auditable" },
    { icon: Target, title: "Performance", desc: "Résultats mesurables" },
    { icon: Users, title: "Équité", desc: "Neutralité garantie" },
  ];

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <SEOHead
        title="À Propos de Skillcruit | Notre Mission IA & Recrutement"
        description="Notre mission : rendre le recrutement plus rapide, fiable et juste. Découvrez l'équipe et les valeurs derrière Skillcruit."
        canonical="https://skillcruit.app/a-propos"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "À propos de Skillcruit",
          "description": "Notre mission : rendre le recrutement plus rapide, fiable et juste.",
          "url": "https://skillcruit.app/a-propos",
          "mainEntity": {
            "@type": "Organization",
            "name": "Skillcruit",
            "url": "https://skillcruit.app",
            "description": "Présélection intelligente de candidats par NLP",
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://skillcruit.app" },
              { "@type": "ListItem", "position": 2, "name": "À propos", "item": "https://skillcruit.app/a-propos" },
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Notre <span className="text-gradient">mission</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Skillcruit est né d'un constat : les recruteurs perdent trop de temps à trier des CV.
                Notre IA rend cette étape plus rapide, fiable et juste.
              </p>
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="py-16" aria-labelledby="vision-title">
          <div className="container px-6">
            <h2 id="vision-title" className="sr-only">Notre vision et engagement</h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              <article className="p-6 rounded-lg glass-card">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold mb-3">Vision</h3>
                <p className="text-muted-foreground">
                  Devenir le copilote IA des RH et transformer le marché du recrutement 
                  en rendant la présélection plus efficace et équitable.
                </p>
              </article>
              
              <article className="p-6 rounded-lg glass-card">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold mb-3">Engagement</h3>
                <p className="text-muted-foreground">
                  Libérer du temps pour l'humain en automatisant les tâches répétitives, 
                  avec une évaluation objective et transparente.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16" aria-labelledby="values-title">
          <div className="container px-6">
            <h2 id="values-title" className="text-2xl md:text-3xl font-bold text-center mb-12">Nos valeurs</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {values.map((v, i) => (
                <article key={i} className="p-5 rounded-lg glass-card text-center">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <v.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold mb-1">{v.title}</h3>
                  <p className="text-xs text-muted-foreground">{v.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20" aria-labelledby="cta-about">
          <div className="container px-6">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 id="cta-about" className="text-2xl md:text-3xl font-bold">Rejoignez les innovateurs</h2>
              <p className="text-muted-foreground">Découvrez comment Skillcruit transforme le recrutement.</p>
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

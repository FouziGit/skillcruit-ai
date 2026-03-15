import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, Lock, Server, FileCheck, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";

export default function Compliance() {
  const features = [
    { icon: Server, title: "Hébergement EU", desc: "Serveurs européens certifiés" },
    { icon: Lock, title: "Chiffrement", desc: "SSL/TLS + AES-256 au repos" },
    { icon: FileCheck, title: "RGPD", desc: "Conformité totale garantie" },
    { icon: Shield, title: "Auditabilité", desc: "Logs et traçabilité complète" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Conformité RGPD & Sécurité - Skillcruit | Données Protégées"
        description="Vos données RH protégées : hébergement européen, chiffrement AES-256, conformité RGPD garantie. Audits et traçabilité complète."
        canonical="https://skillcruit.app/conformite"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Conformité RGPD & Sécurité Skillcruit",
          "description": "Hébergement européen, chiffrement AES-256, conformité RGPD garantie.",
          "url": "https://skillcruit.app/conformite",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://skillcruit.app" },
              { "@type": "ListItem", "position": 2, "name": "Conformité", "item": "https://skillcruit.app/conformite" },
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
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-primary" aria-hidden="true" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Vos données, <span className="text-gradient">protégées</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Hébergement en Europe, conformité RGPD et sécurité maximale 
                garantis par Mammouth.ai.
              </p>
            </div>
          </div>
        </section>

        {/* Security features */}
        <section className="py-16 border-t border-border/50" aria-labelledby="security-features">
          <div className="container px-6">
            <h2 id="security-features" className="sr-only">Fonctionnalités de sécurité</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {features.map((f, i) => (
                <article key={i} className="p-5 rounded-lg glass-card text-center">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <f.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* RGPD Details */}
        <section className="py-16 bg-card/30 border-y border-border/50" aria-labelledby="rgpd-details">
          <div className="container px-6">
            <div className="max-w-3xl mx-auto">
              <div className="p-6 rounded-lg glass-card border-primary/20">
                <h2 id="rgpd-details" className="text-xl font-bold mb-4">Conformité RGPD</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" aria-hidden="true" />
                    <span>Consentement explicite pour toute collecte</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" aria-hidden="true" />
                    <span>Droits d'accès, rectification et effacement garantis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" aria-hidden="true" />
                    <span>Portabilité des données à tout moment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" aria-hidden="true" />
                    <span>Suppression automatique 30 jours après résiliation</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-6 p-6 rounded-lg glass-card">
                <h3 className="font-semibold mb-3">Technologie Mammouth.ai</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Skillcruit s'appuie sur l'infrastructure sécurisée de Mammouth.ai 
                  pour garantir la conformité RGPD et la sécurité des données.
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open("https://info.mammouth.ai/fr/docs/privacy-policy/", "_blank")}
                >
                  Politique de confidentialité
                  <ExternalLink className="w-3 h-3 ml-1" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20" aria-labelledby="contact-cta">
          <div className="container px-6">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 id="contact-cta" className="text-2xl md:text-3xl font-bold">Questions sur la sécurité ?</h2>
              <p className="text-muted-foreground">Notre équipe répond à toutes vos questions RGPD.</p>
              <Button 
                size="lg"
                className="group"
                onClick={() => window.location.href = "/#contact"}
              >
                Nous contacter
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

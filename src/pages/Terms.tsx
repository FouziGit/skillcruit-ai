import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Conditions Générales d'Utilisation - Skillcruit"
        description="CGU de Skillcruit : conditions d'utilisation du service SaaS de présélection IA, tarification, responsabilités."
        canonical="https://skillcruit.fr/cgu"
      />
      
      <Navbar />
      
      <main className="pt-16">
        <article className="container px-6 py-20 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Conditions Générales d'Utilisation</h1>
          
          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Objet</h2>
              <p>
                Les présentes CGU régissent l'utilisation de la plateforme Skillcruit, 
                service SaaS de présélection de candidatures par intelligence artificielle.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Description du service</h2>
              <p>
                Skillcruit propose une solution d'analyse et de scoring automatique des CV, 
                incluant le matching intelligent, les résumés automatiques et le classement multicritère.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Obligations utilisateur</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Fournir des informations exactes</li>
                <li>Respecter la confidentialité des accès</li>
                <li>Utiliser le service conformément à sa destination</li>
                <li>Respecter les droits des candidats</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Tarification</h2>
              <p>
                Les tarifs sont indiqués sur le site. Facturation mensuelle ou annuelle selon le plan choisi. 
                Résiliation possible à tout moment, sans frais.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Responsabilité</h2>
              <p>
                Skillcruit fournit un outil d'aide à la décision. La décision finale de recrutement 
                reste de la responsabilité exclusive de l'utilisateur.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Droit applicable</h2>
              <p>
                Les présentes CGU sont régies par le droit français. 
                Tout litige sera soumis aux tribunaux compétents de Paris.
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

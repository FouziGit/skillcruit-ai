import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Politique de Confidentialité - Skillcruit"
        description="Découvrez comment Skillcruit protège vos données personnelles. Conformité RGPD, droits d'accès, hébergement européen."
        canonical="https://skillcruit.fr/politique-confidentialite"
      />
      
      <Navbar />
      
      <main className="pt-16">
        <article className="container px-6 py-20 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Politique de confidentialité</h1>
          
          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Collecte des données</h2>
              <p>
                Skillcruit collecte les données nécessaires au service : nom, email, entreprise, CV des candidats. 
                Ces données sont collectées avec votre consentement explicite.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Utilisation</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Fournir le service de présélection IA</li>
                <li>Améliorer nos algorithmes</li>
                <li>Communiquer sur votre compte</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Protection</h2>
              <p>
                Données chiffrées en transit et au repos. Hébergement en Europe sur serveurs conformes ISO 27001. 
                Nous ne vendons jamais vos données.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Vos droits RGPD</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Droit d'accès à vos données</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement</li>
                <li>Droit à la portabilité</li>
              </ul>
              <p className="mt-3">Contact : privacy@skillcruit.fr</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Conservation</h2>
              <p>
                Données conservées pendant la durée de l'abonnement + 30 jours après résiliation. 
                Suppression sur demande à tout moment.
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

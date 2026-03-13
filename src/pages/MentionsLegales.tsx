import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Mentions Légales - Skillcruit"
        description="Mentions légales de Skillcruit : informations sur l'éditeur, hébergement, propriété intellectuelle et données personnelles."
        canonical="https://skillcruit.app/mentions-legales"
      />
      
      <Navbar />
      
      <main className="pt-16">
        <article className="container px-6 py-20 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Mentions légales</h1>
          
          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Éditeur du site</h2>
              <p>Skillcruit</p>
              <p>Forme juridique : Entrepreneur individuel</p>
              <p>SIREN : 899 453 401</p>
              <p>SIRET (siège) : 899 453 401 00015</p>
              <p>Numéro de TVA : FR53899453401</p>
              <p>Inscription au RCS : Non inscrit</p>
              <p>Inscription au RNE : Inscrit (le 17/05/2021)</p>
              <p>Email : contact@skillcruit.app</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Hébergement</h2>
              <p>Serveurs hébergés en Europe, conformes aux normes RGPD.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Propriété intellectuelle</h2>
              <p>
                L'ensemble des contenus présents sur ce site sont protégés par le droit d'auteur. 
                Toute reproduction est interdite sans autorisation préalable.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Données personnelles</h2>
              <p>
                Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression 
                de vos données. Contact : contact@skillcruit.app
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

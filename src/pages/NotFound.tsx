import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SEOHead
        title="Page Non Trouvée - Skillcruit"
        description="Cette page n'existe pas. Retournez à l'accueil de Skillcruit."
      />
      
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center pt-16">
        <div className="container px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-gradient mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8">Page non trouvée</p>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;

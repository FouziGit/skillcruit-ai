import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { blogPosts } from "@/data/blog-posts";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section";

const categories = [
  { label: "Guides", tags: ["Guide", "RH", "Recrutement"] },
  { label: "Technologie", tags: ["NLP", "Scoring", "Technologie", "IA", "ATS"] },
  { label: "Conformité", tags: ["RGPD", "Conformité", "Données", "Légal"] },
  { label: "Performance", tags: ["Time-to-hire", "Performance", "KPI", "Tableau de bord"] },
  { label: "Stratégie RH", tags: ["Vivier", "Sourcing", "Rétention", "Onboarding", "Volume", "Diversité"] },
  { label: "Candidats", tags: ["Expérience candidat", "Marque employeur", "Offre d'emploi", "Biais"] },
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPosts = activeCategory
    ? blogPosts.filter(post => {
        const cat = categories.find(c => c.label === activeCategory);
        return cat && post.tags.some(tag => cat.tags.includes(tag));
      })
    : blogPosts;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Blog Skillcruit - Recrutement, scoring et bonnes pratiques RH"
        description="Découvrez nos articles sur le recrutement moderne, le scoring de CV, la conformité RGPD et les bonnes pratiques RH."
        canonical="https://skillcruit.fr/blog"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Blog Skillcruit",
          "description": "Articles sur le recrutement moderne et la présélection intelligente",
          "url": "https://skillcruit.fr/blog",
          "publisher": {
            "@type": "Organization",
            "name": "Skillcruit",
            "url": "https://skillcruit.fr",
          },
        }}
      />

      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container px-6">
          <AnimatedSection className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Blog <span className="text-primary">Skillcruit</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Ressources et conseils pour recruter plus efficacement.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Category filter */}
      <section className="pb-8">
        <div className="container px-6">
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant={activeCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(null)}
              className="rounded-full"
            >
              Tous
            </Button>
            {categories.map(cat => (
              <Button
                key={cat.label}
                variant={activeCategory === cat.label ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat.label)}
                className="rounded-full"
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="pb-24">
        <div className="container px-6">
          <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {filteredPosts.map((post) => (
              <StaggerItem key={post.slug}>
                <motion.article
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl border border-border/60 shadow-sm hover:shadow-md overflow-hidden transition-all duration-300 h-full flex flex-col"
                >
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 rounded-full bg-primary/5 text-primary text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h2 className="text-xl font-bold mb-3 leading-tight">
                      <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed flex-1">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(post.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime}
                        </span>
                      </div>

                      <Link to={`/blog/${post.slug}`} className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                        Lire
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;

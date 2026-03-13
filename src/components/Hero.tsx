import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Clock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16 bg-gradient-to-b from-slate-50 to-white" aria-labelledby="hero-title">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_hsl(220_90%_50%_/_0.04)_1px,_transparent_0)] bg-[size:32px_32px]" aria-hidden="true" />

      <div className="container relative z-10 px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/15 text-sm font-medium text-primary"
          >
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            Présélection intelligente de candidats
          </motion.div>

          {/* Headline */}
          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-balance text-foreground"
          >
            Recrutez les bons profils,
            <br />
            <span className="text-primary">plus vite</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Analysez, scorez et hiérarchisez vos candidatures en quelques secondes.
            Scoring intelligent, matching automatique, conformité RGPD.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="group text-base px-8 shadow-lg shadow-primary/20" onClick={scrollToContact}>
              Demander une démo
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>
            <Button variant="outline" size="lg" asChild className="text-base px-8">
              <Link to="/demo">
                Voir la démo interactive
              </Link>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 pt-8"
          >
            {[
              { icon: Clock, text: "Essai gratuit 14 jours" },
              { icon: Shield, text: "RGPD conforme" },
              { icon: Zap, text: "Résultats en 30 sec" },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border text-sm text-muted-foreground shadow-sm"
              >
                <item.icon className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

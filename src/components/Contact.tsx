import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, Loader2, CheckCircle2 } from "lucide-react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/animated-section";
import { toast } from "sonner";

export const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    companySize: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'envoi");
      }

      setIsSent(true);
      toast.success("Message envoyé avec succès !");
      setFormData({ name: "", company: "", email: "", phone: "", companySize: "", message: "" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur lors de l'envoi. Veuillez réessayer ou contacter contact@skillcruit.app.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden" aria-labelledby="contact-title">
      <div className="container px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left - Info */}
            <AnimatedSection direction="right">
              <div className="space-y-8">
                <div>
                  <h2 id="contact-title" className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                    Demandez une <span className="text-primary">démo</span>
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    30 minutes pour découvrir comment Skillcruit peut transformer votre recrutement.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-border/60 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="font-semibold">Email</div>
                      <a href="mailto:contact@skillcruit.app" className="text-primary hover:underline transition-colors">
                        contact@skillcruit.app
                      </a>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Réponse sous 24h · Démo personnalisée · Sans engagement
                  </p>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-3">
                  {["Essai 14 jours", "Sans CB", "100% RGPD"].map((badge, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full bg-white border border-border text-sm text-muted-foreground shadow-sm"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Right - Form */}
            <AnimatedSection direction="left" delay={0.1}>
              {isSent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-white border border-border/60 shadow-sm text-center space-y-4"
                >
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                  <h3 className="text-xl font-semibold">Message envoyé !</h3>
                  <p className="text-muted-foreground">Nous vous répondrons dans les 24 heures.</p>
                  <Button variant="outline" onClick={() => setIsSent(false)}>
                    Envoyer un autre message
                  </Button>
                </motion.div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="p-8 rounded-2xl bg-white border border-border/60 shadow-sm space-y-5"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Nom *</label>
                      <Input
                        id="name"
                        placeholder="Jean Dupont"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium">Entreprise *</label>
                      <Input
                        id="company"
                        placeholder="Votre société"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email *</label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="jean@entreprise.fr"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">Téléphone</label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="06 12 34 56 78"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="companySize" className="text-sm font-medium">Taille d'entreprise</label>
                    <select
                      id="companySize"
                      value={formData.companySize}
                      onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">Sélectionner...</option>
                      <option value="1-10">1-10 employés</option>
                      <option value="11-50">11-50 employés</option>
                      <option value="51-200">51-200 employés</option>
                      <option value="201-500">201-500 employés</option>
                      <option value="500+">500+ employés</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea
                      id="message"
                      placeholder="Parlez-nous de vos besoins en recrutement..."
                      rows={4}
                      className="resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <Button type="submit" className="w-full group text-base py-6 shadow-md shadow-primary/20" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" aria-hidden="true" />
                        Envoyer
                      </>
                    )}
                  </Button>
                </form>
              )}
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

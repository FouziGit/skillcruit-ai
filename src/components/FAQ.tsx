import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BlurFade } from "@/components/ui/blur-fade";

const faqs = [
  {
    question: "Comment Skillcruit évalue-t-il un CV ?",
    answer: "Notre moteur NLP comprend le sens des expériences, pas seulement les mots-clés. Il génère un score objectif basé sur vos critères personnalisés.",
  },
  {
    question: "Skillcruit est-il conforme au RGPD ?",
    answer: "Oui, 100% conforme. Données hébergées en Europe, chiffrées, avec droits d'accès et suppression garantis.",
  },
  {
    question: "Puis-je intégrer Skillcruit à mon ATS ?",
    answer: "Oui, via API avec les principaux ATS (Workday, Greenhouse, Lever). Import manuel ou email aussi disponible.",
  },
  {
    question: "Skillcruit remplace-t-il les recruteurs ?",
    answer: "Non, Skillcruit vous libère du tri répétitif pour vous concentrer sur l'humain : entretiens et décision finale.",
  },
  {
    question: "Combien de temps faut-il pour configurer Skillcruit ?",
    answer: "Moins de 5 minutes. Créez votre compte, définissez vos critères de poste, et commencez à importer vos CV immédiatement.",
  },
  {
    question: "Quels formats de CV sont acceptés ?",
    answer: "Skillcruit accepte les formats PDF, Word (.doc, .docx), et texte. L'import est possible par drag & drop, email forwarding ou via API depuis votre ATS.",
  },
];

export const FAQ = () => {
  return (
    <section className="py-24 md:py-32 section-light relative overflow-hidden" aria-labelledby="faq-title">
      <div className="container px-6 relative">
        <BlurFade delay={0} inView>
          <div className="max-w-2xl mx-auto text-center mb-14">
            <h2 id="faq-title" className="text-3xl md:text-4xl font-bold text-balance">Questions fréquentes</h2>
          </div>
        </BlurFade>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <BlurFade key={index} delay={0.05 + index * 0.08} inView>
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-white rounded-xl px-6 border border-border/60 shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline py-5 text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </BlurFade>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export { faqs };

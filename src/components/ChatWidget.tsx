import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const quickReplies = [
  { label: "Comment ça marche ?", response: "Skillcruit analyse vos CV en 3 étapes : 1) Importez vos CV (PDF, Word), 2) Le moteur NLP analyse et score chaque candidat, 3) Recevez votre shortlist classée en quelques secondes." },
  { label: "Tarifs", response: "Nous proposons 3 formules : Essai gratuit (14 jours, 50 CV), Start-up (299€/mois, 500 CV), et Entreprise (sur devis, illimité). Sans engagement !" },
  { label: "RGPD ?", response: "Skillcruit est 100% conforme RGPD. Données hébergées en Europe, chiffrées, avec droit d'accès et suppression garantis. Notre page Conformité détaille toutes nos mesures." },
  { label: "Intégration ATS", response: "Oui ! Skillcruit s'intègre via API avec les principaux ATS (Workday, Greenhouse, Lever). L'import par email et drag & drop est aussi disponible." },
];

const fallbackResponse = "Merci pour votre question ! Pour une réponse personnalisée, contactez-nous à contact@skillcruit.app ou demandez une démo via notre formulaire de contact.";

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: "Bonjour ! Je suis l'assistant Skillcruit. Comment puis-je vous aider ?", isBot: true },
  ]);
  const [input, setInput] = useState("");

  const addMessage = (text: string, isBot: boolean) => {
    setMessages(prev => [...prev, { id: Date.now(), text, isBot }]);
  };

  const handleQuickReply = (reply: typeof quickReplies[0]) => {
    addMessage(reply.label, false);
    setTimeout(() => addMessage(reply.response, true), 500);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setInput("");
    addMessage(userMessage, false);

    const matchedReply = quickReplies.find(r =>
      userMessage.toLowerCase().includes(r.label.toLowerCase().replace("?", "").replace(" ?", ""))
    );

    setTimeout(() => {
      addMessage(matchedReply ? matchedReply.response : fallbackResponse, true);
    }, 600);
  };

  return (
    <>
      {/* Chat bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-white shadow-lg shadow-primary/25 flex items-center justify-center"
            aria-label="Ouvrir le chat"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-xl border border-border/60 flex flex-col overflow-hidden"
            style={{ height: "500px", maxHeight: "calc(100vh - 6rem)" }}
          >
            {/* Header */}
            <div className="px-5 py-4 bg-primary text-white flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Assistant Skillcruit</div>
                  <div className="text-xs text-blue-100">En ligne</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-lg transition-colors" aria-label="Fermer le chat">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.isBot ? "" : "flex-row-reverse"}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.isBot ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-500"
                  }`}>
                    {msg.isBot ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                  </div>
                  <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.isBot
                      ? "bg-slate-50 text-foreground rounded-tl-md"
                      : "bg-primary text-white rounded-tr-md"
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Quick replies */}
              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {quickReplies.map((reply, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickReply(reply)}
                      className="px-3 py-1.5 rounded-full border border-primary/20 text-xs font-medium text-primary hover:bg-primary/5 transition-colors"
                    >
                      {reply.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border flex-shrink-0">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tapez votre message..."
                  className="text-sm"
                />
                <Button type="submit" size="icon" className="flex-shrink-0">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

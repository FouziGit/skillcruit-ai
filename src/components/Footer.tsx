import { Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { BlurFade } from "@/components/ui/blur-fade";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 relative" role="contentinfo">

      <div className="container px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* Logo */}
          <BlurFade delay={0} inView>
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="inline-block mb-4" aria-label="Skillcruit - Accueil">
                <span className="text-xl font-bold">
                  <span className="text-white">Skill</span>
                  <span className="text-blue-400">cruit</span>
                </span>
              </Link>
              <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                L'IA qui réinvente la présélection.
              </p>
              <a
                href="mailto:contact@skillcruit.app"
                className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                contact@skillcruit.app
              </a>
            </div>
          </BlurFade>

          {/* Product */}
          <BlurFade delay={0.05} inView>
            <nav aria-label="Produit">
              <h2 className="font-semibold text-white mb-4">Produit</h2>
              <ul className="space-y-3 text-sm">
                {[
                  { to: "/technologie", label: "Technologie" },
                  { to: "/demo", label: "Démo" },
                  { to: "/#pricing", label: "Tarifs", external: true },
                ].map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a href={link.to} className="hover:text-white transition-colors">{link.label}</a>
                    ) : (
                      <Link to={link.to} className="hover:text-white transition-colors">{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </BlurFade>

          {/* Entreprise */}
          <BlurFade delay={0.1} inView>
            <nav aria-label="Entreprise">
              <h2 className="font-semibold text-white mb-4">Entreprise</h2>
              <ul className="space-y-3 text-sm">
                {[
                  { to: "/a-propos", label: "À propos" },
                  { to: "/blog", label: "Blog" },
                  { to: "/conformite", label: "Conformité" },
                  { to: "/#contact", label: "Contact", external: true },
                ].map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a href={link.to} className="hover:text-white transition-colors">{link.label}</a>
                    ) : (
                      <Link to={link.to} className="hover:text-white transition-colors">{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </BlurFade>

          {/* Légal */}
          <BlurFade delay={0.15} inView>
            <nav aria-label="Légal">
              <h2 className="font-semibold text-white mb-4">Légal</h2>
              <ul className="space-y-3 text-sm">
                {[
                  { to: "/mentions-legales", label: "Mentions légales" },
                  { to: "/politique-confidentialite", label: "Confidentialité" },
                  { to: "/cgu", label: "CGU" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="hover:text-white transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </BlurFade>

          {/* Ressources */}
          <BlurFade delay={0.2} inView>
            <nav aria-label="Ressources">
              <h2 className="font-semibold text-white mb-4">Ressources</h2>
              <ul className="space-y-3 text-sm">
                <li><Link to="/blog" className="hover:text-white transition-colors">Articles</Link></li>
                <li><a href="/#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </nav>
          </BlurFade>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Skillcruit. Tous droits réservés.
          </p>

          <a
            href="https://linkedin.com/company/skillcruit"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 transition-all text-slate-400 hover:text-white"
            aria-label="Suivez-nous sur LinkedIn"
          >
            <Linkedin className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
};

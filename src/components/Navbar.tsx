import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Accueil", path: "/" },
    { name: "Technologie", path: "/technologie" },
    { name: "À propos", path: "/a-propos" },
    { name: "Blog", path: "/blog" },
    { name: "Démo", path: "/demo" },
    { name: "Conformité", path: "/conformite" },
  ];

  const scrollToContact = () => {
    if (location.pathname !== "/") {
      window.location.href = "/#contact";
    } else {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-white/80 backdrop-blur-sm"
        }`}
        role="navigation"
        aria-label="Navigation principale"
      >
        <div className="container px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-xl font-bold tracking-tight group" aria-label="Skillcruit - Accueil">
              <span className="text-foreground">Skill</span>
              <span className="text-primary group-hover:opacity-80 transition-opacity">cruit</span>
            </Link>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-current={location.pathname === link.path ? "page" : undefined}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-primary/5 rounded-lg -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="hidden md:block">
              {user ? (
                <Button size="sm" onClick={() => navigate('/dashboard')}>
                  <User className="w-4 h-4 mr-1" />
                  {profile?.full_name?.split(' ')[0] || 'Dashboard'}
                </Button>
              ) : (
                <Button size="sm" onClick={() => navigate('/connexion')}>
                  <LogIn className="w-4 h-4 mr-1" />
                  Se connecter
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </motion.button>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden"
              >
                <div className="py-4 space-y-1 border-t border-border">
                  {links.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                          location.pathname === link.path
                            ? "text-primary bg-primary/5"
                            : "text-muted-foreground hover:text-foreground hover:bg-slate-50"
                        }`}
                        aria-current={location.pathname === link.path ? "page" : undefined}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    className="pt-3 space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {user ? (
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => { setIsOpen(false); navigate('/dashboard'); }}
                      >
                        <User className="w-4 h-4 mr-1" />
                        Mon Dashboard
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => { setIsOpen(false); navigate('/connexion'); }}
                      >
                        <LogIn className="w-4 h-4 mr-1" />
                        Se connecter
                      </Button>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </header>
  );
};

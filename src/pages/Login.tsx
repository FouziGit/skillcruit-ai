import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'motion/react';
import { LogIn, Mail, Lock, AlertCircle, Building2, Briefcase, ArrowLeft } from 'lucide-react';

const Login = () => {
  const [step, setStep] = useState<'choice' | 'form'>('choice');
  const [selectedRole, setSelectedRole] = useState<'recruiter' | 'candidate'>('candidate');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(email, password, selectedRole);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message === 'Invalid login credentials'
        ? 'Email ou mot de passe incorrect'
        : 'Une erreur est survenue. Réessayez.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] pt-20 pb-10">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md mx-4"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-border p-8">
            {step === 'choice' ? (
              <>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-4">
                    <LogIn className="w-7 h-7 text-primary" />
                  </div>
                  <h1 className="text-2xl font-bold text-foreground">Se connecter</h1>
                  <p className="text-sm text-muted-foreground mt-1">Je suis...</p>
                </div>

                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setSelectedRole('recruiter'); setStep('form'); }}
                    className="w-full p-6 rounded-xl border-2 border-border hover:border-primary transition-colors text-left group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                        <Building2 className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">RH / Recruteur</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Gérez vos campagnes et analysez des CV
                        </p>
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setSelectedRole('candidate'); setStep('form'); }}
                    className="w-full p-6 rounded-xl border-2 border-border hover:border-primary transition-colors text-left group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-green-50 group-hover:bg-green-100 transition-colors">
                        <Briefcase className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">Candidat</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Postulez et suivez vos candidatures
                        </p>
                      </div>
                    </div>
                  </motion.button>
                </div>

                <p className="text-center text-sm text-muted-foreground mt-6">
                  Pas encore de compte ?{' '}
                  <Link to="/inscription" className="text-primary font-medium hover:underline">
                    Créer un compte
                  </Link>
                </p>
              </>
            ) : (
              <>
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 ${
                    selectedRole === 'recruiter' ? 'bg-blue-50' : 'bg-green-50'
                  }`}>
                    {selectedRole === 'recruiter' ? (
                      <Building2 className="w-7 h-7 text-blue-600" />
                    ) : (
                      <Briefcase className="w-7 h-7 text-green-600" />
                    )}
                  </div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Connexion {selectedRole === 'recruiter' ? 'RH' : 'Candidat'}
                  </h1>
                  <button
                    onClick={() => setStep('choice')}
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-1"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    Changer de profil
                  </button>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 mb-6 rounded-lg bg-destructive/10 text-destructive text-sm"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative mt-1.5">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="vous@exemple.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password">Mot de passe</Label>
                    <div className="relative mt-1.5">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      'Se connecter'
                    )}
                  </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground mt-6">
                  Pas encore de compte ?{' '}
                  <Link to="/inscription" className="text-primary font-medium hover:underline">
                    Créer un compte
                  </Link>
                </p>
              </>
            )}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'motion/react';
import { UserPlus, Mail, Lock, User, Building2, Briefcase, AlertCircle, CheckCircle } from 'lucide-react';

const Register = () => {
  const [step, setStep] = useState<'role' | 'form'>('role');
  const [role, setRole] = useState<'recruiter' | 'candidate'>('candidate');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signUp(email, password, fullName, role);
      setSuccess(true);
    } catch (err: any) {
      console.error('SignUp error:', err);
      if (err.message?.includes('already registered') || err.message?.includes('already been registered')) {
        setError('Cet email est déjà utilisé.');
      } else if (err.message?.includes('Password') || err.message?.includes('password')) {
        setError('Le mot de passe doit contenir au moins 6 caractères.');
      } else if (err.message?.includes('rate limit') || err.message?.includes('email rate limit')) {
        setError('Trop de tentatives. Réessayez dans quelques minutes.');
      } else if (err.message?.includes('not authorized') || err.message?.includes('Signups not allowed')) {
        setError('Les inscriptions ne sont pas activées. Contactez l\'administrateur.');
      } else {
        setError(err.message || 'Une erreur est survenue. Réessayez.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] pt-20 pb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md mx-4"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-border p-8 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-green-100 mb-4">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Compte créé !</h2>
              <p className="text-muted-foreground mt-2">
                Vérifiez votre email pour confirmer votre inscription, puis connectez-vous.
              </p>
              <Button className="mt-6" onClick={() => navigate('/connexion')}>
                Se connecter
              </Button>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-4"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-border p-8">
            {step === 'role' ? (
              <>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-4">
                    <UserPlus className="w-7 h-7 text-primary" />
                  </div>
                  <h1 className="text-2xl font-bold text-foreground">Créer un compte</h1>
                  <p className="text-sm text-muted-foreground mt-1">Choisissez votre profil</p>
                </div>

                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setRole('recruiter'); setStep('form'); }}
                    className="w-full p-6 rounded-xl border-2 border-border hover:border-primary transition-colors text-left group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                        <Building2 className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">Recruteur / RH</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Créez des campagnes, analysez des CV avec l'IA et gérez vos recrutements
                        </p>
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setRole('candidate'); setStep('form'); }}
                    className="w-full p-6 rounded-xl border-2 border-border hover:border-primary transition-colors text-left group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-green-50 group-hover:bg-green-100 transition-colors">
                        <Briefcase className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">Candidat</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Postulez aux offres, suivez vos candidatures et recevez des feedbacks IA
                        </p>
                      </div>
                    </div>
                  </motion.button>
                </div>

                <p className="text-center text-sm text-muted-foreground mt-6">
                  Déjà un compte ?{' '}
                  <Link to="/connexion" className="text-primary font-medium hover:underline">
                    Se connecter
                  </Link>
                </p>
              </>
            ) : (
              <>
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 ${
                    role === 'recruiter' ? 'bg-blue-50' : 'bg-green-50'
                  }`}>
                    {role === 'recruiter' ? (
                      <Building2 className="w-7 h-7 text-blue-600" />
                    ) : (
                      <Briefcase className="w-7 h-7 text-green-600" />
                    )}
                  </div>
                  <h1 className="text-2xl font-bold text-foreground">
                    {role === 'recruiter' ? 'Compte Recruteur' : 'Compte Candidat'}
                  </h1>
                  <button
                    onClick={() => setStep('role')}
                    className="text-sm text-primary hover:underline mt-1"
                  >
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
                    <Label htmlFor="fullName">Nom complet</Label>
                    <div className="relative mt-1.5">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Jean Dupont"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

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
                        placeholder="Min. 6 caractères"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        minLength={6}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      'Créer mon compte'
                    )}
                  </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground mt-6">
                  Déjà un compte ?{' '}
                  <Link to="/connexion" className="text-primary font-medium hover:underline">
                    Se connecter
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

export default Register;

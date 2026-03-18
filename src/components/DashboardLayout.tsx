import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import {
  LayoutDashboard, Briefcase, Users, Calendar, Bell, Settings, LogOut, ChevronLeft,
  FileText, BarChart3, User
} from 'lucide-react';

const recruiterLinks = [
  { name: 'Tableau de bord', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Campagnes', path: '/dashboard/campagnes', icon: Briefcase },
  { name: 'Candidatures', path: '/dashboard/candidatures', icon: Users },
  { name: 'Entretiens', path: '/dashboard/entretiens', icon: Calendar },
  { name: 'Notifications', path: '/dashboard/notifications', icon: Bell },
  { name: 'Paramètres', path: '/dashboard/parametres', icon: Settings },
];

const candidateLinks = [
  { name: 'Tableau de bord', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Offres', path: '/dashboard/offres', icon: Briefcase },
  { name: 'Mes candidatures', path: '/dashboard/mes-candidatures', icon: FileText },
  { name: 'Mon profil', path: '/dashboard/mon-profil', icon: User },
  { name: 'Statistiques', path: '/dashboard/statistiques', icon: BarChart3 },
  { name: 'Notifications', path: '/dashboard/notifications', icon: Bell },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const links = profile?.role === 'recruiter' ? recruiterLinks : candidateLinks;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-border">
        <div className="p-6 border-b border-border">
          <Link to="/" className="text-xl font-bold tracking-tight group flex items-center gap-2">
            <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <span>
              <span className="text-foreground">Skill</span>
              <span className="text-primary">cruit</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative ${
                  isActive
                    ? 'text-primary bg-primary/5'
                    : 'text-muted-foreground hover:text-foreground hover:bg-slate-50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute left-0 top-1 bottom-1 w-0.5 bg-primary rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <link.icon className="w-4 h-4" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
              {profile?.full_name?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{profile?.full_name}</p>
              <p className="text-xs text-muted-foreground capitalize">{profile?.role === 'recruiter' ? 'Recruteur' : 'Candidat'}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-border px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold">
          <span className="text-foreground">Skill</span>
          <span className="text-primary">cruit</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{profile?.full_name}</span>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border flex justify-around py-2">
        {links.slice(0, 5).map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 text-xs ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <link.icon className="w-5 h-5" />
              <span className="truncate max-w-[60px]">{link.name.split(' ').slice(0, 2).join(' ')}</span>
            </Link>
          );
        })}
      </nav>

      {/* Main content */}
      <main className="flex-1 lg:p-8 p-4 pt-16 pb-20 lg:pt-8 lg:pb-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}

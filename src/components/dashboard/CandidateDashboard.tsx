import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'motion/react';
import { FileText, CheckCircle, Clock, TrendingUp, Search, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface Stats {
  totalApplications: number;
  accepted: number;
  pending: number;
  avgScore: number;
}

const MOCK_APPLICATIONS = [
  { id: '1', score: 88, status: 'shortlisted', campaigns: { title: 'Développeur Full Stack React', company: 'TechCorp', location: 'Paris' } },
  { id: '2', score: 72, status: 'analyzed', campaigns: { title: 'Product Manager', company: 'StartupXYZ', location: 'Lyon' } },
  { id: '3', score: 45, status: 'rejected', campaigns: { title: 'Data Analyst', company: 'Finance SA', location: 'Bordeaux' } },
];

const MOCK_ACTIVE_CAMPAIGNS = [
  { id: '1', title: 'Développeur Backend Node.js', company: 'TechCorp', location: 'Paris', contract_type: 'CDI' },
  { id: '2', title: 'Marketing Digital Manager', company: 'AgenceMedia', location: 'Remote', contract_type: 'CDI' },
  { id: '3', title: 'Data Scientist', company: 'BankFinance', location: 'Paris', contract_type: 'CDI' },
  { id: '4', title: 'Chef de Projet IT', company: 'ConsultingGroup', location: 'Nantes', contract_type: 'CDI' },
];

export function CandidateDashboard() {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState<Stats>({ totalApplications: 0, accepted: 0, pending: 0, avgScore: 0 });
  const [applications, setApplications] = useState<any[]>([]);
  const [activeCampaigns, setActiveCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      if (profile?.id === 'mock-user-id') {
        setApplications(MOCK_APPLICATIONS);
        setActiveCampaigns(MOCK_ACTIVE_CAMPAIGNS);
        const scores = MOCK_APPLICATIONS.map((a) => a.score);
        setStats({
          totalApplications: MOCK_APPLICATIONS.length,
          accepted: MOCK_APPLICATIONS.filter((a) => a.status === 'shortlisted').length,
          pending: MOCK_APPLICATIONS.filter((a) => a.status === 'analyzed').length,
          avgScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
        });
        setLoading(false);
        return;
      }

      const [appsRes, campaignsRes] = await Promise.all([
        supabase.from('applications').select('*, campaigns(title, company, location)').eq('candidate_email', user.email).order('created_at', { ascending: false }),
        supabase.from('campaigns').select('*').eq('status', 'active').order('created_at', { ascending: false }).limit(6),
      ]);

      const apps = appsRes.data || [];
      const campaigns = campaignsRes.data || [];

      setApplications(apps);
      setActiveCampaigns(campaigns);

      const scores = apps.filter((a: any) => a.score).map((a: any) => a.score);
      setStats({
        totalApplications: apps.length,
        accepted: apps.filter((a: any) => a.recommendation === 'accept' || a.status === 'shortlisted').length,
        pending: apps.filter((a: any) => a.status === 'pending' || a.status === 'analyzed').length,
        avgScore: scores.length > 0 ? Math.round(scores.reduce((a: number, b: number) => a + b, 0) / scores.length) : 0,
      });

      setLoading(false);
    };

    fetchData();
  }, [user, profile]);

  const statCards = [
    { label: 'Candidatures envoyées', value: stats.totalApplications, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Acceptées / Shortlist', value: stats.accepted, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'En attente', value: stats.pending, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Score moyen', value: stats.avgScore > 0 ? `${stats.avgScore}%` : '-', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Bonjour, {profile?.full_name?.split(' ')[0]}</h1>
          <p className="text-muted-foreground">Suivez vos candidatures et découvrez de nouvelles offres</p>
        </div>
        <Link to="/dashboard/offres">
          <Button>
            <Search className="w-4 h-4 mr-2" />
            Voir les offres
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl border border-border p-5"
          >
            <div className={`p-2 rounded-lg ${stat.bg} w-fit mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mes candidatures */}
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Mes candidatures</h2>
            <Link to="/dashboard/mes-candidatures" className="text-sm text-primary hover:underline">Voir tout</Link>
          </div>
          {applications.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">Aucune candidature pour le moment</p>
              <Link to="/dashboard/offres">
                <Button variant="outline" size="sm" className="mt-3">
                  <Search className="w-4 h-4 mr-1" /> Découvrir les offres
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {applications.slice(0, 5).map((app) => (
                <div key={app.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div>
                    <p className="font-medium text-foreground text-sm">{app.campaigns?.title}</p>
                    <p className="text-xs text-muted-foreground">{app.campaigns?.company} - {app.campaigns?.location}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {app.score && (
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        app.score >= 80 ? 'bg-green-50 text-green-700' :
                        app.score >= 60 ? 'bg-yellow-50 text-yellow-700' :
                        'bg-red-50 text-red-700'
                      }`}>
                        {app.score}%
                      </span>
                    )}
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      app.status === 'shortlisted' || app.status === 'interview' ? 'bg-green-50 text-green-700' :
                      app.status === 'pending' || app.status === 'analyzed' ? 'bg-yellow-50 text-yellow-700' :
                      app.status === 'rejected' ? 'bg-red-50 text-red-700' :
                      'bg-blue-50 text-blue-700'
                    }`}>
                      {app.status === 'pending' ? 'En attente' :
                       app.status === 'analyzed' ? 'Analysée' :
                       app.status === 'shortlisted' ? 'Présélectionné' :
                       app.status === 'interview' ? 'Entretien' :
                       app.status === 'offered' ? 'Offre reçue' :
                       app.status === 'hired' ? 'Embauché' :
                       app.status === 'rejected' ? 'Refusée' : app.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Offres actives */}
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Offres disponibles</h2>
            <Link to="/dashboard/offres" className="text-sm text-primary hover:underline">Voir tout</Link>
          </div>
          {activeCampaigns.length === 0 ? (
            <div className="text-center py-8">
              <Briefcase className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">Aucune offre disponible</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeCampaigns.map((campaign) => (
                <Link
                  key={campaign.id}
                  to={`/dashboard/offres/${campaign.id}`}
                  className="block p-3 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <p className="font-medium text-foreground text-sm">{campaign.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground">{campaign.company}</span>
                    {campaign.location && (
                      <span className="text-xs text-muted-foreground">{campaign.location}</span>
                    )}
                    {campaign.contract_type && (
                      <span className="text-xs bg-primary/5 text-primary px-2 py-0.5 rounded-full">{campaign.contract_type}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

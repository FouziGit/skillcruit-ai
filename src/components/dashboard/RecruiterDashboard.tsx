import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'motion/react';
import { Briefcase, Users, TrendingUp, Clock, Plus, Eye, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface Stats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalApplications: number;
  avgScore: number;
}

interface Campaign {
  id: string;
  title: string;
  company: string;
  status: string;
  created_at: string;
  application_count?: number;
}

const MOCK_CAMPAIGNS: Campaign[] = [
  { id: '1', title: 'Développeur Full Stack React', company: 'Skillcruit Demo', status: 'active', created_at: '2026-03-10' },
  { id: '2', title: 'Product Manager Senior', company: 'Skillcruit Demo', status: 'active', created_at: '2026-03-05' },
  { id: '3', title: 'UX/UI Designer', company: 'Skillcruit Demo', status: 'draft', created_at: '2026-03-01' },
  { id: '4', title: 'Data Engineer', company: 'Skillcruit Demo', status: 'paused', created_at: '2026-02-15' },
];

const MOCK_APPS = [
  { id: '1', candidate_name: 'Alice Bernard', score: 92, recommendation: 'accept', campaigns: { title: 'Développeur Full Stack React' } },
  { id: '2', candidate_name: 'Thomas Leblanc', score: 78, recommendation: 'review', campaigns: { title: 'Développeur Full Stack React' } },
  { id: '3', candidate_name: 'Sophie Martin', score: 85, recommendation: 'accept', campaigns: { title: 'Product Manager Senior' } },
  { id: '4', candidate_name: 'Karim Benzara', score: 45, recommendation: 'reject', campaigns: { title: 'Développeur Full Stack React' } },
  { id: '5', candidate_name: 'Camille Roux', score: 67, recommendation: 'review', campaigns: { title: 'Product Manager Senior' } },
];

export function RecruiterDashboard() {
  const { profile } = useAuth();
  const [stats, setStats] = useState<Stats>({ totalCampaigns: 0, activeCampaigns: 0, totalApplications: 0, avgScore: 0 });
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [recentApps, setRecentApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!profile) return;

      if (profile.id === 'mock-user-id') {
        setCampaigns(MOCK_CAMPAIGNS);
        setRecentApps(MOCK_APPS);
        const scores = MOCK_APPS.map((a) => a.score);
        setStats({
          totalCampaigns: MOCK_CAMPAIGNS.length,
          activeCampaigns: MOCK_CAMPAIGNS.filter((c) => c.status === 'active').length,
          totalApplications: MOCK_APPS.length,
          avgScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
        });
        setLoading(false);
        return;
      }

      const [campaignsRes, appsRes] = await Promise.all([
        supabase.from('campaigns').select('*').eq('recruiter_id', profile.id).order('created_at', { ascending: false }),
        supabase.from('applications').select('*, campaigns!inner(recruiter_id, title)').eq('campaigns.recruiter_id', profile.id).order('created_at', { ascending: false }).limit(10),
      ]);

      const campaignsList = campaignsRes.data || [];
      const appsList = appsRes.data || [];

      setCampaigns(campaignsList);
      setRecentApps(appsList);

      const scores = appsList.filter((a: any) => a.score).map((a: any) => a.score);
      setStats({
        totalCampaigns: campaignsList.length,
        activeCampaigns: campaignsList.filter((c: any) => c.status === 'active').length,
        totalApplications: appsList.length,
        avgScore: scores.length > 0 ? Math.round(scores.reduce((a: number, b: number) => a + b, 0) / scores.length) : 0,
      });

      setLoading(false);
    };

    fetchData();
  }, [profile]);

  const statCards = [
    { label: 'Campagnes actives', value: stats.activeCampaigns, total: stats.totalCampaigns, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Candidatures reçues', value: stats.totalApplications, icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Score moyen IA', value: `${stats.avgScore}%`, icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Temps moyen', value: '< 30s', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
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
          <p className="text-muted-foreground">Voici un aperçu de vos recrutements</p>
        </div>
        <Link to="/dashboard/campagnes/nouvelle">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle campagne
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
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              {stat.total !== undefined && (
                <span className="text-xs text-muted-foreground">/ {stat.total} total</span>
              )}
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campagnes récentes */}
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Campagnes récentes</h2>
            <Link to="/dashboard/campagnes" className="text-sm text-primary hover:underline">Voir tout</Link>
          </div>
          {campaigns.length === 0 ? (
            <div className="text-center py-8">
              <Briefcase className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">Aucune campagne pour le moment</p>
              <Link to="/dashboard/campagnes/nouvelle">
                <Button variant="outline" size="sm" className="mt-3">
                  <Plus className="w-4 h-4 mr-1" /> Créer une campagne
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {campaigns.slice(0, 5).map((campaign) => (
                <Link
                  key={campaign.id}
                  to={`/dashboard/campagnes/${campaign.id}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground text-sm">{campaign.title}</p>
                    <p className="text-xs text-muted-foreground">{campaign.company}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    campaign.status === 'active' ? 'bg-green-50 text-green-700' :
                    campaign.status === 'draft' ? 'bg-gray-50 text-gray-600' :
                    campaign.status === 'paused' ? 'bg-yellow-50 text-yellow-700' :
                    'bg-red-50 text-red-700'
                  }`}>
                    {campaign.status === 'active' ? 'Active' :
                     campaign.status === 'draft' ? 'Brouillon' :
                     campaign.status === 'paused' ? 'En pause' : 'Fermée'}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Candidatures récentes */}
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Dernières candidatures</h2>
            <Link to="/dashboard/candidatures" className="text-sm text-primary hover:underline">Voir tout</Link>
          </div>
          {recentApps.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">Aucune candidature reçue</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentApps.slice(0, 5).map((app) => (
                <div key={app.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs">
                      {app.candidate_name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{app.candidate_name}</p>
                      <p className="text-xs text-muted-foreground">{app.campaigns?.title}</p>
                    </div>
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
                      app.recommendation === 'accept' ? 'bg-green-50 text-green-700' :
                      app.recommendation === 'review' ? 'bg-yellow-50 text-yellow-700' :
                      app.recommendation === 'reject' ? 'bg-red-50 text-red-700' :
                      'bg-gray-50 text-gray-600'
                    }`}>
                      {app.recommendation === 'accept' ? 'Accepté' :
                       app.recommendation === 'review' ? 'À revoir' :
                       app.recommendation === 'reject' ? 'Refusé' : 'En attente'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

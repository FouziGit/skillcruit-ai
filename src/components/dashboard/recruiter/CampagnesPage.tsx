import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Plus, Eye, Pause, Play, Users, TrendingUp, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CAMPAIGNS = [
  { id: '1', title: 'Développeur Full Stack React', company: 'Skillcruit Demo', location: 'Paris · CDI', status: 'active', applications: 12, avgScore: 74, accepted: 3, createdAt: '10 mars 2026' },
  { id: '2', title: 'Product Manager Senior', company: 'Skillcruit Demo', location: 'Paris · CDI', status: 'active', applications: 8, avgScore: 71, accepted: 2, createdAt: '5 mars 2026' },
  { id: '3', title: 'UX/UI Designer', company: 'Skillcruit Demo', location: 'Remote · CDI', status: 'draft', applications: 0, avgScore: 0, accepted: 0, createdAt: '1 mars 2026' },
  { id: '4', title: 'Data Engineer', company: 'Skillcruit Demo', location: 'Lyon · CDI', status: 'paused', applications: 5, avgScore: 65, accepted: 1, createdAt: '15 fév 2026' },
];

const STATUS_LABELS: Record<string, string> = { active: 'Active', draft: 'Brouillon', paused: 'En pause', closed: 'Fermée' };
const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-50 text-green-700',
  draft: 'bg-gray-100 text-gray-500',
  paused: 'bg-yellow-50 text-yellow-700',
  closed: 'bg-red-50 text-red-700',
};

export function CampagnesPage() {
  const [filter, setFilter] = useState('all');

  const filtered = CAMPAIGNS.filter(c => filter === 'all' || c.status === filter);
  const total = CAMPAIGNS.reduce((acc, c) => acc + c.applications, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Campagnes</h1>
          <p className="text-muted-foreground">{CAMPAIGNS.length} campagnes · {total} candidatures reçues</p>
        </div>
        <Link to="/dashboard/campagnes/nouvelle">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle campagne
          </Button>
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total campagnes', value: CAMPAIGNS.length },
          { label: 'Actives', value: CAMPAIGNS.filter(c => c.status === 'active').length },
          { label: 'Candidatures', value: total },
          { label: 'Présélectionnés', value: CAMPAIGNS.reduce((acc, c) => acc + c.accepted, 0) },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-border p-4">
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: 'all', label: 'Toutes' },
          { key: 'active', label: 'Actives' },
          { key: 'draft', label: 'Brouillons' },
          { key: 'paused', label: 'En pause' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === tab.key
                ? 'bg-primary text-white'
                : 'bg-white text-muted-foreground hover:text-foreground border border-border'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Campaign cards */}
      <div className="space-y-3">
        {filtered.map((campaign, i) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white rounded-xl border border-border p-5 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <h3 className="font-semibold text-foreground">{campaign.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[campaign.status]}`}>
                    {STATUS_LABELS[campaign.status]}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{campaign.company} · {campaign.location} · Créée le {campaign.createdAt}</p>
                <div className="flex items-center gap-6 flex-wrap">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span><strong className="text-foreground">{campaign.applications}</strong> candidature{campaign.applications !== 1 ? 's' : ''}</span>
                  </div>
                  {campaign.avgScore > 0 && (
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <TrendingUp className="w-4 h-4" />
                      <span>Score moyen IA : <strong className="text-foreground">{campaign.avgScore}%</strong></span>
                    </div>
                  )}
                  {campaign.accepted > 0 && (
                    <span className="text-sm text-green-700 font-medium">{campaign.accepted} présélectionné{campaign.accepted > 1 ? 's' : ''}</span>
                  )}
                </div>

                {campaign.avgScore > 0 && (
                  <div className="mt-4">
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden w-full max-w-xs">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${campaign.avgScore}%` }}
                        transition={{ delay: i * 0.06 + 0.3, duration: 0.7 }}
                        className={`h-full rounded-full ${campaign.avgScore >= 75 ? 'bg-green-500' : campaign.avgScore >= 60 ? 'bg-yellow-500' : 'bg-red-400'}`}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link to={`/dashboard/campagnes/${campaign.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1.5" />
                    Voir
                  </Button>
                </Link>
                {campaign.status === 'active' && (
                  <Button variant="outline" size="sm" title="Mettre en pause">
                    <Pause className="w-4 h-4" />
                  </Button>
                )}
                {campaign.status === 'paused' && (
                  <Button variant="outline" size="sm" title="Reprendre">
                    <Play className="w-4 h-4" />
                  </Button>
                )}
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

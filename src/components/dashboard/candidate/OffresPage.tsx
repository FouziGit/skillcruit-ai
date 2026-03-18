import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, MapPin, Briefcase, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const JOBS = [
  { id: '1', title: 'Développeur Backend Node.js', company: 'TechCorp', location: 'Paris', type: 'CDI', salary: '45–55K€', posted: 'Il y a 2 jours', match: 91, tags: ['Node.js', 'TypeScript', 'AWS'] },
  { id: '2', title: 'Marketing Digital Manager', company: 'AgenceMedia', location: 'Remote', type: 'CDI', salary: '40–50K€', posted: 'Il y a 3 jours', match: 78, tags: ['SEO', 'Analytics', 'Google Ads'] },
  { id: '3', title: 'Data Scientist', company: 'BankFinance', location: 'Paris', type: 'CDI', salary: '50–65K€', posted: 'Il y a 1 jour', match: 85, tags: ['Python', 'Machine Learning', 'SQL'] },
  { id: '4', title: 'Chef de Projet IT', company: 'ConsultingGroup', location: 'Nantes', type: 'CDI', salary: '42–52K€', posted: 'Il y a 5 jours', match: 72, tags: ['Agile', 'Jira', 'PMP'] },
  { id: '5', title: 'Product Designer', company: 'StartupXYZ', location: 'Lyon', type: 'CDI', salary: '38–48K€', posted: 'Il y a 4 jours', match: 68, tags: ['Figma', 'UX Research', 'Design System'] },
  { id: '6', title: 'DevOps Engineer', company: 'CloudTech', location: 'Remote', type: 'CDI', salary: '55–70K€', posted: 'Aujourd\'hui', match: 82, tags: ['Docker', 'Kubernetes', 'CI/CD'] },
];

export function OffresPage() {
  const [search, setSearch] = useState('');
  const [applied, setApplied] = useState<string[]>([]);

  const filtered = JOBS.filter(j =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.company.toLowerCase().includes(search.toLowerCase()) ||
    j.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Offres disponibles</h1>
        <p className="text-muted-foreground">{JOBS.length} offres correspondent à votre profil</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher un poste, une compétence..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Job cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((job, i) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white rounded-xl border border-border p-5 hover:shadow-sm transition-shadow"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="font-semibold text-foreground">{job.title}</h3>
                <p className="text-sm text-muted-foreground">{job.company}</p>
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full shrink-0 ${
                job.match >= 85 ? 'bg-green-50 text-green-700' :
                job.match >= 70 ? 'bg-yellow-50 text-yellow-700' :
                'bg-gray-100 text-gray-600'
              }`}>
                <TrendingUp className="w-3 h-3" />
                {job.match}% match
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3 flex-wrap">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {job.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                {job.type}
              </span>
              <span className="font-medium text-foreground">{job.salary}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {job.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-0.5 bg-primary/5 text-primary rounded-full">{tag}</span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {job.posted}
              </span>
              <div className="flex items-center gap-2">
                <Link to={`/dashboard/offres/${job.id}`}>
                  <Button size="sm" variant="outline">Voir l'offre</Button>
                </Link>
                <Button
                  size="sm"
                  variant={applied.includes(job.id) ? 'outline' : 'default'}
                  disabled={applied.includes(job.id)}
                  onClick={() => setApplied(prev => [...prev, job.id])}
                >
                  {applied.includes(job.id) ? 'Envoyée ✓' : 'Postuler'}
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground text-sm">
          Aucune offre trouvée pour "{search}"
        </div>
      )}
    </div>
  );
}

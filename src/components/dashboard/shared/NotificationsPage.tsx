import { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Calendar, Sparkles, Briefcase, CheckCircle, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const RECRUITER_NOTIFS = [
  { id: '1', icon: Users, color: 'text-blue-600 bg-blue-50', title: 'Nouvelle candidature', message: 'Thomas Leblanc a postulé pour Développeur Full Stack React', time: 'Il y a 2h', read: false },
  { id: '2', icon: Calendar, color: 'text-purple-600 bg-purple-50', title: 'Entretien confirmé', message: 'Alice Bernard a confirmé l\'entretien du 20 mars à 14h00', time: 'Il y a 5h', read: false },
  { id: '3', icon: Sparkles, color: 'text-primary bg-primary/10', title: 'Analyse IA terminée', message: '8 nouveaux CV ont été analysés et scorés automatiquement', time: 'Hier à 18h', read: true },
  { id: '4', icon: Users, color: 'text-blue-600 bg-blue-50', title: 'Nouvelle candidature', message: 'Emma Duval a postulé pour Data Engineer', time: 'Il y a 2 jours', read: true },
  { id: '5', icon: Briefcase, color: 'text-green-600 bg-green-50', title: 'Campagne publiée', message: 'Votre campagne UX/UI Designer est maintenant en ligne', time: 'Il y a 3 jours', read: true },
  { id: '6', icon: CheckCircle, color: 'text-teal-600 bg-teal-50', title: 'Candidat présélectionné', message: 'Sophie Martin a été ajoutée à la shortlist Product Manager Senior', time: 'Il y a 4 jours', read: true },
];

const CANDIDATE_NOTIFS = [
  { id: '1', icon: Sparkles, color: 'text-primary bg-primary/10', title: 'Votre CV a été analysé', message: 'Votre score de matching pour Développeur Full Stack React est de 88%', time: 'Il y a 3h', read: false },
  { id: '2', icon: CheckCircle, color: 'text-green-600 bg-green-50', title: 'Présélectionné !', message: 'Félicitations, vous êtes présélectionné pour Développeur Full Stack React chez TechCorp', time: 'Hier à 16h', read: false },
  { id: '3', icon: Calendar, color: 'text-purple-600 bg-purple-50', title: 'Invitation à un entretien', message: 'TechCorp vous invite à un entretien le 25 mars à 11h00', time: 'Hier à 17h', read: true },
  { id: '4', icon: Briefcase, color: 'text-blue-600 bg-blue-50', title: 'Nouvelle offre pour vous', message: '4 nouvelles offres correspondent à votre profil', time: 'Il y a 2 jours', read: true },
];

export function NotificationsPage() {
  const { profile } = useAuth();
  const notifs = profile?.role === 'recruiter' ? RECRUITER_NOTIFS : CANDIDATE_NOTIFS;
  const [items, setItems] = useState(notifs);

  const unread = items.filter(n => !n.read).length;

  const markAllRead = () => setItems(prev => prev.map(n => ({ ...n, read: true })));

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">
            {unread > 0 ? `${unread} non lue${unread > 1 ? 's' : ''}` : 'Tout est à jour'}
          </p>
        </div>
        {unread > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead}>
            Tout marquer comme lu
          </Button>
        )}
      </div>

      <div className="space-y-2">
        {items.map((notif, i) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setItems(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n))}
            className={`bg-white rounded-xl border p-4 flex items-start gap-4 cursor-pointer transition-all ${
              notif.read ? 'border-border opacity-70' : 'border-primary/20 shadow-sm'
            }`}
          >
            <div className={`p-2.5 rounded-lg shrink-0 ${notif.color}`}>
              <notif.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-foreground">{notif.title}</p>
                {!notif.read && (
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{notif.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {items.every(n => n.read) && (
        <div className="text-center py-12">
          <Bell className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">Aucune nouvelle notification</p>
        </div>
      )}
    </div>
  );
}

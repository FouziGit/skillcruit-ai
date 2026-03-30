import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { RecruiterDashboard } from '@/components/dashboard/RecruiterDashboard';
import { CandidateDashboard } from '@/components/dashboard/CandidateDashboard';
import { CampagnesPage } from '@/components/dashboard/recruiter/CampagnesPage';
import { CampagneDetailPage } from '@/components/dashboard/recruiter/CampagneDetailPage';
import { NouvelleCampagnePage } from '@/components/dashboard/recruiter/NouvelleCampagnePage';
import { CandidaturesPage } from '@/components/dashboard/recruiter/CandidaturesPage';
import { EntretiensPage } from '@/components/dashboard/recruiter/EntretiensPage';
import { ParametresPage } from '@/components/dashboard/recruiter/ParametresPage';
import { NotificationsPage } from '@/components/dashboard/shared/NotificationsPage';
import { OffresPage } from '@/components/dashboard/candidate/OffresPage';
import { OffreDetailPage } from '@/components/dashboard/candidate/OffreDetailPage';
import { MesCandidaturesPage } from '@/components/dashboard/candidate/MesCandidaturesPage';
import { MonProfilPage } from '@/components/dashboard/candidate/MonProfilPage';
import { StatistiquesPage } from '@/components/dashboard/candidate/StatistiquesPage';
import { Navigate, Routes, Route } from 'react-router-dom';

const Dashboard = () => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/connexion" replace />;

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <Routes>
        {profile.role === 'recruiter' ? (
          <>
            <Route index element={<RecruiterDashboard />} />
            <Route path="campagnes" element={<CampagnesPage />} />
            <Route path="campagnes/nouvelle" element={<NouvelleCampagnePage />} />
            <Route path="campagnes/:id" element={<CampagneDetailPage />} />
            <Route path="candidatures" element={<CandidaturesPage />} />
            <Route path="entretiens" element={<EntretiensPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="parametres" element={<ParametresPage />} />
          </>
        ) : (
          <>
            <Route index element={<CandidateDashboard />} />
            <Route path="offres" element={<OffresPage />} />
            <Route path="offres/:id" element={<OffreDetailPage />} />
            <Route path="mes-candidatures" element={<MesCandidaturesPage />} />
            <Route path="mon-profil" element={<MonProfilPage />} />
            <Route path="statistiques" element={<StatistiquesPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
          </>
        )}
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;

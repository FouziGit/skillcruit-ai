-- ============================================
-- SKILLCRUIT - Schema Supabase Complet
-- Copier-coller dans Supabase SQL Editor
-- ============================================

-- Active les extensions nécessaires
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- 1. PROFILES (extends Supabase Auth)
-- ============================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('recruiter', 'candidate', 'admin')),
  company TEXT,
  phone TEXT,
  avatar_url TEXT,
  bio TEXT,
  linkedin_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index pour recherche par role
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_email ON public.profiles(email);

-- ============================================
-- 2. COMPANIES (entreprises qui recrutent)
-- ============================================
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  website TEXT,
  industry TEXT,
  size TEXT CHECK (size IN ('1-10', '11-50', '51-200', '201-500', '501-1000', '1000+')),
  location TEXT,
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_companies_owner ON public.companies(owner_id);

-- ============================================
-- 3. CAMPAIGNS (campagnes de recrutement)
-- ============================================
CREATE TABLE public.campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  recruiter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  contract_type TEXT CHECK (contract_type IN ('CDI', 'CDD', 'Stage', 'Alternance', 'Freelance', 'Interim')),
  salary_min INTEGER,
  salary_max INTEGER,
  remote_policy TEXT CHECK (remote_policy IN ('onsite', 'hybrid', 'remote')),
  experience_level TEXT CHECK (experience_level IN ('junior', 'mid', 'senior', 'lead', 'director')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'closed', 'archived')),
  published_at TIMESTAMPTZ,
  closes_at TIMESTAMPTZ,
  max_applications INTEGER DEFAULT 100,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_campaigns_company ON public.campaigns(company_id);
CREATE INDEX idx_campaigns_recruiter ON public.campaigns(recruiter_id);
CREATE INDEX idx_campaigns_status ON public.campaigns(status);

-- ============================================
-- 4. CAMPAIGN_CRITERIA (critères d'évaluation)
-- ============================================
CREATE TABLE public.campaign_criteria (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('skill', 'experience', 'education', 'language', 'soft_skill', 'certification', 'other')),
  weight INTEGER NOT NULL DEFAULT 1 CHECK (weight BETWEEN 1 AND 10),
  is_required BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_criteria_campaign ON public.campaign_criteria(campaign_id);

-- ============================================
-- 5. APPLICATIONS (candidatures analysées par l'IA)
-- ============================================
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  candidate_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  candidate_name TEXT NOT NULL,
  candidate_email TEXT NOT NULL,
  cv_text TEXT,
  cv_file_url TEXT,

  -- Résultats de l'analyse IA
  score INTEGER CHECK (score BETWEEN 0 AND 100),
  recommendation TEXT CHECK (recommendation IN ('accept', 'review', 'reject')),
  skills_match JSONB,
  experience_relevance JSONB,
  strengths JSONB,
  weaknesses JSONB,
  summary TEXT,
  criteria_scores JSONB,

  -- Statut du processus
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'analyzed', 'shortlisted', 'interview', 'offered', 'hired', 'rejected')),
  recruiter_notes TEXT,

  -- Dates
  analyzed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_applications_campaign ON public.applications(campaign_id);
CREATE INDEX idx_applications_candidate ON public.applications(candidate_id);
CREATE INDEX idx_applications_status ON public.applications(status);
CREATE INDEX idx_applications_score ON public.applications(score DESC);
CREATE INDEX idx_applications_email ON public.applications(candidate_email);

-- ============================================
-- 6. CANDIDATE_PROFILES (infos candidats)
-- ============================================
CREATE TABLE public.candidate_profiles (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT,
  skills JSONB DEFAULT '[]'::jsonb,
  experience_years INTEGER,
  education TEXT,
  current_company TEXT,
  current_position TEXT,
  desired_salary INTEGER,
  desired_contract TEXT CHECK (desired_contract IN ('CDI', 'CDD', 'Stage', 'Alternance', 'Freelance', 'Interim')),
  desired_location TEXT,
  remote_preference TEXT CHECK (remote_preference IN ('onsite', 'hybrid', 'remote')),
  availability_date DATE,
  cv_url TEXT,
  portfolio_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- 7. INTERVIEWS (entretiens planifiés)
-- ============================================
CREATE TABLE public.interviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  recruiter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  type TEXT NOT NULL CHECK (type IN ('phone', 'video', 'onsite')),
  meeting_url TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no_show')),
  feedback TEXT,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_interviews_application ON public.interviews(application_id);
CREATE INDEX idx_interviews_recruiter ON public.interviews(recruiter_id);
CREATE INDEX idx_interviews_date ON public.interviews(scheduled_at);

-- ============================================
-- 8. NOTIFICATIONS
-- ============================================
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('new_application', 'status_change', 'interview_scheduled', 'campaign_update', 'system')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON public.notifications(user_id);
CREATE INDEX idx_notifications_unread ON public.notifications(user_id, is_read) WHERE NOT is_read;

-- ============================================
-- 9. ACTIVITY_LOG (historique des actions)
-- ============================================
CREATE TABLE public.activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_activity_user ON public.activity_log(user_id);
CREATE INDEX idx_activity_entity ON public.activity_log(entity_type, entity_id);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'candidate')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: auto-create profile on auth signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON public.companies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON public.campaigns FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON public.applications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_candidate_profiles_updated_at BEFORE UPDATE ON public.candidate_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_interviews_updated_at BEFORE UPDATE ON public.interviews FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_criteria ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- PROFILES policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Recruiters can view candidate profiles" ON public.profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'recruiter')
);
CREATE POLICY "Service role full access profiles" ON public.profiles FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- COMPANIES policies
CREATE POLICY "Company owners can manage" ON public.companies FOR ALL USING (owner_id = auth.uid());
CREATE POLICY "Anyone can view companies" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Service role full access companies" ON public.companies FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- CAMPAIGNS policies
CREATE POLICY "Recruiters can manage own campaigns" ON public.campaigns FOR ALL USING (recruiter_id = auth.uid());
CREATE POLICY "Anyone can view active campaigns" ON public.campaigns FOR SELECT USING (status = 'active');
CREATE POLICY "Service role full access campaigns" ON public.campaigns FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- CAMPAIGN_CRITERIA policies
CREATE POLICY "Campaign owner can manage criteria" ON public.campaign_criteria FOR ALL USING (
  EXISTS (SELECT 1 FROM public.campaigns c WHERE c.id = campaign_id AND c.recruiter_id = auth.uid())
);
CREATE POLICY "Anyone can view criteria of active campaigns" ON public.campaign_criteria FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.campaigns c WHERE c.id = campaign_id AND c.status = 'active')
);
CREATE POLICY "Service role full access criteria" ON public.campaign_criteria FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- APPLICATIONS policies
CREATE POLICY "Candidates can view own applications" ON public.applications FOR SELECT USING (candidate_email = auth.jwt()->>'email');
CREATE POLICY "Candidates can create applications" ON public.applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Recruiters can view campaign applications" ON public.applications FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.campaigns c WHERE c.id = campaign_id AND c.recruiter_id = auth.uid())
);
CREATE POLICY "Recruiters can update campaign applications" ON public.applications FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.campaigns c WHERE c.id = campaign_id AND c.recruiter_id = auth.uid())
);
CREATE POLICY "Service role full access applications" ON public.applications FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- CANDIDATE_PROFILES policies
CREATE POLICY "Candidates can manage own profile" ON public.candidate_profiles FOR ALL USING (id = auth.uid());
CREATE POLICY "Recruiters can view candidate profiles detail" ON public.candidate_profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'recruiter')
);
CREATE POLICY "Service role full access candidate_profiles" ON public.candidate_profiles FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- INTERVIEWS policies
CREATE POLICY "Recruiters can manage own interviews" ON public.interviews FOR ALL USING (recruiter_id = auth.uid());
CREATE POLICY "Candidates can view own interviews" ON public.interviews FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.applications a WHERE a.id = application_id AND a.candidate_email = auth.jwt()->>'email')
);
CREATE POLICY "Service role full access interviews" ON public.interviews FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- NOTIFICATIONS policies
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Service role full access notifications" ON public.notifications FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- ACTIVITY_LOG policies
CREATE POLICY "Users can view own activity" ON public.activity_log FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Service role full access activity" ON public.activity_log FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- ============================================
-- STORAGE BUCKETS (pour les CVs)
-- ============================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'cvs',
  'cvs',
  false,
  10485760, -- 10MB max
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
) ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  2097152, -- 2MB max
  ARRAY['image/jpeg', 'image/png', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'company-logos',
  'company-logos',
  true,
  2097152, -- 2MB max
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
) ON CONFLICT (id) DO NOTHING;

-- Storage policies for CVs
CREATE POLICY "Candidates can upload CVs" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'cvs' AND auth.role() = 'authenticated'
);
CREATE POLICY "Users can view own CVs" ON storage.objects FOR SELECT USING (
  bucket_id = 'cvs' AND (auth.uid()::text = (storage.foldername(name))[1])
);
CREATE POLICY "Recruiters can view CVs" ON storage.objects FOR SELECT USING (
  bucket_id = 'cvs' AND EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'recruiter')
);

-- Storage policies for avatars
CREATE POLICY "Anyone can view avatars" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users can upload own avatar" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Storage policies for company logos
CREATE POLICY "Anyone can view logos" ON storage.objects FOR SELECT USING (bucket_id = 'company-logos');
CREATE POLICY "Company owners can upload logos" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'company-logos' AND auth.role() = 'authenticated'
);

-- ============================================
-- DONE! Schema Skillcruit complet ✓
-- ============================================
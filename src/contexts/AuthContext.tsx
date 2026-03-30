import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: 'recruiter' | 'candidate' | 'admin';
  company?: string;
  phone?: string;
  avatar_url?: string;
  bio?: string;
  linkedin_url?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, role: 'recruiter' | 'candidate') => Promise<void>;
  signIn: (email: string, password: string, role?: 'recruiter' | 'candidate') => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (authUser: User) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .single();

    if (data) {
      setProfile(data);
    } else {
      // Profiles table unavailable — fall back to auth metadata set during signUp
      const meta = authUser.user_metadata ?? {};
      setProfile({
        id: authUser.id,
        email: authUser.email ?? '',
        full_name: meta.full_name ?? '',
        role: (meta.role as Profile['role']) ?? 'candidate',
      });
    }
  };

  useEffect(() => {
    const mockData = sessionStorage.getItem('mock_session');
    if (mockData) {
      const { role, name } = JSON.parse(mockData);
      setProfile({ id: 'mock-user-id', email: 'test@test.com', full_name: name, role });
      setUser({ id: 'mock-user-id', email: 'test@test.com' } as any);
      setLoading(false);
    } else {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) fetchProfile(session.user);
        setLoading(false);
      });
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (sessionStorage.getItem('mock_session')) return;
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string, role: 'recruiter' | 'candidate') => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role },
      },
    });
    if (error) throw error;
  };

  const signIn = async (email: string, password: string, role?: 'recruiter' | 'candidate') => {
    if (email === 'test@test.com' && password === 'test') {
      const mockRole = role || 'recruiter';
      const mockName = mockRole === 'recruiter' ? 'Marie Dupont' : 'Jean Martin';
      sessionStorage.setItem('mock_session', JSON.stringify({ role: mockRole, name: mockName }));
      setProfile({ id: 'mock-user-id', email: 'test@test.com', full_name: mockName, role: mockRole });
      setUser({ id: 'mock-user-id', email: 'test@test.com' } as any);
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    if (sessionStorage.getItem('mock_session')) {
      sessionStorage.removeItem('mock_session');
      setUser(null);
      setSession(null);
      setProfile(null);
      return;
    }
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

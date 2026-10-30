import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabase';

interface AuthUser {
  id: string;
  email: string;
  role: 'admin' | 'moderator';
}

interface AuthContextType {
  user: AuthUser | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isSupabaseAuth: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  isLoading: true,
  login: async () => ({ success: false }),
  logout: async () => {},
  isSupabaseAuth: false
});

const DEMO_ADMIN_SESSION_KEY = 'cleanstreet_admin_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isSupabaseAuth = isSupabaseConfigured();

  useEffect(() => {
    if (isSupabaseAuth && supabase) {
      // Check active Supabase session
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || 'admin@cleanstreet-tn.org',
            role: 'admin'
          });
        } else {
          setUser(null);
        }
        setIsLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || 'admin@cleanstreet-tn.org',
            role: 'admin'
          });
        } else {
          setUser(null);
        }
      });

      return () => subscription.unsubscribe();
    } else {
      // Offline / Demonstration session check
      try {
        const stored = sessionStorage.getItem(DEMO_ADMIN_SESSION_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setUser(parsed);
        }
      } catch (e) {
        console.warn('Error reading demo session:', e);
      }
      setIsLoading(false);
    }
  }, [isSupabaseAuth]);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    if (isSupabaseAuth && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: pass
      });
      if (error) {
        return { success: false, error: error.message };
      }
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || email,
          role: 'admin'
        });
        return { success: true };
      }
    }

    // Demo Mode evaluation authentication
    // Validates against secure demo administrator credentials for demonstration evaluation
    if (email.trim().toLowerCase() === 'admin@cleanstreet-tn.org' && pass === 'CleanStreetAdmin2026!') {
      const demoUser: AuthUser = {
        id: 'demo-admin-01',
        email: 'admin@cleanstreet-tn.org',
        role: 'admin'
      };
      setUser(demoUser);
      sessionStorage.setItem(DEMO_ADMIN_SESSION_KEY, JSON.stringify(demoUser));
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid credentials. For demonstration evaluation, use admin@cleanstreet-tn.org / CleanStreetAdmin2026!'
    };
  };

  const logout = async () => {
    if (isSupabaseAuth && supabase) {
      await supabase.auth.signOut();
    }
    sessionStorage.removeItem(DEMO_ADMIN_SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: !!user,
        isLoading,
        login,
        logout,
        isSupabaseAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

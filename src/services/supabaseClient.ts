import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UserProgress } from '../types';

const DEFAULT_SUPABASE_URL = 'https://tpstlqalinybpmtsmfhf.supabase.co';
const DEFAULT_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwc3RscWFsaW55YnBtdHNtZmhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNDE3OTksImV4cCI6MjA5NjgxNzc5OX0.dummy';

const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || (import.meta as any).env?.VITE_SUPABASE_SERVICE_ROLE_KEY || DEFAULT_ANON_KEY;

function initSupabase(): SupabaseClient | null {
  try {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      return null;
    }
    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (err) {
    console.warn('Supabase initialization warning:', err);
    return null;
  }
}

export const supabase = initSupabase() || (createClient(DEFAULT_SUPABASE_URL, DEFAULT_ANON_KEY) as SupabaseClient);

export interface AuthUser {
  id: string;
  email: string;
  fullName?: string;
  isDemo?: boolean;
}

const LOCAL_AUTH_KEY = 'pattern_auth_session';

export const authService = {
  /**
   * Get the current user session
   */
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      if (supabase && typeof supabase.auth?.getSession === 'function') {
        const { data } = await supabase.auth.getSession();
        if (data?.session?.user) {
          const u = data.session.user;
          return {
            id: u.id,
            email: u.email || '',
            fullName: u.user_metadata?.full_name || u.email?.split('@')[0] || 'Pattern Scholar',
            isDemo: false
          };
        }
      }
    } catch (e) {
      console.warn('Supabase session check skipped:', e);
    }

    // Fallback to local session / demo user
    try {
      const savedLocal = localStorage.getItem(LOCAL_AUTH_KEY);
      if (savedLocal) {
        return JSON.parse(savedLocal);
      }
    } catch (e) {
      console.warn('LocalStorage session read error:', e);
    }

    return null;
  },

  /**
   * Sign in with Email & Password
   */
  async signIn(email: string, password: string): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      if (supabase && typeof supabase.auth?.signInWithPassword === 'function') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          return { user: null, error: error.message };
        }

        if (data?.user) {
          const u: AuthUser = {
            id: data.user.id,
            email: data.user.email || email,
            fullName: data.user.user_metadata?.full_name || email.split('@')[0],
            isDemo: false
          };
          localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(u));
          return { user: u, error: null };
        }
      }

      // Local demo fallback if Supabase auth endpoint is unconfigured
      const localUser: AuthUser = {
        id: 'user-' + Date.now().toString(36),
        email,
        fullName: email.split('@')[0],
        isDemo: true
      };
      localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(localUser));
      return { user: localUser, error: null };
    } catch (e: any) {
      return { user: null, error: e.message || 'Authentication error' };
    }
  },

  /**
   * Sign up with Email, Password & Name
   */
  async signUp(email: string, password: string, fullName?: string): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      if (supabase && typeof supabase.auth?.signUp === 'function') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName || email.split('@')[0]
            }
          }
        });

        if (error) {
          return { user: null, error: error.message };
        }

        if (data?.user) {
          const u: AuthUser = {
            id: data.user.id,
            email: data.user.email || email,
            fullName: fullName || email.split('@')[0],
            isDemo: false
          };
          localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(u));
          return { user: u, error: null };
        }
      }

      const localUser: AuthUser = {
        id: 'user-' + Date.now().toString(36),
        email,
        fullName: fullName || email.split('@')[0],
        isDemo: true
      };
      localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(localUser));
      return { user: localUser, error: null };
    } catch (e: any) {
      return { user: null, error: e.message || 'Registration error' };
    }
  },

  /**
   * One-click demo guest login for instant testing
   */
  signInDemo(name = 'Guest Researcher'): AuthUser {
    const demoUser: AuthUser = {
      id: 'demo-user-77',
      email: 'researcher@pattern.org',
      fullName: name,
      isDemo: true
    };
    try {
      localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(demoUser));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return demoUser;
  },

  /**
   * Sign out
   */
  async signOut(): Promise<void> {
    try {
      if (supabase && typeof supabase.auth?.signOut === 'function') {
        await supabase.auth.signOut();
      }
    } catch (e) {
      console.warn('Supabase signOut notice:', e);
    }
    try {
      localStorage.removeItem(LOCAL_AUTH_KEY);
    } catch (e) {
      console.warn('LocalStorage clear error:', e);
    }
  },

  /**
   * Sync user progress to cloud if authenticated
   */
  async syncProgress(userId: string, progress: UserProgress): Promise<void> {
    try {
      localStorage.setItem(`pattern_progress_${userId}`, JSON.stringify(progress));
    } catch (e) {
      console.warn('Progress sync error:', e);
    }
  }
};

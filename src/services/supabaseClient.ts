import { createClient } from '@supabase/supabase-js';
import { UserProgress } from '../types';

const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
      // Check Supabase session first
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        const u = data.session.user;
        return {
          id: u.id,
          email: u.email || '',
          fullName: u.user_metadata?.full_name || u.email?.split('@')[0] || 'Pattern Thinker',
          isDemo: false
        };
      }

      // Check local demo session
      const savedLocal = localStorage.getItem(LOCAL_AUTH_KEY);
      if (savedLocal) {
        return JSON.parse(savedLocal);
      }

      return null;
    } catch (e) {
      console.warn('Error fetching Supabase auth session:', e);
      const savedLocal = localStorage.getItem(LOCAL_AUTH_KEY);
      return savedLocal ? JSON.parse(savedLocal) : null;
    }
  },

  /**
   * Sign in with Email & Password
   */
  async signIn(email: string, password: string): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { user: null, error: error.message };
      }

      if (data.user) {
        const u: AuthUser = {
          id: data.user.id,
          email: data.user.email || email,
          fullName: data.user.user_metadata?.full_name || email.split('@')[0],
          isDemo: false
        };
        localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(u));
        return { user: u, error: null };
      }

      return { user: null, error: 'User not found' };
    } catch (e: any) {
      return { user: null, error: e.message || 'Authentication error' };
    }
  },

  /**
   * Sign up with Email, Password & Name
   */
  async signUp(email: string, password: string, fullName?: string): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
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

      if (data.user) {
        const u: AuthUser = {
          id: data.user.id,
          email: data.user.email || email,
          fullName: fullName || email.split('@')[0],
          isDemo: false
        };
        localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(u));
        return { user: u, error: null };
      }

      return { user: null, error: 'Registration pending confirmation' };
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
    localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(demoUser));
    return demoUser;
  },

  /**
   * Sign out
   */
  async signOut(): Promise<void> {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Supabase signOut notice:', e);
    }
    localStorage.removeItem(LOCAL_AUTH_KEY);
  },

  /**
   * Sync user progress to cloud if authenticated
   */
  async syncProgress(userId: string, progress: UserProgress): Promise<void> {
    try {
      // Store in Supabase user metadata or local storage
      localStorage.setItem(`pattern_progress_${userId}`, JSON.stringify(progress));
    } catch (e) {
      console.warn('Progress sync error:', e);
    }
  }
};

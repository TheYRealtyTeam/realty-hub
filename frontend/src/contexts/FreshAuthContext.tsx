
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

console.log('FreshAuthContext: Loading auth context');

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string, userData: { full_name?: string, username?: string }) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
};

const FreshAuthContext = createContext<AuthContextType | undefined>(undefined);

export const FreshAuthProvider = ({ children }: { children: ReactNode }) => {
  console.log('FreshAuthProvider: Initializing provider');
  
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log('FreshAuthProvider: Setting up auth state listener');
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('FreshAuthProvider: Auth state changed:', event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (event === 'SIGNED_IN') {
          toast.success('Successfully signed in!');
        } else if (event === 'SIGNED_OUT') {
          toast.success('Successfully signed out!');
        }
      }
    );

    // Check for existing session
    const initializeAuth = async () => {
      try {
        console.log('FreshAuthProvider: Initializing auth');
        setLoading(true);
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log('FreshAuthProvider: Got session:', currentSession ? 'exists' : 'none');
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
      } catch (error) {
        console.error('FreshAuthProvider: Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log('FreshAuthProvider: Attempting sign in');
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      console.error('FreshAuthProvider: Error signing in:', error);
      return { error };
    }
  };

  const signUp = async (email: string, password: string, userData: { full_name?: string, username?: string }) => {
    console.log('FreshAuthProvider: Attempting sign up');
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: userData.full_name || '',
            username: userData.username || '',
          },
        },
      });
      return { error };
    } catch (error) {
      console.error('FreshAuthProvider: Error signing up:', error);
      return { error };
    }
  };

  const signOut = async () => {
    console.log('FreshAuthProvider: Attempting sign out');
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('FreshAuthProvider: Error signing out:', error);
    }
  };

  return (
    <FreshAuthContext.Provider
      value={{
        session,
        user,
        loading,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </FreshAuthContext.Provider>
  );
};

export const useFreshAuth = () => {
  const context = useContext(FreshAuthContext);
  
  if (context === undefined) {
    throw new Error('useFreshAuth must be used within a FreshAuthProvider');
  }
  
  return context;
};

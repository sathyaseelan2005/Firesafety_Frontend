import { createContext, useContext, useEffect, useState } from 'react';
import type { Owner, User } from '../lib/database.types';

export type UserType = 'admin' | 'customer' | null;

interface AuthContextType {
  user: User | null;
  owner: Owner | null;
  userType: UserType;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, ownerData: Partial<Owner>) => Promise<any>;
  signInAdmin: (email: string, password: string) => Promise<any>;
  signUpAdmin: (email: string, password: string, ownerData: Partial<Owner>) => Promise<any>;
  signInCustomer: (email: string, password: string) => Promise<any>;
  signUpCustomer: (email: string, password: string, customerData: { name: string; phone: string }) => Promise<any>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [owner, setOwner] = useState<Owner | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [loading, setLoading] = useState(true);

  // On mount, clear any stored tokens (no backend)
  useEffect(() => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('customer_token');
    setLoading(false);
  }, []);

  // Admin login (frontend-only: no backend)
  const signInAdmin = async (email: string, password: string) => {
    throw new Error('Backend not available - authentication disabled');
  };

  // Admin signup (frontend-only: no backend)
  const signUpAdmin = async (email: string, password: string, ownerData: Partial<Owner>) => {
    throw new Error('Backend not available - registration disabled');
  };

  // Customer login (frontend-only: no backend)
  const signInCustomer = async (email: string, password: string) => {
    throw new Error('Backend not available - authentication disabled');
  };

  // Customer signup (frontend-only: no backend)
  const signUpCustomer = async (email: string, password: string, customerData: { name: string; phone: string }) => {
    throw new Error('Backend not available - registration disabled');
  };

  // Legacy methods
  const signIn = signInAdmin;
  const signUp = signUpAdmin;

  const signOut = async () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('customer_token');
    setUser(null);
    setUserType(null);
  };

  const value = {
    user,
    owner,
    userType,
    loading,
    signIn,
    signUp,
    signInAdmin,
    signUpAdmin,
    signInCustomer,
    signUpCustomer,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

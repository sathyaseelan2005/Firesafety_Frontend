import { createContext, useContext, useEffect, useState } from 'react';
import type { Owner } from '../lib/database.types';
import { authApi } from '../services/authApi';

const ADMIN_TOKEN_KEY = 'admin_access_token';

export type UserType = 'admin' | 'customer' | null;

interface AuthContextType {
  user: unknown | null;
  owner: Owner | null;
  userType: UserType;
  loading: boolean;
  /** True when admin has valid JWT (OTP verified). */
  isAdminAuthenticated: boolean;
  /** JWT for authorized admin API calls (null if not logged in). */
  getAdminToken: () => string | null;
  /** Request OTP for admin login (sends to configured admin email). */
  requestAdminOtp: () => Promise<void>;
  /** Verify OTP; on success stores JWT and sets admin authenticated. */
  verifyAdminOtp: (otp: string) => Promise<void>;
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
  const [owner] = useState<Owner | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [adminToken, setAdminToken] = useState<string | null>(() =>
    localStorage.getItem(ADMIN_TOKEN_KEY)
  );
  const [loading, setLoading] = useState(true);

  const isAdminAuthenticated = !!adminToken;

  useEffect(() => {
    if (adminToken) {
      localStorage.setItem(ADMIN_TOKEN_KEY, adminToken);
    } else {
      localStorage.removeItem(ADMIN_TOKEN_KEY);
    }
  }, [adminToken]);

  useEffect(() => {
    localStorage.removeItem('customer_token');
    setLoading(false);
  }, []);

  const requestAdminOtp = async () => {
    await authApi.requestOtp();
  };

  const verifyAdminOtp = async (otp: string) => {
    const { access_token } = await authApi.verifyOtp(otp);
    setAdminToken(access_token);
    setUserType('admin');
  };

  // Admin login (legacy password – use OTP flow for admin)
  const signInAdmin = async (_email: string, _password: string) => {
    throw new Error('Use OTP login for admin');
  };

  // Admin signup (frontend-only: no backend)
  const signUpAdmin = async (_email: string, _password: string, _ownerData: Partial<Owner>) => {
    throw new Error('Backend not available - registration disabled');
  };

  // Customer login (frontend-only: no backend)
  const signInCustomer = async (_email: string, _password: string) => {
    throw new Error('Backend not available - authentication disabled');
  };

  // Customer signup (frontend-only: no backend)
  const signUpCustomer = async (_email: string, _password: string, _customerData: { name: string; phone: string }) => {
    throw new Error('Backend not available - registration disabled');
  };

  // Legacy methods
  const signIn = signInAdmin;
  const signUp = signUpAdmin;

  const signOut = async () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem('admin_token');
    localStorage.removeItem('customer_token');
    setAdminToken(null);
    setUser(null);
    setUserType(null);
  };

  const value = {
    user,
    owner,
    userType,
    loading,
    isAdminAuthenticated,
    getAdminToken: () => adminToken,
    requestAdminOtp,
    verifyAdminOtp,
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

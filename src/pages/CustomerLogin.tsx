import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';


interface CustomerLoginProps {
  onSuccess: () => void;
  onBack: () => void;
}

export const CustomerLogin = ({ onSuccess, onBack }: CustomerLoginProps) => {
  const { signInCustomer, signUpCustomer } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        await signUpCustomer(formData.email, formData.password, {
          name: formData.name,
          phone: formData.phone,
        });
        // Auto-login after successful registration
        await signInCustomer(formData.email, formData.password);
      } else {
        await signInCustomer(formData.email, formData.password);
      }
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-theme-bg flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="max-w-md w-full relative z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-theme-accent hover:text-red-400 text-sm font-medium mb-8 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login Options
        </button>

        <div className="bg-theme-surface rounded-2xl shadow-xl border border-theme-surface-hover p-8 shadow-black/50">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-theme-accent/10 rounded-full mb-4">
              <ShoppingBag className="w-8 h-8 text-theme-accent" />
            </div>
            <h1 className="text-2xl font-bold text-theme-text">
              {isSignUp ? 'Create Account' : 'Customer Login'}
            </h1>
            <p className="text-theme-text-muted mt-2">
              {isSignUp
                ? 'Create an account to browse and order tools'
                : 'Sign in to view and order fire safety tools'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-theme-text-muted mb-1.5">
                    <ShoppingBag className="w-4 h-4 text-theme-text-muted" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-theme-bg border border-theme-surface-hover rounded-lg text-theme-text focus:outline-none focus:ring-2 focus:ring-theme-accent focus:border-transparent placeholder-gray-600 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-theme-text-muted mb-1.5">
                    <Mail className="w-4 h-4 text-theme-text-muted" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-theme-bg border border-theme-surface-hover rounded-lg text-theme-text focus:outline-none focus:ring-2 focus:ring-theme-accent focus:border-transparent placeholder-gray-600 transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </>
            )}

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-theme-text-muted mb-1.5">
                <Mail className="w-4 h-4 text-theme-text-muted" />
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-theme-bg border border-theme-surface-hover rounded-lg text-theme-text focus:outline-none focus:ring-2 focus:ring-theme-accent focus:border-transparent placeholder-gray-600 transition-all"
                placeholder="customer@example.com"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-theme-text-muted mb-1.5">
                <Lock className="w-4 h-4 text-theme-text-muted" />
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-theme-bg border border-theme-surface-hover rounded-lg text-theme-text focus:outline-none focus:ring-2 focus:ring-theme-accent focus:border-transparent placeholder-gray-600 transition-all"
                  placeholder="••••••••"
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-200 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-theme-accent text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg shadow-theme-accent/20 active:transform active:scale-[0.98]"
            >
              {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center pt-6 border-t border-theme-surface-hover">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
              }}
              className="text-theme-accent hover:text-red-400 font-medium hover:underline text-sm"
            >
              {isSignUp
                ? 'Already have an account? Sign In'
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

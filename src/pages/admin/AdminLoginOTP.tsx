import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, ArrowLeft, Mail } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function AdminLoginOTP() {
  const { requestAdminOtp, verifyAdminOtp, isAdminAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpRequested, setOtpRequested] = useState(false);
  const [requestingOtp, setRequestingOtp] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Already logged in → redirect to dashboard
  useEffect(() => {
    if (isAdminAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAdminAuthenticated, navigate]);

  // Auto-request OTP on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setRequestingOtp(true);
      setError(null);
      try {
        await requestAdminOtp();
        if (!cancelled) setOtpRequested(true);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to send OTP');
        }
      } finally {
        if (!cancelled) setRequestingOtp(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [requestAdminOtp]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await verifyAdminOtp(otp);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setRequestingOtp(true);
    setError(null);
    try {
      await requestAdminOtp();
      setOtpRequested(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend OTP');
    } finally {
      setRequestingOtp(false);
    }
  };

  if (isAdminAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-theme-bg flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="max-w-md w-full relative z-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-theme-accent hover:text-red-400 text-sm font-medium mb-8 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-theme-surface rounded-2xl shadow-xl border border-theme-surface-hover p-8 shadow-black/50">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-theme-accent/10 rounded-full mb-4">
              <Shield className="w-8 h-8 text-theme-accent" />
            </div>
            <h1 className="text-2xl font-bold text-theme-text">Admin Login</h1>
            <p className="text-theme-text-muted mt-2">
              Enter the OTP sent to the configured admin email
            </p>
          </div>

          {requestingOtp && !otpRequested && (
            <div className="text-center py-6 text-theme-text-muted">
              Sending OTP to your email…
            </div>
          )}

          {otpRequested && (
            <form onSubmit={handleVerify} className="space-y-5">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-theme-text-muted mb-1.5">
                  <Mail className="w-4 h-4 text-theme-text-muted" />
                  OTP
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 8))}
                  placeholder="Enter 6-digit OTP"
                  className="w-full px-4 py-2.5 bg-theme-bg border border-theme-surface-hover rounded-lg text-theme-text focus:outline-none focus:ring-2 focus:ring-theme-accent focus:border-transparent placeholder-gray-600 transition-all text-center text-lg tracking-widest"
                  maxLength={8}
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-200 text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || otp.length < 4}
                className="w-full py-3 bg-theme-accent text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg shadow-theme-accent/20 active:transform active:scale-[0.98]"
              >
                {loading ? 'Verifying…' : 'Verify & Login'}
              </button>

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={requestingOtp}
                className="w-full py-2 text-theme-accent hover:text-red-400 text-sm font-medium disabled:opacity-50"
              >
                {requestingOtp ? 'Sending…' : 'Resend OTP'}
              </button>
            </form>
          )}

          {error && !otpRequested && (
            <div className="mt-4 space-y-2">
              <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-200 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {error}
              </div>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={requestingOtp}
                className="w-full py-2 text-theme-accent hover:text-red-400 text-sm font-medium"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

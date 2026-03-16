import { API_BASE } from '../config';

export interface RequestOtpResponse {
  message: string;
  expires_in_seconds?: number;
}

export interface VerifyOtpResponse {
  access_token: string;
  token_type: string;
}

export const authApi = {
  /**
   * Request OTP for admin login. Backend sends OTP to configured admin email.
   */
  async requestOtp(): Promise<RequestOtpResponse> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as { detail?: string }).detail ?? 'Failed to request OTP');
    }
    return res.json();
  },

  /**
   * Verify OTP and receive JWT access token.
   */
  async verifyOtp(otp: string): Promise<VerifyOtpResponse> {
    const res = await fetch(`${API_BASE}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ otp: otp.trim() }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const detail = (err as { detail?: string | { msg?: string }[] }).detail;
      const message = typeof detail === 'string'
        ? detail
        : Array.isArray(detail) && detail[0]?.msg
          ? detail[0].msg
          : 'Invalid or expired OTP';
      throw new Error(message);
    }
    return res.json();
  },
};

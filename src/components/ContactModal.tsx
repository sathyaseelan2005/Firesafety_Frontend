import { useState } from 'react';
import { X, Send, Mail, User, Phone, MessageSquare } from 'lucide-react';
import { enquiriesApi } from '../services/api';
import { useAnalytics } from '../contexts/AnalyticsContext';

interface ContactModalProps {
  toolId: string;
  toolName: string;
  ownerCompany: string;
  onClose: () => void;
  initialData?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

export const ContactModal = ({
  toolId,
  toolName,
  ownerCompany,
  onClose,
  initialData,
}: ContactModalProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { recordEnquiryClick } = useAnalytics();

    try {
      const result = await enquiriesApi.submit({
        tool_id: toolId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });

      setSuccess(true);
      // update frontend-only analytics for enquiries
      try {
        recordEnquiryClick();
      } catch (err) {
        if (import.meta.env.DEV) console.error('[analytics] ContactModal recordEnquiryClick error', err);
      }

      if (result.owner_email) {
        const mailtoLink = `mailto:${result.owner_email}?subject=${encodeURIComponent(
          result.mailto_subject || ''
        )}&body=${encodeURIComponent(result.mailto_body || '')}`;
        window.location.href = mailtoLink;
      }

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit enquiry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#1a1a1a] rounded-2xl shadow-2xl shadow-orange-500/10 border border-gray-800 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#1a1a1a]/95 backdrop-blur border-b border-gray-800 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-white tracking-wide">Contact Owner</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors bg-gray-800/50 hover:bg-gray-800 p-2 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/10 rounded-full mb-6 relative">
                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
                <Send className="w-10 h-10 text-green-500 relative z-10" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Enquiry Submitted!
              </h3>
              <p className="text-gray-400">
                Your email client will open to send the message to <span className="text-orange-500 font-semibold">{ownerCompany}</span>
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 p-4 bg-gray-800/50 border border-gray-700 rounded-xl">
                <p className="text-sm text-gray-400 flex flex-col gap-1">
                  <span>Inquiry for product:</span>
                  <span className="font-bold text-white text-lg">{toolName}</span>
                </p>
                <div className="mt-3 pt-3 border-t border-gray-700 flex items-center justify-between text-xs">
                  <span className="text-gray-500">Manufacturer</span>
                  <span className="text-orange-400 font-medium uppercase tracking-wider">{ownerCompany}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Your Name *
                    </label>
                    <div className="relative group">
                      <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-3 bg-black/40 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Your Email *
                    </label>
                    <div className="relative group">
                      <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-3 bg-black/40 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                    <div className="relative group">
                      <Phone className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-3 bg-black/40 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Your Message *
                    </label>
                    <div className="relative group">
                      <MessageSquare className="w-5 h-5 absolute left-3 top-3 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-3 bg-black/40 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all resize-none"
                        placeholder="I'm interested in learning more about this product..."
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    {error}
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-3 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800 hover:text-white transition-all font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-[2] flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 font-bold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>SEND ENQUIRY</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

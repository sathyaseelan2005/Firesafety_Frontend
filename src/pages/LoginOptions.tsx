import { Shield, ShoppingBag, Flame } from 'lucide-react';


interface LoginOptionsProps {
  onSelectAdmin: () => void;
  onSelectCustomer: () => void;
}

export const LoginOptions = ({ onSelectAdmin, onSelectCustomer }: LoginOptionsProps) => {
  return (
    <div className="min-h-screen bg-theme-bg flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="max-w-4xl w-full relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-theme-accent/10 rounded-full mb-6 shadow-lg shadow-theme-accent/20">
            <Flame className="w-10 h-10 text-theme-accent" />
          </div>
          <h1 className="text-4xl font-bold text-theme-text mb-2">Fire Safety Tools</h1>
          <p className="text-theme-text-muted text-lg">Select your login type to continue</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Admin Login Card */}
          <button
            onClick={onSelectAdmin}
            className="w-full text-left group"
          >
            <div className="p-8 bg-theme-surface border border-theme-surface-hover h-full rounded-2xl shadow-lg shadow-black/30 hover:shadow-theme-accent/10 hover:border-theme-accent transition-all duration-300">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-theme-accent/10 rounded-xl mb-6 group-hover:bg-theme-accent/20 transition-colors">
                <Shield className="w-7 h-7 text-theme-accent" />
              </div>
              <h2 className="text-2xl font-bold text-theme-text mb-3 group-hover:text-theme-accent transition-colors">Admin Portal</h2>
              <p className="text-theme-text-muted mb-6 leading-relaxed">
                Manage your fire safety tools inventory, upload new tools, and access your admin dashboard.
              </p>
              <div className="flex items-center gap-2 text-theme-accent font-semibold group-hover:translate-x-1 transition-transform">
                <span>Access Admin Dashboard</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>

          {/* Customer Login Card */}
          <button
            onClick={onSelectCustomer}
            className="w-full text-left group"
          >
            <div className="p-8 bg-theme-surface border border-theme-surface-hover h-full rounded-2xl shadow-lg shadow-black/30 hover:shadow-theme-accent/10 hover:border-theme-accent transition-all duration-300">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-theme-accent/10 rounded-xl mb-6 group-hover:bg-theme-accent/20 transition-colors">
                <ShoppingBag className="w-7 h-7 text-theme-accent" />
              </div>
              <h2 className="text-2xl font-bold text-theme-text mb-3 group-hover:text-theme-accent transition-colors">Customer Portal</h2>
              <p className="text-theme-text-muted mb-6 leading-relaxed">
                Browse and order fire safety tools from verified suppliers. View product details and place your orders.
              </p>
              <div className="flex items-center gap-2 text-theme-accent font-semibold group-hover:translate-x-1 transition-transform">
                <span>Browse Products</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-12 text-center text-theme-text-muted">
          <p>Can't find what you're looking for?</p>
          <a href="#" className="text-theme-accent hover:text-orange-500 font-semibold hover:underline">
            Contact our support team
          </a>
        </div>
      </div>
    </div>
  );
};

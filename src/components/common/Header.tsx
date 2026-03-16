import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAdminAuthenticated } = useAuth();

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/contact', label: 'Contact' },
  ];

  const adminLink = isAdminAuthenticated ? '/admin' : '/admin/login';

  return (
    <header className="fixed w-full top-0 z-50 bg-theme-bg/90 backdrop-blur-sm text-theme-text border-b border-theme-surface-hover">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20 gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 group flex-1 lg:flex-initial"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Shield className="w-10 h-10 text-theme-accent group-hover:scale-110 transition-transform" />
            <div className="flex flex-col items-start leading-none">
              <span className="text-xl font-black tracking-wider text-theme-accent">KUMARAN SAFETY</span>
              <span className="text-[10px] text-theme-text-muted">Safety Equipments</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === to ? 'text-theme-accent' : 'text-theme-text-muted hover:text-theme-text'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              to={adminLink}
              className="text-sm font-medium text-theme-text-muted hover:text-theme-text"
            >
              Admin
            </Link>
          </nav>

          <button
            className="lg:hidden p-2 text-theme-text hover:text-theme-accent"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-theme-surface border-t border-theme-surface-hover">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navItems.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 hover:text-theme-accent ${location.pathname === to ? 'text-theme-accent' : ''}`}
              >
                {label}
              </Link>
            ))}
            <Link to={adminLink} onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-theme-accent">
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

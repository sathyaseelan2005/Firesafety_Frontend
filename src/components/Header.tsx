import { Shield, Menu, X, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onNavigate: (path: string) => void;
}

export const Header = ({ onNavigate }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-theme-bg/90 backdrop-blur-sm text-theme-text border-b border-theme-surface-hover">


      {/* Main Navigation */}
      <div className="bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20 gap-4">
            {/* Back Button */}
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center gap-2 text-theme-text hover:text-theme-accent transition-colors"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-6 h-6" />
              
            </button>

            {/* Logo */}
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center gap-2 group flex-1"
            >
              <Shield className="w-10 h-10 text-theme-accent group-hover:scale-110 transition-transform" />
              <div className="flex flex-col items-start leading-none">
                <span className="text-2xl font-black tracking-wider text-theme-accent">KUMARAN CHEMICAL</span>
                <span className="text-[10px] text-theme-text-muted">Dealers in Salt, Acid & Chemicals</span>
              </div>
            </button>

            {/* Desktop Menu */}


            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-white hover:text-theme-accent"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-theme-surface border-t border-theme-surface-hover">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <button onClick={() => { onNavigate('/'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-theme-accent">ABOUT</button>
            <button onClick={() => { onNavigate('/products'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-theme-accent">PRODUCTS</button>
            <button onClick={() => { onNavigate('/'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:text-theme-accent">INDUSTRIES</button>

          </div>
        </div>
      )}
    </header>
  );
};

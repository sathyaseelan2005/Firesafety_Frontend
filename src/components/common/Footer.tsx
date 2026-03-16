import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-theme-surface border-t border-theme-surface-hover text-theme-text-on-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-theme-accent" />
            <span className="font-bold text-theme-text">Kumaran Safety Equipments</span>
          </div>
          <div>
            <h4 className="font-semibold text-theme-text mb-3">Quick Links</h4>
            <nav className="flex flex-col gap-2 text-theme-text-muted">
              <Link to="/" className="hover:text-theme-accent">Home</Link>
              <Link to="/products" className="hover:text-theme-accent">Products</Link>
              <Link to="/contact" className="hover:text-theme-accent">Contact</Link>
            </nav>
          </div>
          <div>
            <h4 className="font-semibold text-theme-text mb-3">Contact</h4>
            <div className="space-y-2 text-theme-text-muted text-sm">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-theme-accent shrink-0" />
                Erode, Tamil Nadu
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-theme-accent shrink-0" />
                +91 93611 49490
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-theme-accent shrink-0" />
                kumarans2020@gmail.com
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-theme-surface-hover text-center text-sm text-theme-text-muted">
          © {new Date().getFullYear()} Kumaran Safety Equipments. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

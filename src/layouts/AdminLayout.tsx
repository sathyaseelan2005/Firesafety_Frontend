import { Outlet, Link, useLocation } from 'react-router-dom';
import { Shield, LayoutDashboard, Package, BarChart3, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function AdminLayout() {
  const location = useLocation();
  const { signOut } = useAuth();
  const nav = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/products', label: 'Products', icon: Package },
    { path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-theme-bg flex">
      <aside className="w-56 bg-theme-surface border-r border-theme-surface-hover flex flex-col">
        <div className="p-4 border-b border-theme-surface-hover flex items-center gap-2">
          <Shield className="w-8 h-8 text-theme-accent" />
          <span className="font-bold text-theme-text">Admin</span>
        </div>
        <nav className="p-2 flex-1">
          {nav.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === path || (path !== '/admin' && location.pathname.startsWith(path))
                  ? 'bg-theme-accent/10 text-theme-accent'
                  : 'text-theme-text-muted hover:bg-theme-surface-hover hover:text-theme-text'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-2 border-t border-theme-surface-hover space-y-1">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-theme-text-muted hover:bg-theme-surface-hover hover:text-theme-text"
          >
            ← View site
          </Link>
          <button
            type="button"
            onClick={() => signOut()}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-theme-text-muted hover:bg-theme-surface-hover hover:text-theme-text"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/Header';
import { ToolsList } from './pages/ToolsList';
import { ToolDetails } from './pages/ToolDetails';
import { LoginOptions } from './pages/LoginOptions';
import { AdminLogin } from './pages/AdminLogin';
import { CustomerLogin } from './pages/CustomerLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { CareerPage } from './pages/CareerPage';

import { ContactPage } from './pages/ContactPage';

import { LandingPage } from './pages/LandingPage';
import { CardSwapDemo } from './pages/CardSwapDemo';
import { DockDemo } from './pages/DockDemo';

type Route = 'home' | 'tool-details' | 'login-options' | 'admin-login' | 'customer-login' | 'admin' | 'customer-home' | 'products' | 'career' | 'contact' | 'card-demo' | 'dock-demo';

const AppContent = () => {
  const { user, userType, loading } = useAuth();
  const [currentRoute, setCurrentRoute] = useState<Route>('home');
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);

  /*
     Navigation is now driven by window.location.hash to support browser back/forward buttons.
     The useEffect below listens to hash changes and updates currentRoute/selectedToolId accordingly.
  */
  useEffect(() => {
    const handleHashChange = () => {
      // Remove leading '#' and split by '/'
      const hash = window.location.hash.replace(/^#/, '');
      const parts = hash.split('/');
      const mainRoute = parts[0];

      if (!mainRoute || mainRoute === 'home') {
        setCurrentRoute('home');
        setSelectedToolId(null);
      } else if (mainRoute === 'products') {
        setCurrentRoute('products');
        setSelectedToolId(null);
      } else if (mainRoute === 'tool' && parts[1]) {
        setSelectedToolId(parts[1]);
        setCurrentRoute('tool-details');
      } else if (mainRoute === 'login') {
        setCurrentRoute('login-options');
      } else if (mainRoute === 'admin-login') {
        setCurrentRoute('admin-login');
      } else if (mainRoute === 'customer-login') {
        setCurrentRoute('customer-login');
      } else if (mainRoute === 'admin') {
        setCurrentRoute('admin');
      } else if (mainRoute === 'customer-home') {
        setCurrentRoute('customer-home');
      } else if (mainRoute === 'career') {
        setCurrentRoute('career');
      } else if (mainRoute === 'contact') {
        setCurrentRoute('contact');
      } else if (mainRoute === 'card-demo') {
        setCurrentRoute('card-demo');
      } else if (mainRoute === 'dock-demo') {
        setCurrentRoute('dock-demo');
      } else {
        // Fallback
        setCurrentRoute('home');
      }
    };

    // Initialize on mount
    handleHashChange();

    // Listen for changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []); // Empty dependency array means this runs once on mount + cleanup

  const navigate = (path: string) => {
    if (path === '/') window.location.hash = 'home';
    else if (path === '/products') window.location.hash = 'products';
    else if (path === '/login') window.location.hash = 'login';
    else if (path === '/admin') window.location.hash = 'admin';
    else if (path === '/career') window.location.hash = 'career';
    else if (path === '/contact') window.location.hash = 'contact';
    else window.location.hash = path.replace(/^\//, ''); // Fallback for other paths
  };

  const handleToolClick = (toolId: string) => {
    // This will trigger hashchange -> updates state
    window.location.hash = `tool/${toolId}`;
  };

  const handleBackToHome = () => {
    window.location.hash = 'products';
  };

  const handleAdminLoginSuccess = () => {
    window.location.hash = 'admin';
  };

  const handleCustomerLoginSuccess = () => {
    window.location.hash = 'customer-home';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-accent"></div>
      </div>
    );
  }

  // Login routes
  if (currentRoute === 'login-options') {
    return (
      <LoginOptions
        onSelectAdmin={() => (window.location.hash = 'admin-login')}
        onSelectCustomer={() => (window.location.hash = 'customer-login')}
      />
    );
  }

  if (currentRoute === 'admin-login') {
    return (
      <AdminLogin
        onSuccess={handleAdminLoginSuccess}
        onBack={() => (window.location.hash = 'login')}
      />
    );
  }

  if (currentRoute === 'customer-login') {
    return (
      <CustomerLogin
        onSuccess={handleCustomerLoginSuccess}
        onBack={() => (window.location.hash = 'login')}
      />
    );
  }

  // If user is authenticated as admin
  if (currentRoute === 'admin' && user && userType === 'admin') {
    return (
      <div className="min-h-screen bg-theme-bg">
        <Header onNavigate={navigate} />
        <div className="pt-[100px]">
          <AdminDashboard onViewTool={handleToolClick} />
        </div>
      </div>
    );
  }

  // If user is authenticated as customer or on home
  return (
    <div className="min-h-screen bg-theme-bg">
      {currentRoute !== 'home' && <Header onNavigate={navigate} />}
      <div className={currentRoute === 'home' ? '' : 'pt-[80px]'}>
        {currentRoute === 'home' && <LandingPage onNavigate={navigate} />}
        {(currentRoute === 'products' || currentRoute === 'customer-home') && <ToolsList onToolClick={handleToolClick} />}
        {currentRoute === 'tool-details' && selectedToolId && (
          <ToolDetails toolId={selectedToolId} onBack={handleBackToHome} />
        )}
        {currentRoute === 'career' && <CareerPage onBack={() => navigate('/')} />}
        {currentRoute === 'contact' && <ContactPage />}
        {currentRoute === 'card-demo' && <CardSwapDemo />}
        {currentRoute === 'dock-demo' && <DockDemo />}
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

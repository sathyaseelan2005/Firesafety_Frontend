import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { Home } from '../pages/public/Home';
import { Products } from '../pages/public/Products';
import { ProductDetails } from '../pages/public/ProductDetails';
import { Contact } from '../pages/public/Contact';
import { AdminLoginOTP } from '../pages/admin/AdminLoginOTP';
import { Dashboard } from '../pages/admin/Dashboard';
import { ProductsList } from '../pages/admin/ProductsList';
import ProductCreate from "../pages/admin/ProductCreate";
import { ProductEdit } from '../pages/admin/ProductEdit';
import { Analytics } from '../pages/admin/Analytics';
import { useAuth } from '../contexts/AuthContext';

function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const { isAdminAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <span className="text-theme-text-muted">Loading…</span>
      </div>
    );
  }
  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:productId" element={<ProductDetails />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Admin login (OTP) – no layout */}
        <Route path="/admin/login" element={<AdminLoginOTP />} />

        {/* Admin dashboard – protected by JWT */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route path="/admin/products/new" element={<ProductCreate />} />
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="products/:productId/edit" element={<ProductEdit />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

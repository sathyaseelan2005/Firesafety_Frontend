import { AnalyticsProvider } from './contexts/AnalyticsContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProductsProvider } from './contexts/ProductsContext';
import { AppRoutes } from './routes/AppRoutes';
import ChatbotWidget from "./components/ChatbotWidget";

function App() {
  return (
    <AuthProvider>
      <AnalyticsProvider>
        <ProductsProvider>
          <AppRoutes />
          <ChatbotWidget />
        </ProductsProvider>
      </AnalyticsProvider>
    </AuthProvider>
  );
}

export default App;

import { createContext, useContext, useCallback, useState, ReactNode } from 'react';
import { useEffect } from 'react';

/** Local analytics: product views and enquiry clicks. No backend. */

interface AnalyticsState {
  productViews: Record<number, number>;
  enquiryClicks: number;
}

interface AnalyticsContextValue extends AnalyticsState {
  recordProductView: (productId: number) => void
  recordEnquiryClick: () => void
  getProductViewCount: (productId: number) => number
  getTotalViews: () => number
  getConversionRate: () => number
}

const initialState: AnalyticsState = {
  productViews: {},
  enquiryClicks: 0,
};

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null);

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AnalyticsState>(() => {
      const saved = localStorage.getItem("analytics");
      return saved ? JSON.parse(saved) : initialState;
    });
  
  useEffect(() => {
  localStorage.setItem("analytics", JSON.stringify(state));
}, [state]);

  // Sync analytics across tabs: listen for storage events and update state
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key !== 'analytics') return;
      try {
        if (!e.newValue) return;
        const parsed = JSON.parse(e.newValue);
        // basic validation
        if (parsed && (parsed.productViews || parsed.enquiryClicks >= 0)) {
          setState(parsed);
        }
      } catch (err) {
        if (import.meta.env.DEV) console.error('[analytics] storage sync parse error', err);
      }
    };

    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const recordProductView = useCallback((productId: number) => {
  setState((prev) => ({
    ...prev,
    productViews: {
      ...prev.productViews,
      [productId]: (prev.productViews[productId] ?? 0) + 1,
    },
  }));
}, []);

  const recordEnquiryClick = useCallback(() => {
    setState((prev) => ({ ...prev, enquiryClicks: prev.enquiryClicks + 1 }));
  }, []);

  const getProductViewCount = useCallback(
      (productId: number) => state.productViews[productId] ?? 0,
    [state.productViews]
  );

  const getTotalViews = useCallback(() => {
    return Object.values(state.productViews).reduce((a, b) => a + b, 0);
  }, [state.productViews]);

  const getConversionRate = useCallback(() => {
    const total = getTotalViews();
    if (total === 0) return 0;
    return Math.round((state.enquiryClicks / total) * 100);
  }, [state.enquiryClicks, getTotalViews]);

  const value: AnalyticsContextValue = {
    ...state,
    recordProductView,
    recordEnquiryClick,
    getProductViewCount,
    getTotalViews,
    getConversionRate,
  };

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>;
}

export function useAnalytics(): AnalyticsContextValue {
  const ctx = useContext(AnalyticsContext);
  if (!ctx) throw new Error('useAnalytics must be used within AnalyticsProvider');
  return ctx;
}

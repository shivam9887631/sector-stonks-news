
import React, { createContext, useContext, ReactNode } from 'react';
import { Company } from '@/services/apiService';
import { useStockData } from '@/hooks/useStockData';

interface StockDataContextType {
  companies: Company[];
  loading: boolean;
  lastUpdated: Date | null;
  refreshData: () => Promise<void>;
}

const StockDataContext = createContext<StockDataContextType | undefined>(undefined);

interface StockDataProviderProps {
  children: ReactNode;
  refreshInterval?: number;
}

export const StockDataProvider: React.FC<StockDataProviderProps> = ({ 
  children,
  refreshInterval = 60000 // Default: 1 minute
}) => {
  const stockData = useStockData(refreshInterval);
  
  return (
    <StockDataContext.Provider value={stockData}>
      {children}
    </StockDataContext.Provider>
  );
};

export const useStockDataContext = (): StockDataContextType => {
  const context = useContext(StockDataContext);
  if (context === undefined) {
    throw new Error('useStockDataContext must be used within a StockDataProvider');
  }
  return context;
};

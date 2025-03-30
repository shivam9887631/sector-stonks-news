
import { useState, useEffect } from 'react';
import { fetchAllCompanies, Company } from '@/services/apiService';
import { fetchStockQuotes, updateCompaniesWithRealTimeData } from '@/services/stockApiService';
import { useToast } from "@/components/ui/use-toast";

export const useStockData = (
  refreshInterval: number = 60000, // Default refresh interval of 1 minute
  initialFetch: boolean = true
) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { toast } = useToast();

  const refreshData = async () => {
    try {
      setLoading(true);
      
      // Get base company data from our API
      const companiesData = await fetchAllCompanies();
      
      // Extract tickers to fetch real-time data
      const tickers = companiesData.map(company => company.ticker);
      
      // Fetch real-time quotes
      const quotes = await fetchStockQuotes(tickers);
      
      // Update companies with real-time data
      const updatedCompanies = updateCompaniesWithRealTimeData(companiesData, quotes);
      
      setCompanies(updatedCompanies);
      setLastUpdated(new Date());
      
    } catch (error) {
      console.error('Error refreshing stock data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch latest stock data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (initialFetch) {
      refreshData();
    }
  }, [initialFetch]);

  // Set up auto-refresh interval
  useEffect(() => {
    if (refreshInterval > 0) {
      const intervalId = setInterval(refreshData, refreshInterval);
      return () => clearInterval(intervalId);
    }
  }, [refreshInterval]);

  return {
    companies,
    loading,
    lastUpdated,
    refreshData
  };
};


import React, { useEffect, useState } from 'react';
import { Container } from "@/components/ui/container";
import { fetchAllSectors, Sector } from '@/services/apiService';
import SectorCard from '@/components/SectorCard';
import Navbar from '@/components/Navbar';
import { useToast } from "@/components/ui/use-toast";
import { useStockDataContext } from '@/components/StockDataProvider';
import { Button } from "@/components/ui/button";
import { RefreshCcw } from 'lucide-react';

const Sectors = () => {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { refreshData, lastUpdated } = useStockDataContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sectorsData = await fetchAllSectors();
        setSectors(sectorsData);
      } catch (error) {
        console.error('Error fetching sectors:', error);
        toast({
          title: "Error",
          description: "Failed to fetch sector data. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const formatLastUpdated = () => {
    if (!lastUpdated) return 'Not updated yet';
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    }).format(lastUpdated);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="py-8">
        <Container>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Market Sectors</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                Last updated: {formatLastUpdated()}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => refreshData()}
                className="flex items-center gap-1"
              >
                <RefreshCcw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="h-96 bg-gray-200 animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sectors.map((sector) => (
                <SectorCard key={sector.id} sector={sector} />
              ))}
            </div>
          )}
        </Container>
      </main>
    </div>
  );
};

export default Sectors;


import React, { useEffect, useState } from 'react';
import { Container } from "@/components/ui/container";
import { fetchAllSectors, Sector } from '@/services/apiService';
import SectorCard from '@/components/SectorCard';
import Navbar from '@/components/Navbar';
import { useToast } from "@/components/ui/use-toast";

const Sectors = () => {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="py-8">
        <Container>
          <h1 className="text-3xl font-bold mb-8">Market Sectors</h1>
          
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

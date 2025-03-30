
import React, { useEffect, useState } from 'react';
import { Container } from "@/components/ui/container";
import { fetchAllSectors, fetchLatestNews, Sector, NewsArticle } from '@/services/apiService';
import SectorCard from '@/components/SectorCard';
import NewsItem from '@/components/NewsItem';
import Navbar from '@/components/Navbar';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sectorsData, newsData] = await Promise.all([
          fetchAllSectors(),
          fetchLatestNews(5)
        ]);
        
        setSectors(sectorsData);
        setNews(newsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to fetch market data. Please try again later.",
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
          <h1 className="text-3xl font-bold mb-8">Market Overview</h1>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="h-96 bg-gray-200 animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {sectors.map((sector) => (
                  <SectorCard key={sector.id} sector={sector} />
                ))}
              </div>
              
              <h2 className="text-2xl font-bold mb-4">Latest Market News</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {news.map((article) => (
                  <NewsItem key={article.id} article={article} />
                ))}
              </div>
            </>
          )}
        </Container>
      </main>
    </div>
  );
};

export default Index;

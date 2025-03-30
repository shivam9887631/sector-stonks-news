
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  fetchSectorById, 
  fetchTopCompaniesBySector, 
  fetchNewsBySector,
  fetchMarketAnalysis,
  Sector, 
  Company, 
  NewsArticle 
} from '@/services/apiService';
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CompanyCard from '@/components/CompanyCard';
import NewsItem from '@/components/NewsItem';
import CompanyComparison from '@/components/CompanyComparison';
import MarketAnalysis from '@/components/MarketAnalysis';
import { useToast } from "@/components/ui/use-toast";

const SectorDetail = () => {
  const { sectorId } = useParams<{ sectorId: string }>();
  const [sector, setSector] = useState<Sector | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [marketAnalysis, setMarketAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      if (!sectorId) return;
      
      setLoading(true);
      try {
        const [sectorData, companiesData, newsData, analysisData] = await Promise.all([
          fetchSectorById(sectorId),
          fetchTopCompaniesBySector(sectorId, 5),
          fetchNewsBySector(sectorId),
          fetchMarketAnalysis(sectorId)
        ]);
        
        if (sectorData) {
          setSector(sectorData);
          setCompanies(companiesData);
          setNews(newsData.slice(0, 5)); // Limit to 5 news items
          setMarketAnalysis(analysisData);
        } else {
          toast({
            title: "Error",
            description: "Sector not found",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('Error fetching sector data:', error);
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
  }, [sectorId, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Container className="py-8">
          <div className="w-full h-96 bg-gray-200 animate-pulse rounded-lg"></div>
        </Container>
      </div>
    );
  }

  if (!sector) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Container className="py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Sector not found</h1>
          <Link to="/">
            <Button>
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="py-8">
        <Container>
          <div className="mb-6">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-3">
              <h1 className="text-3xl font-bold flex items-center">
                <span 
                  className="w-4 h-4 rounded-full mr-2" 
                  style={{ backgroundColor: sector.color }}
                />
                {sector.name} Sector Overview
              </h1>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <CompanyComparison companies={companies} />
            </div>
            <div className="lg:col-span-1">
              <MarketAnalysis sectorId={sector.id} data={marketAnalysis} />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Top Companies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {news.map((article) => (
              <NewsItem key={article.id} article={article} />
            ))}
          </div>
        </Container>
      </main>
    </div>
  );
};

export default SectorDetail;

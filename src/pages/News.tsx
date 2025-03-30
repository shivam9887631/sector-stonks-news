
import React, { useEffect, useState } from 'react';
import { Container } from "@/components/ui/container";
import { fetchLatestNews, NewsArticle } from '@/services/apiService';
import NewsItem from '@/components/NewsItem';
import Navbar from '@/components/Navbar';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Filter } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const News = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsData = await fetchLatestNews(20); // Get more news for this page
        setNews(newsData);
      } catch (error) {
        console.error('Error fetching news:', error);
        toast({
          title: "Error",
          description: "Failed to fetch news. Please try again later.",
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
      
      <main className="py-4 md:py-8">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">Market News</h1>
            
            {isMobile ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="p-4 rounded-t-xl">
                  <SheetHeader className="pb-4">
                    <SheetTitle>Filter News</SheetTitle>
                  </SheetHeader>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">Latest</Button>
                    <Button variant="outline" size="sm">Technology</Button>
                    <Button variant="outline" size="sm">Finance</Button>
                    <Button variant="outline" size="sm">Healthcare</Button>
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">Latest</Button>
                <Button variant="outline" size="sm">Technology</Button>
                <Button variant="outline" size="sm">Finance</Button>
                <Button variant="outline" size="sm">Healthcare</Button>
              </div>
            )}
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(9)].map((_, idx) => (
                <div key={idx} className="h-48 bg-gray-200 animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {news.map((article) => (
                <NewsItem key={article.id} article={article} />
              ))}
            </div>
          )}
        </Container>
      </main>
    </div>
  );
};

export default News;

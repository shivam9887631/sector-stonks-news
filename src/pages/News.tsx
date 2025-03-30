
import React, { useEffect, useState } from 'react';
import { Container } from "@/components/ui/container";
import { fetchLatestNews, NewsArticle } from '@/services/apiService';
import NewsItem from '@/components/NewsItem';
import Navbar from '@/components/Navbar';
import { useToast } from "@/components/ui/use-toast";

const News = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

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
      
      <main className="py-8">
        <Container>
          <h1 className="text-3xl font-bold mb-8">Market News</h1>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(9)].map((_, idx) => (
                <div key={idx} className="h-48 bg-gray-200 animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

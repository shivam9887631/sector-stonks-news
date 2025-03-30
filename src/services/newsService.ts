
import { NewsArticle } from '@/types/marketTypes';
import { newsArticles } from './mockData';

export const fetchNewsBySector = async (sectorId: string): Promise<NewsArticle[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredNews = newsArticles.filter(article => article.sectorId === sectorId);
      resolve(filteredNews);
    }, 300);
  });
};

export const fetchLatestNews = async (limit: number = 10): Promise<NewsArticle[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(newsArticles.slice(0, limit));
    }, 300);
  });
};

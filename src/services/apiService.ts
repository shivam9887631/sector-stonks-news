
// Central export file for all API services
// This ensures backward compatibility with existing code

export type { Sector, Company, NewsArticle } from '@/types/marketTypes';

// Re-export all service functions
export { 
  fetchAllSectors, 
  fetchSectorById,
  fetchMarketAnalysis
} from './sectorService';

export {
  fetchTopCompaniesBySector,
  fetchAllCompanies
} from './companyService';

export {
  fetchNewsBySector,
  fetchLatestNews
} from './newsService';

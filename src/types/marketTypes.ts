
// Define common types used across the market data services

export interface Sector {
  id: string;
  name: string;
  color: string;
  data: Array<{ name: string; value: number }>;
  metrics: Array<{ name: string; value: string | number }>;
  companies: Company[];
  marketAnalysis: {
    metrics: Array<{
      name: string;
      impact: string;
      trend: 'upward' | 'stable' | 'decreasing';
    }>;
    summary: string;
  };
}

export interface Company {
  id: string;
  sectorId: string;
  name: string;
  ticker: string;
  price: number;
  change: number;
  changePercent: number;
  color: string;
  data: Array<{ date: string; price: number }>;
}

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  date: string;
  source: string;
  url: string;
  company?: string;
  sectorId: string;
}

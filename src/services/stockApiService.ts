
import { Company } from './apiService';

// Using Alpha Vantage API for stock data
// Note: This is a free API with rate limits (5 API requests per minute and 500 per day)
const API_KEY = 'demo'; // Replace with your Alpha Vantage API key for production use

export interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  lastUpdated: Date;
}

// Fetch real-time stock quote for a single ticker
export const fetchStockQuote = async (ticker: string): Promise<StockQuote | null> => {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Check if we got valid data
    if (!data['Global Quote'] || Object.keys(data['Global Quote']).length === 0) {
      console.warn(`No data returned for ${ticker}`);
      return null;
    }
    
    const quote = data['Global Quote'];
    
    return {
      symbol: ticker,
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
      lastUpdated: new Date()
    };
  } catch (error) {
    console.error(`Error fetching stock data for ${ticker}:`, error);
    return null;
  }
};

// Fetch multiple stock quotes
export const fetchStockQuotes = async (tickers: string[]): Promise<Map<string, StockQuote>> => {
  const quotes = new Map<string, StockQuote>();
  
  // Due to API rate limits, we need to fetch one at a time
  for (const ticker of tickers) {
    const quote = await fetchStockQuote(ticker);
    if (quote) {
      quotes.set(ticker, quote);
    }
    
    // Add a small delay between requests to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  return quotes;
};

// Update company objects with real-time data
export const updateCompaniesWithRealTimeData = (
  companies: Company[], 
  quotes: Map<string, StockQuote>
): Company[] => {
  return companies.map(company => {
    const quote = quotes.get(company.ticker);
    
    if (quote) {
      return {
        ...company,
        price: quote.price,
        change: quote.change,
        changePercent: quote.changePercent,
        lastUpdated: quote.lastUpdated
      };
    }
    
    return company;
  });
};

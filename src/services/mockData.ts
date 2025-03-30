
import { Company, Sector, NewsArticle } from '@/types/marketTypes';

// Helper to generate realistic stock data for a company
export const generateStockData = (basePrice: number, volatility: number) => {
  const result = [];
  let currentPrice = basePrice;
  
  for (let i = 1; i <= 31; i++) {
    const month = i <= 15 ? '01' : '02';
    const day = (i <= 15 ? i : i - 15).toString().padStart(2, '0');
    const date = `2024-${month}-${day}`;
    
    // Random walk with drift
    const change = (Math.random() - 0.4) * volatility; // Slight upward bias
    currentPrice = Math.max(currentPrice + change, basePrice * 0.7); // Prevent crashing too far
    
    result.push({
      date,
      price: parseFloat(currentPrice.toFixed(2))
    });
  }
  
  return result;
};

// Mock sectors data
export const sectors: Sector[] = [
  {
    id: "technology",
    name: "Technology",
    color: "#3b82f6", // Blue
    data: [
      { name: "Jan", value: 65 },
      { name: "Feb", value: 59 },
      { name: "Mar", value: 80 },
      { name: "Apr", value: 81 },
      { name: "May", value: 56 },
      { name: "Jun", value: 55 },
    ],
    metrics: [
      { name: "Revenue", value: "$12,345M" },
      { name: "Growth", value: "+15%" },
      { name: "Users", value: "1,234K" },
    ],
    companies: [], // Will be populated below
    marketAnalysis: {
      metrics: [
        { name: "Market Sentiment", impact: "Positive", trend: "upward" },
        { name: "Innovation Rate", impact: "High", trend: "stable" },
        { name: "Risk Level", impact: "Moderate", trend: "decreasing" },
      ],
      summary: "Based on recent news and market trends, the technology sector shows strong growth potential with increasing innovation and strategic partnerships. Market leaders are actively adapting to regulatory changes while maintaining competitive advantages. Investor sentiment remains positive, though careful monitoring of emerging risks is advised."
    }
  },
  {
    id: "finance",
    name: "Finance",
    color: "#10b981", // Green
    data: [
      { name: "Jan", value: 70 },
      { name: "Feb", value: 60 },
      { name: "Mar", value: 80 },
      { name: "Apr", value: 82 },
      { name: "May", value: 56 },
      { name: "Jun", value: 55 },
    ],
    metrics: [
      { name: "Revenue", value: "$12,345M" },
      { name: "Growth", value: "+15%" },
      { name: "Users", value: "1,234K" },
    ],
    companies: [], // Will be populated below
    marketAnalysis: {
      metrics: [
        { name: "Market Sentiment", impact: "Positive", trend: "upward" },
        { name: "Innovation Rate", impact: "Medium", trend: "stable" },
        { name: "Risk Level", impact: "Low", trend: "decreasing" },
      ],
      summary: "The finance sector demonstrates stability with consistent revenue growth despite market volatility. Major banks and financial institutions are embracing digital transformation and fintech partnerships to enhance customer experiences. Regulatory changes are being navigated effectively, with most companies maintaining strong balance sheets and capital reserves."
    }
  },
  {
    id: "healthcare",
    name: "Healthcare",
    color: "#8b5cf6", // Purple
    data: [
      { name: "Jan", value: 62 },
      { name: "Feb", value: 58 },
      { name: "Mar", value: 79 },
      { name: "Apr", value: 80 },
      { name: "May", value: 55 },
      { name: "Jun", value: 54 },
    ],
    metrics: [
      { name: "Revenue", value: "$12,345M" },
      { name: "Growth", value: "+15%" },
      { name: "Users", value: "1,234K" },
    ],
    companies: [], // Will be populated below
    marketAnalysis: {
      metrics: [
        { name: "Market Sentiment", impact: "Positive", trend: "upward" },
        { name: "Innovation Rate", impact: "Very High", trend: "upward" },
        { name: "Risk Level", impact: "Moderate", trend: "stable" },
      ],
      summary: "Healthcare continues to lead in innovation with breakthrough treatments and technologies reshaping patient care. The sector is experiencing strong investment in research and development, particularly in biotechnology and digital health solutions. While regulatory approval processes remain challenging, companies with diverse pipelines are well-positioned for sustained growth."
    }
  },
  {
    id: "energy",
    name: "Energy",
    color: "#f59e0b", // Yellow/Orange
    data: [
      { name: "Jan", value: 63 },
      { name: "Feb", value: 60 },
      { name: "Mar", value: 78 },
      { name: "Apr", value: 79 },
      { name: "May", value: 57 },
      { name: "Jun", value: 56 },
    ],
    metrics: [
      { name: "Revenue", value: "$12,345M" },
      { name: "Growth", value: "+15%" },
      { name: "Users", value: "1,234K" },
    ],
    companies: [], // Will be populated below
    marketAnalysis: {
      metrics: [
        { name: "Market Sentiment", impact: "Neutral", trend: "stable" },
        { name: "Innovation Rate", impact: "Moderate", trend: "upward" },
        { name: "Risk Level", impact: "High", trend: "stable" },
      ],
      summary: "The energy sector is undergoing significant transformation as companies balance traditional operations with renewable energy investments. Market leaders are diversifying portfolios to include sustainable solutions while maintaining profitability. Global demand fluctuations and environmental regulations continue to impact the sector, with companies focused on operational efficiency and technological adoption to remain competitive."
    }
  },
];

// Companies data
export const companies: Company[] = [
  // Technology Companies
  {
    id: "apple",
    sectorId: "technology",
    name: "Apple Inc.",
    ticker: "AAPL",
    price: 185.92,
    change: 2.35,
    changePercent: 1.28,
    color: "#3b82f6",
    data: generateStockData(180, 5)
  },
  {
    id: "microsoft",
    sectorId: "technology",
    name: "Microsoft",
    ticker: "MSFT",
    price: 410.34,
    change: 3.22,
    changePercent: 0.79,
    color: "#60a5fa",
    data: generateStockData(400, 8)
  },
  {
    id: "google",
    sectorId: "technology",
    name: "Alphabet Inc.",
    ticker: "GOOGL",
    price: 148.74,
    change: -1.25,
    changePercent: -0.83,
    color: "#93c5fd",
    data: generateStockData(150, 4)
  },
  {
    id: "meta",
    sectorId: "technology",
    name: "Meta Platforms",
    ticker: "META",
    price: 474.99,
    change: 6.78,
    changePercent: 1.45,
    color: "#bfdbfe",
    data: generateStockData(450, 10)
  },
  {
    id: "nvidia",
    sectorId: "technology",
    name: "NVIDIA Corp.",
    ticker: "NVDA",
    price: 926.58,
    change: 15.43,
    changePercent: 1.69,
    color: "#dbeafe",
    data: generateStockData(900, 20)
  },
  
  // Finance Companies
  {
    id: "jpmorgan",
    sectorId: "finance",
    name: "JPMorgan Chase",
    ticker: "JPM",
    price: 197.45,
    change: 1.23,
    changePercent: 0.63,
    color: "#10b981",
    data: generateStockData(195, 3)
  },
  {
    id: "bankofamerica",
    sectorId: "finance",
    name: "Bank of America",
    ticker: "BAC",
    price: 38.27,
    change: -0.45,
    changePercent: -1.16,
    color: "#34d399",
    data: generateStockData(39, 1)
  },
  {
    id: "visa",
    sectorId: "finance",
    name: "Visa Inc.",
    ticker: "V",
    price: 276.35,
    change: 2.15,
    changePercent: 0.78,
    color: "#6ee7b7",
    data: generateStockData(270, 5)
  },
  {
    id: "mastercard",
    sectorId: "finance",
    name: "Mastercard Inc.",
    ticker: "MA",
    price: 450.62,
    change: 3.87,
    changePercent: 0.87,
    color: "#a7f3d0",
    data: generateStockData(445, 7)
  },
  {
    id: "wellsfargo",
    sectorId: "finance",
    name: "Wells Fargo",
    ticker: "WFC",
    price: 57.84,
    change: 0.68,
    changePercent: 1.19,
    color: "#d1fae5",
    data: generateStockData(56, 2)
  },
  
  // Healthcare Companies
  {
    id: "unitedhealth",
    sectorId: "healthcare",
    name: "UnitedHealth Group",
    ticker: "UNH",
    price: 526.78,
    change: -2.36,
    changePercent: -0.45,
    color: "#8b5cf6",
    data: generateStockData(530, 6)
  },
  {
    id: "johnson",
    sectorId: "healthcare",
    name: "Johnson & Johnson",
    ticker: "JNJ",
    price: 147.52,
    change: 0.87,
    changePercent: 0.59,
    color: "#a78bfa",
    data: generateStockData(145, 3)
  },
  {
    id: "pfizer",
    sectorId: "healthcare",
    name: "Pfizer Inc.",
    ticker: "PFE",
    price: 28.15,
    change: -0.32,
    changePercent: -1.12,
    color: "#c4b5fd",
    data: generateStockData(29, 1)
  },
  {
    id: "abbvie",
    sectorId: "healthcare",
    name: "AbbVie Inc.",
    ticker: "ABBV",
    price: 167.94,
    change: 1.45,
    changePercent: 0.87,
    color: "#ddd6fe",
    data: generateStockData(165, 4)
  },
  {
    id: "merck",
    sectorId: "healthcare",
    name: "Merck & Co.",
    ticker: "MRK",
    price: 125.45,
    change: 0.78,
    changePercent: 0.63,
    color: "#ede9fe",
    data: generateStockData(124, 2)
  },
  
  // Energy Companies
  {
    id: "exxon",
    sectorId: "energy",
    name: "Exxon Mobil",
    ticker: "XOM",
    price: 113.55,
    change: -1.23,
    changePercent: -1.07,
    color: "#f59e0b",
    data: generateStockData(115, 3)
  },
  {
    id: "chevron",
    sectorId: "energy",
    name: "Chevron Corp.",
    ticker: "CVX",
    price: 154.32,
    change: -0.87,
    changePercent: -0.56,
    color: "#fbbf24",
    data: generateStockData(156, 4)
  },
  {
    id: "conocophillips",
    sectorId: "energy",
    name: "ConocoPhillips",
    ticker: "COP",
    price: 114.67,
    change: 0.54,
    changePercent: 0.47,
    color: "#fcd34d",
    data: generateStockData(113, 3)
  },
  {
    id: "shell",
    sectorId: "energy",
    name: "Shell plc",
    ticker: "SHEL",
    price: 67.85,
    change: 0.32,
    changePercent: 0.47,
    color: "#fde68a",
    data: generateStockData(67, 2)
  },
  {
    id: "totalenergies",
    sectorId: "energy",
    name: "TotalEnergies SE",
    ticker: "TTE",
    price: 65.43,
    change: -0.23,
    changePercent: -0.35,
    color: "#fef3c7",
    data: generateStockData(66, 1.5)
  },
];

// Assign companies to their sectors
sectors.forEach(sector => {
  sector.companies = companies.filter(company => company.sectorId === sector.id);
});

// Generate news articles
export const generateNewsArticles = (): NewsArticle[] => {
  const articles: NewsArticle[] = [];
  let idCounter = 1;
  
  // Helper to create a date string for n days ago
  const daysAgo = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString();
  };
  
  // Generate 5 articles per company (100 total)
  companies.forEach(company => {
    // Article templates for each company
    const templates = [
      {
        title: `${company.name} Reports Strong Quarterly Earnings`,
        description: `${company.name} (${company.ticker}) reported quarterly earnings that exceeded analyst expectations, driven by ${company.sectorId === 'technology' ? 'increased cloud services adoption' : company.sectorId === 'finance' ? 'higher interest income' : company.sectorId === 'healthcare' ? 'growth in key therapeutic areas' : 'rising commodity prices'}. The company forecasts continued growth for the remainder of the fiscal year.`
      },
      {
        title: `${company.name} Announces Strategic Partnership`,
        description: `${company.name} has entered into a strategic partnership with a leading player in the ${company.sectorId === 'technology' ? 'artificial intelligence' : company.sectorId === 'finance' ? 'fintech' : company.sectorId === 'healthcare' ? 'biotech' : 'renewable energy'} space. This collaboration is expected to accelerate innovation and expand market reach.`
      },
      {
        title: `${company.name} Unveils New ${company.sectorId === 'technology' ? 'Product Line' : company.sectorId === 'finance' ? 'Financial Services' : company.sectorId === 'healthcare' ? 'Treatment Options' : 'Energy Solutions'}`,
        description: `In a much-anticipated announcement, ${company.name} revealed its latest ${company.sectorId === 'technology' ? 'product innovations' : company.sectorId === 'finance' ? 'financial service offerings' : company.sectorId === 'healthcare' ? 'breakthrough treatments' : 'energy solutions'}, designed to address evolving market demands and strengthen the company's competitive position.`
      },
      {
        title: `${company.name} Expands Global Presence`,
        description: `${company.name} is expanding its operations to new international markets, with a focus on ${company.sectorId === 'technology' ? 'emerging economies in Asia' : company.sectorId === 'finance' ? 'European financial centers' : company.sectorId === 'healthcare' ? 'healthcare systems in developing countries' : 'energy-hungry regions'}. This move is part of the company's long-term growth strategy.`
      },
      {
        title: `Analyst Upgrades ${company.name} Stock Rating`,
        description: `Leading market analysts have upgraded ${company.name}'s stock rating from "hold" to "buy," citing ${company.sectorId === 'technology' ? 'technological innovation advantages' : company.sectorId === 'finance' ? 'strong balance sheet and market positioning' : company.sectorId === 'healthcare' ? 'robust drug pipeline and research initiatives' : 'strategic investments in sustainable energy'} as key factors in their positive outlook.`
      }
    ];
    
    // Create 5 articles per company with different dates
    templates.forEach((template, index) => {
      articles.push({
        id: `news-${idCounter++}`,
        title: template.title,
        description: template.description,
        date: daysAgo(index + Math.floor(Math.random() * 10)), // Spread out over last 2 weeks
        source: ['Financial Times', 'Bloomberg', 'Reuters', 'CNBC', 'Wall Street Journal'][Math.floor(Math.random() * 5)],
        url: '#',
        company: company.name,
        sectorId: company.sectorId
      });
    });
  });
  
  // Sort by date (newest first)
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const newsArticles = generateNewsArticles();

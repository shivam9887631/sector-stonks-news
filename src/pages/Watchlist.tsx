
import React, { useState, useEffect } from 'react';
import { Container } from "@/components/ui/container";
import { fetchAllCompanies, Company } from '@/services/apiService';
import Navbar from '@/components/Navbar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Star, StarOff, ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Watchlist = () => {
  // In a real app, we'd store this in a database or localStorage
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companiesData = await fetchAllCompanies();
        setCompanies(companiesData);
      } catch (error) {
        console.error('Error fetching companies:', error);
        toast({
          title: "Error",
          description: "Failed to fetch company data. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleWatchlist = (companyId: string) => {
    setWatchlist(prev => {
      if (prev.includes(companyId)) {
        return prev.filter(id => id !== companyId);
      } else {
        return [...prev, companyId];
      }
    });
    
    toast({
      title: watchlist.includes(companyId) ? "Removed from Watchlist" : "Added to Watchlist",
      duration: 2000
    });
  };
  
  // Filter companies to only show watchlisted ones
  const watchlistedCompanies = companies.filter(company => watchlist.includes(company.id));
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="py-8">
        <Container>
          <h1 className="text-3xl font-bold mb-8">Your Watchlist</h1>
          
          {loading ? (
            <div className="h-96 bg-gray-200 animate-pulse rounded-lg"></div>
          ) : (
            <>
              {watchlistedCompanies.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-lg shadow">
                  <Star className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <h2 className="text-2xl font-semibold mb-2">Your watchlist is empty</h2>
                  <p className="text-gray-500 mb-6">
                    Add companies to keep track of their performance
                  </p>
                  <Button 
                    onClick={() => { window.location.href = '/sectors'; }}
                  >
                    Browse Sectors
                  </Button>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-10"></TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Ticker</TableHead>
                        <TableHead>Sector</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Change</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {watchlistedCompanies.map((company) => {
                        const isPositive = company.change >= 0;
                        return (
                          <TableRow key={company.id}>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => toggleWatchlist(company.id)}
                              >
                                <Star className="h-4 w-4 text-yellow-500" />
                              </Button>
                            </TableCell>
                            <TableCell className="font-medium">{company.name}</TableCell>
                            <TableCell>{company.ticker}</TableCell>
                            <TableCell className="capitalize">{company.sectorId}</TableCell>
                            <TableCell className="text-right">${company.price.toFixed(2)}</TableCell>
                            <TableCell className={`text-right ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                              <div className="flex items-center justify-end">
                                {isPositive ? 
                                  <ArrowUpIcon className="h-4 w-4 mr-1" /> : 
                                  <ArrowDownIcon className="h-4 w-4 mr-1" />
                                }
                                <span>{company.change.toFixed(2)}</span>
                                <span className="ml-1">({company.changePercent.toFixed(2)}%)</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
              
              <h2 className="text-2xl font-bold mt-10 mb-4">All Companies</h2>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10"></TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Ticker</TableHead>
                      <TableHead>Sector</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {companies.map((company) => {
                      const isPositive = company.change >= 0;
                      const isWatched = watchlist.includes(company.id);
                      
                      return (
                        <TableRow key={company.id}>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => toggleWatchlist(company.id)}
                            >
                              {isWatched ? (
                                <Star className="h-4 w-4 text-yellow-500" />
                              ) : (
                                <StarOff className="h-4 w-4 text-gray-300" />
                              )}
                            </Button>
                          </TableCell>
                          <TableCell className="font-medium">{company.name}</TableCell>
                          <TableCell>{company.ticker}</TableCell>
                          <TableCell className="capitalize">{company.sectorId}</TableCell>
                          <TableCell className="text-right">${company.price.toFixed(2)}</TableCell>
                          <TableCell className={`text-right ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            <div className="flex items-center justify-end">
                              {isPositive ? 
                                <ArrowUpIcon className="h-4 w-4 mr-1" /> : 
                                <ArrowDownIcon className="h-4 w-4 mr-1" />
                              }
                              <span>{company.change.toFixed(2)}</span>
                              <span className="ml-1">({company.changePercent.toFixed(2)}%)</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </Container>
      </main>
    </div>
  );
};

export default Watchlist;

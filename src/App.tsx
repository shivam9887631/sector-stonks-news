
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StockDataProvider } from "@/components/StockDataProvider";
import Index from "./pages/Index";
import SectorDetail from "./pages/SectorDetail";
import Sectors from "./pages/Sectors";
import News from "./pages/News";
import Watchlist from "./pages/Watchlist";
import NotFound from "./pages/NotFound";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <StockDataProvider refreshInterval={60000}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/sector/:sectorId" element={<SectorDetail />} />
              <Route path="/sectors" element={<Sectors />} />
              <Route path="/news" element={<News />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
          </StockDataProvider>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

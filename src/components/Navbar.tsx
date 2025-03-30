
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import SearchDialog from './SearchDialog';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <nav className="bg-white border-b border-gray-200 py-3 md:py-4 sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-0">
        <Link to="/" className="text-xl font-bold text-gray-900">
          SectorStonks
        </Link>
        
        {isMobile ? (
          <>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
                <Search className="h-5 w-5" />
              </Button>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[250px]">
                  <SheetHeader className="pb-6">
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col space-y-4">
                    <SheetClose asChild>
                      <Link 
                        to="/sectors" 
                        className="text-gray-700 hover:text-gray-900 hover:underline py-2 px-4 rounded-md hover:bg-gray-50"
                      >
                        Sectors
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link 
                        to="/news" 
                        className="text-gray-700 hover:text-gray-900 hover:underline py-2 px-4 rounded-md hover:bg-gray-50"
                      >
                        News
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link 
                        to="/watchlist" 
                        className="text-gray-700 hover:text-gray-900 hover:underline py-2 px-4 rounded-md hover:bg-gray-50"
                      >
                        Watchlist
                      </Link>
                    </SheetClose>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </>
        ) : (
          <>
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  type="search"
                  placeholder="Search sectors or companies..." 
                  className="pl-8 cursor-pointer"
                  onClick={() => setSearchOpen(true)}
                  readOnly
                />
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Link 
                to="/sectors" 
                className="text-gray-700 hover:text-gray-900 hover:underline"
              >
                Sectors
              </Link>
              <Link 
                to="/news" 
                className="text-gray-700 hover:text-gray-900 hover:underline"
              >
                News
              </Link>
              <Link 
                to="/watchlist" 
                className="text-gray-700 hover:text-gray-900 hover:underline"
              >
                Watchlist
              </Link>
            </div>
          </>
        )}
      </div>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </nav>
  );
};

export default Navbar;

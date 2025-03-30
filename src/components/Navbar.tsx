
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import SearchDialog from './SearchDialog';

const Navbar: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  
  return (
    <nav className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gray-900">
          SectorStonks
        </Link>
        
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
          <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
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
      </div>
    </nav>
  );
};

export default Navbar;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { fetchAllSectors, fetchAllCompanies, Sector, Company } from '@/services/apiService';
import { BadgeCheck, Building, TrendingUp } from 'lucide-react';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ open, onOpenChange }) => {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      if (open && (!sectors.length || !companies.length)) {
        setLoading(true);
        try {
          const [sectorsData, companiesData] = await Promise.all([
            fetchAllSectors(),
            fetchAllCompanies()
          ]);
          setSectors(sectorsData);
          setCompanies(companiesData);
        } catch (error) {
          console.error('Error fetching search data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [open, sectors.length, companies.length]);

  const handleSectorSelect = (sectorId: string) => {
    navigate(`/sector/${sectorId}`);
    onOpenChange(false);
  };

  const handleCompanySelect = (company: Company) => {
    // For now, navigate to the sector page that contains this company
    navigate(`/sector/${company.sectorId}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0" onPointerDownOutside={(e) => e.preventDefault()}>
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Search sectors or companies..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {loading && <p className="p-4 text-sm text-center">Loading...</p>}
            <CommandGroup heading="Sectors">
              {sectors.map((sector) => (
                <CommandItem
                  key={sector.id}
                  onSelect={() => handleSectorSelect(sector.id)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <TrendingUp className="h-4 w-4" style={{ color: sector.color }} />
                  <span>{sector.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Companies">
              {companies.map((company) => (
                <CommandItem
                  key={company.id}
                  onSelect={() => handleCompanySelect(company)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Building className="h-4 w-4" style={{ color: company.color }} />
                  <span>{company.name}</span>
                  <span className="ml-1 text-xs text-gray-500">{company.ticker}</span>
                  {company.change > 0 ? (
                    <span className="ml-auto text-green-500">+{company.changePercent.toFixed(2)}%</span>
                  ) : (
                    <span className="ml-auto text-red-500">{company.changePercent.toFixed(2)}%</span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CompanyCardProps {
  company: {
    id: string;
    name: string;
    ticker: string;
    price: number;
    change: number;
    changePercent: number;
    color: string;
  };
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const isPositive = company.change >= 0;
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">{company.name}</CardTitle>
            <CardDescription>{company.ticker}</CardDescription>
          </div>
          <Badge 
            style={{ backgroundColor: company.color, color: 'white' }}
            className="font-normal"
          >
            Top 5
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold">${company.price.toFixed(2)}</span>
          <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? 
              <ArrowUpIcon className="h-4 w-4 mr-1" /> : 
              <ArrowDownIcon className="h-4 w-4 mr-1" />
            }
            <span className="font-medium">{company.change.toFixed(2)}</span>
            <span className="ml-1">({company.changePercent.toFixed(2)}%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;

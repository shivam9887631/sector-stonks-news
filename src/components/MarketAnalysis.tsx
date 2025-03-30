
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUpIcon, TrendingDownIcon, MinusIcon } from 'lucide-react';

interface MarketAnalysisProps {
  sectorId: string;
  data: {
    metrics: Array<{
      name: string;
      impact: string;
      trend: 'upward' | 'stable' | 'decreasing';
    }>;
    summary: string;
  };
}

const MarketAnalysis: React.FC<MarketAnalysisProps> = ({ sectorId, data }) => {
  const renderTrendIcon = (trend: string) => {
    switch (trend) {
      case 'upward':
        return <TrendingUpIcon className="h-4 w-4 text-green-500" />;
      case 'decreasing':
        return <TrendingDownIcon className="h-4 w-4 text-red-500" />;
      case 'stable':
        return <MinusIcon className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Metric</TableHead>
              <TableHead>Impact</TableHead>
              <TableHead>Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.metrics.map((metric, idx) => (
              <TableRow key={idx}>
                <TableCell>{metric.name}</TableCell>
                <TableCell>{metric.impact}</TableCell>
                <TableCell className="flex justify-center">
                  {renderTrendIcon(metric.trend)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="mt-6 text-sm text-gray-700">
          <p>{data.summary}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketAnalysis;

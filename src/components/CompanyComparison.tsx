
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface CompanyComparisonProps {
  companies: Array<{
    id: string;
    name: string;
    color: string;
    data: Array<{ date: string; price: number }>;
  }>;
}

const CompanyComparison: React.FC<CompanyComparisonProps> = ({ companies }) => {
  // Transform data for the chart
  const chartData = companies[0].data.map((item, index) => {
    const dataPoint: any = { date: item.date };
    
    companies.forEach(company => {
      dataPoint[company.id] = company.data[index]?.price || 0;
    });
    
    return dataPoint;
  });
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Stock Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="date" 
                tickLine={false} 
                axisLine={true}
                tickFormatter={(value) => value.split('-')[1]} // Just show month
              />
              <YAxis 
                tickLine={false} 
                axisLine={true}
                domain={['dataMin - 10', 'dataMax + 10']}
              />
              <Tooltip 
                formatter={(value) => [`$${value}`, '']}
                labelFormatter={(label) => `${label}`}
              />
              <Legend />
              
              {companies.map(company => (
                <Line 
                  key={company.id}
                  type="monotone" 
                  dataKey={company.id} 
                  name={company.name}
                  stroke={company.color} 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyComparison;

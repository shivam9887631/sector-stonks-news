
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon } from 'lucide-react';

interface NewsItemProps {
  article: {
    id: string;
    title: string;
    description: string;
    date: string;
    source: string;
    url: string;
    company?: string;
  };
}

const NewsItem: React.FC<NewsItemProps> = ({ article }) => {
  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{article.title}</CardTitle>
        {article.company && (
          <CardDescription>{article.company}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 line-clamp-3">{article.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 text-xs text-gray-500">
        <div className="flex items-center">
          <CalendarIcon className="h-3 w-3 mr-1" />
          <span>{formattedDate}</span>
        </div>
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {article.source}
        </a>
      </CardFooter>
    </Card>
  );
};

export default NewsItem;

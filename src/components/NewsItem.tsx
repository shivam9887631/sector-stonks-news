
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, ExternalLink } from 'lucide-react';

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
    <Card className="hover:shadow-md transition-shadow h-full flex flex-col">
      <CardHeader className="pb-2 flex-none">
        <CardTitle className="text-base sm:text-lg line-clamp-2">{article.title}</CardTitle>
        {article.company && (
          <CardDescription>{article.company}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-700 line-clamp-3">{article.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 text-xs text-gray-500 flex-none">
        <div className="flex items-center">
          <CalendarIcon className="h-3 w-3 mr-1" />
          <span>{formattedDate}</span>
        </div>
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline flex items-center gap-1"
        >
          <span className="hidden sm:inline">{article.source}</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </CardFooter>
    </Card>
  );
};

export default NewsItem;

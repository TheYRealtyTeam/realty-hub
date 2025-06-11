
import React from 'react';
import { Button } from '@/components/ui/button';

interface BlogErrorStateProps {
  error: string;
  onRetry: () => void;
}

const BlogErrorState = ({ error, onRetry }: BlogErrorStateProps) => {
  return (
    <div className="text-center py-12 bg-red-50 rounded-lg">
      <p className="text-xl font-medium text-gray-700">Error loading blog posts</p>
      <p className="text-gray-500 mt-2">{error}</p>
      <Button 
        onClick={onRetry} 
        className="mt-4 bg-yrealty-navy hover:bg-yrealty-navy/90"
      >
        Try Again
      </Button>
      <p className="text-sm mt-4 text-gray-500">
        Please check your database connection or try refreshing the page
      </p>
    </div>
  );
};

export default BlogErrorState;

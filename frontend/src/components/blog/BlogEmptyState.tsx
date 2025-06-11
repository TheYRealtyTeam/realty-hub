
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogEmptyStateProps {
  searchTerm: string;
  onRetry?: () => void;
}

const BlogEmptyState = ({ searchTerm, onRetry }: BlogEmptyStateProps) => {
  if (searchTerm.trim() !== '') {
    return (
      <div className="text-center py-12">
        <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-700">No posts found matching your search</h3>
        <p className="text-gray-500 mt-2">Try adjusting your search terms or browse all articles</p>
        {onRetry && (
          <Button 
            onClick={onRetry} 
            className="mt-4 bg-yrealty-navy hover:bg-yrealty-navy/90"
          >
            Refresh Posts
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="text-center py-12 bg-gray-50 rounded-lg">
      <p className="text-xl font-medium text-gray-700">No blog posts found</p>
      <p className="text-gray-500 mt-2">
        Please check your database or add some content
      </p>
      {onRetry && (
        <Button 
          onClick={onRetry} 
          className="mt-4 bg-yrealty-navy hover:bg-yrealty-navy/90"
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

export default BlogEmptyState;

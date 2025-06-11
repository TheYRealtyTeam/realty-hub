
import React from 'react';
import { Search } from 'lucide-react';

interface BlogSearchResultsProps {
  searchTerm: string;
  resultsCount: number;
  isSearching: boolean;
}

const BlogSearchResults = ({ searchTerm, resultsCount, isSearching }: BlogSearchResultsProps) => {
  if (isSearching) {
    return (
      <div className="text-center py-4 mb-6">
        <Search className="animate-pulse inline-block mr-2 text-yrealty-accent" />
        <span>Searching...</span>
      </div>
    );
  }

  if (searchTerm.trim() !== '') {
    return (
      <div className="text-center py-4 mb-6">
        <p className="text-sm text-gray-500">
          Found {resultsCount} results for "<span className="font-medium text-yrealty-navy">{searchTerm}</span>"
        </p>
      </div>
    );
  }

  return null;
};

export default BlogSearchResults;

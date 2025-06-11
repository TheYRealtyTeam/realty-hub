
import React, { useState } from 'react';
import BlogPostCard from '@/components/blog/BlogPostCard';
import BlogSearchResults from '@/components/blog/BlogSearchResults';
import BlogPagination from '@/components/blog/BlogPagination';
import BlogErrorState from '@/components/blog/BlogErrorState';
import BlogLoadingState from '@/components/blog/BlogLoadingState';
import BlogEmptyState from '@/components/blog/BlogEmptyState';
import { useBlogPosts } from '@/hooks/useBlogPosts';

interface BlogPostsListProps {
  searchTerm: string;
}

const BlogPostsList: React.FC<BlogPostsListProps> = ({ searchTerm }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  const { blogPosts, loading, error, isSearching, totalPosts, handleRetry } = useBlogPosts({
    searchTerm,
    currentPage,
    postsPerPage
  });

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <BlogLoadingState />;
  }

  if (error) {
    return <BlogErrorState error={error} onRetry={handleRetry} />;
  }

  if (!loading && blogPosts.length === 0) {
    return <BlogEmptyState searchTerm={searchTerm} onRetry={handleRetry} />;
  }
  
  return (
    <section className="bg-white">
      <div className="container-custom">
        <BlogSearchResults 
          searchTerm={searchTerm}
          resultsCount={blogPosts.length}
          isSearching={isSearching}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
        
        {searchTerm.trim() === '' && (
          <BlogPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={paginate}
          />
        )}
      </div>
    </section>
  );
};

export default BlogPostsList;

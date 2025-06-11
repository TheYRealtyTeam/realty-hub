
import React from 'react';
import { Calendar, User, Clock } from 'lucide-react';
import { BlogPostData } from '@/integrations/supabase/client';

interface BlogPostHeaderProps {
  post: BlogPostData;
}

const BlogPostHeader = ({ post }: BlogPostHeaderProps) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  const getEstimatedReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  const getCategoryLabel = (categoryId: string) => {
    if (!categoryId) return 'General';
    return categoryId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="mb-8">
      <img 
        src={post.image_url} 
        alt={post.title} 
        className="w-full h-[400px] md:h-[500px] object-cover rounded-xl mb-8"
        onError={(e) => {
          console.log("Image load error, using fallback");
          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60';
        }}
      />
      
      {/* Article Meta */}
      <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          <span>{formatDate(post.date)}</span>
        </div>
        <div className="flex items-center gap-2">
          <User className="h-5 w-5" />
          <span>{post.author}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          <span>{getEstimatedReadTime(post.content)} min read</span>
        </div>
      </div>

      {/* Category */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <span className="bg-yrealty-navy text-white px-4 py-2 rounded-full font-medium">
          {getCategoryLabel(post.category)}
        </span>
      </div>
    </div>
  );
};

export default BlogPostHeader;

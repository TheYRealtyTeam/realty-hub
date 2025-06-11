
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag, Clock, ChevronRight } from 'lucide-react';
import { BlogPostData } from '@/integrations/supabase/client';

interface BlogPostCardProps {
  post: BlogPostData;
}

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  const getCategoryLabel = (categoryId: string) => {
    if (!categoryId) return 'General';
    return categoryId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

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

  return (
    <Link to={`/blog/${post.slug}`} className="group">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col bg-white border border-gray-100">
        <div className="h-56 w-full overflow-hidden relative">
          <img 
            src={post.image_url} 
            alt={post.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              console.log("Image load error, using fallback");
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <CardContent className="p-6 flex-grow flex flex-col">
          <div className="flex items-center space-x-3 mb-3">
            <Badge variant="outline" className="bg-gray-100 text-yrealty-navy font-medium">
              <Tag className="w-3.5 h-3.5 mr-1" />
              {getCategoryLabel(post.category)}
            </Badge>
            <div className="text-xs text-gray-500 flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1" />
              {formatDate(post.date)}
            </div>
          </div>
          
          <h3 className="text-xl font-bold mb-3 text-yrealty-navy group-hover:text-yrealty-accent transition-colors duration-200">
            {post.title}
          </h3>
          
          <p className="text-gray-600 mb-5 flex-grow line-clamp-3">
            {post.excerpt}
          </p>
          
          <div className="flex items-start space-x-4 pt-4 border-t border-gray-100">
            <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center text-gray-700 font-bold shrink-0">
              {post.author ? post.author.split(' ').map(n => n[0]).join('') : 'AA'}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">{post.author}</div>
              <div className="text-xs text-gray-500">{post.author_role || 'Author'}</div>
            </div>
          </div>
          
          <div className="flex items-center text-yrealty-accent font-medium mt-5 group-hover:translate-x-1 transition-transform duration-200">
            <span>Read article</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogPostCard;


import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPostData } from '@/integrations/supabase/client';

interface RelatedPostsProps {
  relatedPosts: BlogPostData[];
}

const RelatedPosts = ({ relatedPosts }: RelatedPostsProps) => {
  const getCategoryLabel = (categoryId: string) => {
    if (!categoryId) return 'General';
    return categoryId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="border-t pt-12">
      <h3 className="text-2xl font-bold mb-8 text-yrealty-navy">Related Articles</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((relatedPost) => (
          <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`} className="group">
            <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={relatedPost.image_url} 
                alt={relatedPost.title} 
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60';
                }}
              />
              <div className="p-4">
                <span className="text-xs bg-yrealty-blue text-yrealty-navy px-2 py-1 rounded-full">
                  {getCategoryLabel(relatedPost.category)}
                </span>
                <h4 className="font-bold mt-2 mb-2 text-yrealty-navy group-hover:text-yrealty-accent transition-colors line-clamp-2">
                  {relatedPost.title}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2">{relatedPost.excerpt}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;

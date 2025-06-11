
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const BlogPostNavigation = () => {
  return (
    <div className="border-t pt-8 mb-12">
      <Link to="/blog">
        <Button variant="outline" className="flex items-center">
          <ArrowLeft className="mr-2" />
          Back to Blog
        </Button>
      </Link>
    </div>
  );
};

export default BlogPostNavigation;

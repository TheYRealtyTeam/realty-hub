
import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface BlogPostErrorProps {
  error: string | null;
}

const BlogPostError = ({ error }: BlogPostErrorProps) => {
  return (
    <PageLayout title="Blog Post Not Found">
      <div className="text-center py-12">
        <p className="text-xl font-medium text-gray-700">
          {error ? "Error loading blog post" : "The blog post you are looking for does not exist."}
        </p>
        <p className="text-gray-500 mt-2">
          {error || "Please check the URL or go back to the blog page."}
        </p>
        <Link to="/blog">
          <Button className="mt-6">
            <ArrowLeft className="mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>
    </PageLayout>
  );
};

export default BlogPostError;

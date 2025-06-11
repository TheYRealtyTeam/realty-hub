
import React, { useEffect, useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import BlogPostsList from '@/components/BlogPostsList';
import { Link } from 'react-router-dom';
import { Settings, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    document.title = "Property Management Blog | Y Realty Team";
  }, []);

  return (
    <PageLayout 
      title="Property Management Insights" 
      subtitle="Expert advice, market trends, and practical tips for property owners and investors"
    >
      <div className="max-w-6xl mx-auto">
        {/* Admin Link */}
        <div className="mb-6 text-right">
          <Link 
            to="/blog-admin" 
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-yrealty-navy transition-colors"
          >
            <Settings className="h-4 w-4" />
            Admin
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-yrealty-navy focus:border-transparent"
            />
          </div>
        </div>

        {/* Blog Posts List */}
        <BlogPostsList searchTerm={searchTerm} />

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-yrealty-navy to-yrealty-accent p-8 rounded-2xl text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Optimize Your Property Investment?
          </h3>
          <p className="text-lg mb-6 opacity-95 max-w-2xl mx-auto">
            Put these insights into action with Y Realty Team's comprehensive property management services.
          </p>
          <Link to="/contact" className="btn-accent bg-white text-yrealty-navy hover:bg-gray-100 text-lg px-8 py-4 font-bold">
            Get Expert Management
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default Blog;

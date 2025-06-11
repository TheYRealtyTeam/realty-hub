import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { BlogPostData } from '@/integrations/supabase/client';
import { blogPosts as staticBlogPosts } from '@/data/blogPosts';

interface UseBlogPostsProps {
  searchTerm: string;
  currentPage: number;
  postsPerPage: number;
}

export const useBlogPosts = ({ searchTerm, currentPage, postsPerPage }: UseBlogPostsProps) => {
  const [blogPosts, setBlogPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [totalPosts, setTotalPosts] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [usingFallback, setUsingFallback] = useState(false);

  const handleRetry = () => {
    console.log("Retrying blog posts fetch...");
    setRefreshTrigger(prev => prev + 1);
  };

  // Convert static blog posts to the expected format
  const convertStaticPosts = (posts: any[]): BlogPostData[] => {
    return posts.map(post => ({
      id: post.slug || `post-${Date.now()}-${Math.random()}`,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      date: post.date,
      author: post.author,
      author_role: post.author_role,
      category: post.category,
      image_url: post.image_url || '/placeholder.svg',
      slug: post.slug || post.title.toLowerCase().replace(/\s+/g, '-'),
      created_at: post.date,
      updated_at: post.date
    }));
  };

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        setLoading(true);
        setError(null);
        setUsingFallback(false);
        
        console.log("Starting to fetch blog posts from Supabase...");
        
        // Try to fetch from Supabase first
        const countResponse = await supabase
          .from('blog_posts')
          .select('id', { count: 'exact', head: true });
          
        if (countResponse.error) {
          console.warn("Supabase table not found, using static data:", countResponse.error.message);
          // Fall back to static data
          const convertedPosts = convertStaticPosts(staticBlogPosts);
          const startIndex = (currentPage - 1) * postsPerPage;
          const endIndex = startIndex + postsPerPage;
          const paginatedPosts = convertedPosts.slice(startIndex, endIndex);
          
          setTotalPosts(convertedPosts.length);
          setBlogPosts(paginatedPosts);
          setUsingFallback(true);
          return;
        }
        
        setTotalPosts(countResponse.count || 0);
        console.log(`Total posts count: ${countResponse.count}`);
        
        // Fetch the current page of posts
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false })
          .range((currentPage - 1) * postsPerPage, currentPage * postsPerPage - 1);
        
        if (error) {
          console.warn("Error fetching from Supabase, using static data:", error.message);
          // Fall back to static data
          const convertedPosts = convertStaticPosts(staticBlogPosts);
          const startIndex = (currentPage - 1) * postsPerPage;
          const endIndex = startIndex + postsPerPage;
          const paginatedPosts = convertedPosts.slice(startIndex, endIndex);
          
          setTotalPosts(convertedPosts.length);
          setBlogPosts(paginatedPosts);
          setUsingFallback(true);
          return;
        }
        
        if (!data || data.length === 0) {
          console.log("No blog posts found in database, using static data");
          // Fall back to static data
          const convertedPosts = convertStaticPosts(staticBlogPosts);
          const startIndex = (currentPage - 1) * postsPerPage;
          const endIndex = startIndex + postsPerPage;
          const paginatedPosts = convertedPosts.slice(startIndex, endIndex);
          
          setTotalPosts(convertedPosts.length);
          setBlogPosts(paginatedPosts);
          setUsingFallback(true);
          return;
        }
        
        console.log("Blog posts fetched successfully from Supabase");
        setBlogPosts(data as BlogPostData[]);
      } catch (error: any) {
        console.warn('Error connecting to Supabase, using static data:', error.message);
        // Fall back to static data
        const convertedPosts = convertStaticPosts(staticBlogPosts);
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const paginatedPosts = convertedPosts.slice(startIndex, endIndex);
        
        setTotalPosts(convertedPosts.length);
        setBlogPosts(paginatedPosts);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    }

    async function searchBlogPosts() {
      if (searchTerm.trim() === '') {
        return;
      }
      
      try {
        setLoading(true);
        setIsSearching(true);
        setError(null);
        setUsingFallback(false);
        
        console.log("Searching blog posts for:", searchTerm);
        
        // Try Supabase search first
        const lowerSearchTerm = searchTerm.toLowerCase().trim();
        
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .or(
            `title.ilike.%${lowerSearchTerm}%,excerpt.ilike.%${lowerSearchTerm}%,content.ilike.%${lowerSearchTerm}%,category.ilike.%${lowerSearchTerm}%,author.ilike.%${lowerSearchTerm}%`
          )
          .order('created_at', { ascending: false });
        
        if (error) {
          console.warn("Supabase search failed, searching static data:", error.message);
          // Fall back to static data search
          const convertedPosts = convertStaticPosts(staticBlogPosts);
          const filteredPosts = convertedPosts.filter(post =>
            post.title.toLowerCase().includes(lowerSearchTerm) ||
            post.excerpt.toLowerCase().includes(lowerSearchTerm) ||
            post.content.toLowerCase().includes(lowerSearchTerm) ||
            post.category.toLowerCase().includes(lowerSearchTerm) ||
            post.author.toLowerCase().includes(lowerSearchTerm)
          );
          
          setTotalPosts(filteredPosts.length);
          setBlogPosts(filteredPosts);
          setUsingFallback(true);
          return;
        }
        
        setTotalPosts(data?.length || 0);
        setBlogPosts(data as BlogPostData[] || []);
      } catch (error: any) {
        console.warn('Search error, using static data:', error.message);
        // Fall back to static data search
        const convertedPosts = convertStaticPosts(staticBlogPosts);
        const lowerSearchTerm = searchTerm.toLowerCase().trim();
        const filteredPosts = convertedPosts.filter(post =>
          post.title.toLowerCase().includes(lowerSearchTerm) ||
          post.excerpt.toLowerCase().includes(lowerSearchTerm) ||
          post.content.toLowerCase().includes(lowerSearchTerm) ||
          post.category.toLowerCase().includes(lowerSearchTerm) ||
          post.author.toLowerCase().includes(lowerSearchTerm)
        );
        
        setTotalPosts(filteredPosts.length);
        setBlogPosts(filteredPosts);
        setUsingFallback(true);
      } finally {
        setLoading(false);
        setTimeout(() => setIsSearching(false), 500);
      }
    }

    if (searchTerm.trim() !== '') {
      searchBlogPosts();
    } else {
      fetchBlogPosts();
    }
  }, [currentPage, postsPerPage, searchTerm, refreshTrigger]);

  return {
    blogPosts,
    loading,
    error,
    isSearching,
    totalPosts,
    handleRetry,
    usingFallback
  };
};
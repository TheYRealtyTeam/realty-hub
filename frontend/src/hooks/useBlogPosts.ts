
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { BlogPostData } from '@/integrations/supabase/client';

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

  const handleRetry = () => {
    console.log("Retrying blog posts fetch...");
    setRefreshTrigger(prev => prev + 1);
  };

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Starting to fetch blog posts...");
        
        // First get count of total posts for pagination
        const countResponse = await supabase
          .from('blog_posts')
          .select('id', { count: 'exact', head: true });
          
        if (countResponse.error) {
          throw new Error(`Error counting posts: ${countResponse.error.message}`);
        }
        
        setTotalPosts(countResponse.count || 0);
        console.log(`Total posts count: ${countResponse.count}`);
        
        // Then fetch the current page of posts
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false })
          .range((currentPage - 1) * postsPerPage, currentPage * postsPerPage - 1);
        
        console.log("Blog posts fetch complete:", { 
          success: !error, 
          count: data?.length || 0,
          error: error?.message,
          page: currentPage,
          totalPosts: countResponse.count
        });
        
        if (error) {
          console.error('Error fetching blog posts:', error);
          setError(error.message);
          toast({
            title: "Error fetching blog posts",
            description: error.message,
            variant: "destructive"
          });
          return;
        }
        
        if (!data || data.length === 0) {
          console.log("No blog posts found in the database");
          setError("No blog posts found");
          setBlogPosts([]);
          return;
        }
        
        console.log("Blog posts fetched successfully. First post:", data[0]?.title);
        setBlogPosts(data as BlogPostData[]);
      } catch (error: any) {
        console.error('Unexpected error in blog posts fetch:', error);
        setError("An unexpected error occurred: " + (error.message || "Unknown error"));
        toast({
          title: "Error fetching blog posts",
          description: "Please try again later.",
          variant: "destructive"
        });
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
        
        console.log("Searching blog posts for:", searchTerm);
        
        const lowerSearchTerm = searchTerm.toLowerCase().trim();
        
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .or(
            `title.ilike.%${lowerSearchTerm}%,excerpt.ilike.%${lowerSearchTerm}%,content.ilike.%${lowerSearchTerm}%,category.ilike.%${lowerSearchTerm}%,author.ilike.%${lowerSearchTerm}%`
          )
          .order('created_at', { ascending: false });
        
        console.log("Search complete:", { 
          success: !error, 
          resultsCount: data?.length || 0 
        });
        
        if (error) {
          console.error('Error searching blog posts:', error);
          setError(error.message);
          return;
        }
        
        setTotalPosts(data?.length || 0);
        setBlogPosts(data as BlogPostData[] || []);
      } catch (error: any) {
        console.error('Unexpected error in blog post search:', error);
        setError("An unexpected error occurred during search: " + (error.message || "Unknown error"));
      } finally {
        setLoading(false);
        setTimeout(() => setIsSearching(false), 500);
      }
    }

    if (searchTerm.trim() !== '') {
      searchBlogPosts();
    } else {
      const fetchWithRetry = async (retries = 3, delay = 1000) => {
        for (let i = 0; i < retries; i++) {
          try {
            await fetchBlogPosts();
            break;
          } catch (error) {
            console.log(`Retry ${i + 1}/${retries} failed:`, error);
            if (i < retries - 1) {
              await new Promise(resolve => setTimeout(resolve, delay));
            }
          }
        }
      };

      fetchWithRetry();
    }
  }, [currentPage, postsPerPage, searchTerm, refreshTrigger]);

  return {
    blogPosts,
    loading,
    error,
    isSearching,
    totalPosts,
    handleRetry
  };
};

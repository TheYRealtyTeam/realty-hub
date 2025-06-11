
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { supabase, BlogPostData } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import BlogPostLoading from '@/components/blog/BlogPostLoading';
import BlogPostError from '@/components/blog/BlogPostError';
import BlogPostHeader from '@/components/blog/BlogPostHeader';
import BlogPostContent from '@/components/blog/BlogPostContent';
import BlogPostNavigation from '@/components/blog/BlogPostNavigation';
import RelatedPosts from '@/components/blog/RelatedPosts';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchBlogPost() {
      try {
        setLoading(true);
        setError(null);

        console.log("Fetching blog post with slug:", slug);

        // Find the post by slug
        const { data: postData, error: postError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (postError) {
          console.error('Error fetching blog post:', postError);
          setError(postError.message);
          toast({
            title: "Error fetching blog post",
            description: postError.message,
            variant: "destructive"
          });
          return;
        }

        if (!postData) {
          console.log("No blog post found with slug:", slug);
          setPost(null);
          return;
        }

        console.log("Blog post found:", postData.title);
        setPost(postData as BlogPostData);

        // Find related posts (same category, excluding current post)
        const { data: relatedData, error: relatedError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('category', postData.category)
          .neq('id', postData.id)
          .limit(3);

        if (relatedError) {
          console.error('Error fetching related posts:', relatedError);
        } else {
          setRelatedPosts(relatedData as BlogPostData[] || []);
        }

        document.title = `${postData.title} | Y Realty Team Blog`;
        window.scrollTo(0, 0);
      } catch (error: any) {
        console.error('Unexpected error fetching blog post:', error);
        setError("An unexpected error occurred: " + (error.message || "Unknown error"));
      } finally {
        setLoading(false);
      }
    }

    fetchBlogPost();
  }, [slug]);

  if (loading) {
    return <BlogPostLoading />;
  }

  if (error || !post) {
    return <BlogPostError error={error} />;
  }

  return (
    <PageLayout 
      title={post.title}
      subtitle={post.excerpt}
    >
      <article className="max-w-4xl mx-auto">
        <BlogPostHeader post={post} />
        <BlogPostContent content={post.content} />
        <BlogPostNavigation />
        <RelatedPosts relatedPosts={relatedPosts} />
      </article>
    </PageLayout>
  );
};

export default BlogPost;

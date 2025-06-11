
// Blog post type definition
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  readTime: number;
  image_url: string;
}

// Import blog posts from category-specific files
import { propertyManagementPosts } from './blog/propertyManagementPosts';
import { tenantRelationsPosts } from './blog/tenantRelationsPosts';
import { investmentAdvicePosts } from './blog/investmentAdvicePosts';
import { maintenancePosts } from './blog/maintenancePosts';
import { marketTrendsPosts } from './blog/marketTrendsPosts';
import { technologyPosts } from './blog/technologyPosts';

// Combine all blog posts
export const blogPosts: BlogPost[] = [
  ...propertyManagementPosts,
  ...tenantRelationsPosts,
  ...investmentAdvicePosts,
  ...maintenancePosts,
  ...marketTrendsPosts,
  ...technologyPosts
];

// Export categories for filtering
export const blogCategories = [
  "Property Management",
  "Tenant Relations", 
  "Investment Advice",
  "Maintenance",
  "Market Trends",
  "Technology"
];

// Helper functions
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

export const getFeaturedPosts = (count: number = 3): BlogPost[] => {
  return blogPosts.slice(0, count);
};

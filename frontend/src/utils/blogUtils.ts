import { BlogPostData } from '@/integrations/supabase/client';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

// Categories to choose from
const categories = [
  'property-management',
  'rental-tips',
  'investment-advice',
  'maintenance',
  'tenant-relations',
  'market-trends',
  'legal-updates',
  'technology',
  'sustainability'
];

// Sample author information
const authors = [
  { name: 'Alex Johnson', role: 'Property Manager' },
  { name: 'Sarah Williams', role: 'Real Estate Investor' },
  { name: 'David Chen', role: 'Market Analyst' },
  { name: 'Maya Patel', role: 'Legal Advisor' },
  { name: 'Robert Taylor', role: 'Technology Specialist' }
];

// Sample image URLs
const imageUrls = [
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1560184897-ae75f418493e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'
];

// Sample title templates
const titleTemplates = [
  "Top {number} {topic} Strategies for Property Managers",
  "How to {action} Your {subject} for Maximum ROI",
  "The Ultimate Guide to {topic} in {year}",
  "{number} Ways to Improve {subject} in Your Properties",
  "{action} Your Way to Better {subject} Management",
  "Why {subject} Matters for Today's Property Investors",
  "{topic} Trends to Watch in {year}",
  "Mastering {topic}: Expert Tips for Property Managers"
];

// Topic words for title generation
const topics = [
  "Property Management", "Tenant Screening", "Rental Market", 
  "Maintenance", "Investment", "Rental Property", "Landlord",
  "Real Estate", "Property Value", "Tenant Retention"
];

// Action words for title generation
const actions = [
  "Optimize", "Improve", "Maximize", "Transform", "Streamline",
  "Enhance", "Revitalize", "Modernize", "Revolutionize", "Upgrade"
];

// Subject words for title generation
const subjects = [
  "Rental Properties", "Property Portfolio", "Tenant Relations",
  "Property Maintenance", "Rental Income", "Property Management Workflow",
  "Rental Strategy", "Investment Returns", "Property Value"
];

// Function to generate random date within the last year
const generateRandomDate = (): string => {
  const now = new Date();
  const pastYear = new Date();
  pastYear.setFullYear(now.getFullYear() - 1);
  
  const randomTimestamp = pastYear.getTime() + Math.random() * (now.getTime() - pastYear.getTime());
  const randomDate = new Date(randomTimestamp);
  
  return randomDate.toISOString().split('T')[0]; // YYYY-MM-DD format
};

// Function to generate a random title
const generateRandomTitle = (): string => {
  const template = titleTemplates[Math.floor(Math.random() * titleTemplates.length)];
  const topic = topics[Math.floor(Math.random() * topics.length)];
  const action = actions[Math.floor(Math.random() * actions.length)];
  const subject = subjects[Math.floor(Math.random() * subjects.length)];
  const number = Math.floor(Math.random() * 10) + 5; // Random number between 5 and 14
  const year = new Date().getFullYear();
  
  return template
    .replace('{topic}', topic)
    .replace('{action}', action)
    .replace('{subject}', subject)
    .replace('{number}', number.toString())
    .replace('{year}', year.toString());
};

// Function to generate random slug from title with unique suffix
const generateSlugFromTitle = (title: string): string => {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-');
  
  // Add timestamp and random suffix to ensure uniqueness
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  
  return `${baseSlug}-${timestamp}-${randomSuffix}`;
};

// Function to generate random paragraphs for content
const generateRandomContent = (paragraphs: number = 5): string => {
  const sentences = [
    "Property management requires attention to detail and proactive strategies.",
    "Regular maintenance schedules can prevent costly repairs in the future.",
    "Effective tenant screening is essential for long-term rental success.",
    "Market analysis helps property managers make informed decisions.",
    "Technology integration improves efficiency in property management operations.",
    "Building strong relationships with tenants leads to higher retention rates.",
    "Understanding local regulations is crucial for property management compliance.",
    "Energy-efficient upgrades can reduce costs and attract environmentally conscious tenants.",
    "Professional property management services provide value to investment property owners.",
    "Regular property inspections help identify issues before they become problems.",
    "Clear communication with tenants helps prevent misunderstandings and conflicts.",
    "Proper documentation protects property managers and owners in legal situations.",
    "Strategic pricing based on market trends maximizes rental income.",
    "Quality photographs and virtual tours enhance property listings.",
    "Responsive maintenance services contribute to tenant satisfaction.",
    "Background checks help ensure reliable tenants.",
    "Understanding rental market cycles helps optimize investment strategies.",
    "Property management software streamlines administrative tasks.",
    "Regular financial reviews help identify opportunities for cost savings.",
    "Professional networks provide valuable resources for property managers."
  ];

  let content = '';
  
  for (let i = 0; i < paragraphs; i++) {
    const paragraphLength = Math.floor(Math.random() * 5) + 3; // 3-7 sentences per paragraph
    let paragraph = '';
    
    for (let j = 0; j < paragraphLength; j++) {
      const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
      paragraph += randomSentence + ' ';
    }
    
    content += paragraph.trim() + '\n\n';
  }
  
  return content.trim();
};

// Function to generate a random blog post
export const generateRandomBlogPost = (): BlogPostData => {
  const title = generateRandomTitle();
  const author = authors[Math.floor(Math.random() * authors.length)];
  const date = generateRandomDate();
  const category = categories[Math.floor(Math.random() * categories.length)];
  const content = generateRandomContent();
  const imageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
  
  return {
    id: crypto.randomUUID(),
    title,
    excerpt: content.split('\n\n')[0],
    content,
    date,
    author: author.name,
    author_role: author.role,
    category,
    image_url: imageUrl,
    slug: generateSlugFromTitle(title),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
};

// Function to add a batch of random blog posts to the database
export const addRandomBlogPosts = async (count: number = 5): Promise<boolean> => {
  try {
    const posts: BlogPostData[] = [];
    
    for (let i = 0; i < count; i++) {
      posts.push(generateRandomBlogPost());
    }
    
    const { error } = await supabase
      .from('blog_posts')
      .insert(posts);
    
    if (error) {
      console.error('Error adding blog posts:', error);
      toast({
        title: "Error adding blog posts",
        description: error.message,
        variant: "destructive"
      });
      return false;
    }
    
    toast({
      title: "Success!",
      description: `${count} blog posts have been added.`,
      variant: "default"
    });
    return true;
  } catch (error: any) {
    console.error('Unexpected error adding blog posts:', error);
    toast({
      title: "Error adding blog posts",
      description: "An unexpected error occurred.",
      variant: "destructive"
    });
    return false;
  }
};

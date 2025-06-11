import { createClient } from '@supabase/supabase-js'
import { Database } from './types'

// Get environment variables securely
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Create client with fallback values for development
export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseKey
)

// Type definition for blog posts to use throughout the app
export interface BlogPostData {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  author_role: string;
  category: string;
  image_url: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
}
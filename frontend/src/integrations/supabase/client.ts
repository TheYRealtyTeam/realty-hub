import { createClient } from '@supabase/supabase-js'
import { Database } from './types'

// Get environment variables securely
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate that required environment variables are present
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing required environment variables: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY')
}

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
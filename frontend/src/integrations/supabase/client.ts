
import { createClient } from '@supabase/supabase-js'
import { Database } from './types'

const supabaseUrl = 'https://axgepdguspqqxudqnobz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4Z2VwZGd1c3BxcXh1ZHFub2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMjE0MjIsImV4cCI6MjA1OTc5NzQyMn0.GFk04igJ-d6iEB_Da8et-ZVG_eRi9u9xbCbRLnGKdEY'

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

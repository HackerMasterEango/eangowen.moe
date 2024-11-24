// Client components should use this function to create a Supabase client.
import { createBrowserClient } from '@supabase/ssr'

// spam calling this is fine, createBrowserClient will return the same instance its a singletone.
export const supabaseBrowserClient = () => {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

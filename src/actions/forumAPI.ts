'use server'
import { SupabaseClient } from '@supabase/supabase-js'

// Define the structure of the RPC response for posts list
type RpcListPostsResponse = {
  id: string
  post_title: string | null
  average_vote: number | null
  created_at: string | null
}

// Define the structure of a single post from posts list
type ListPostsElement = {
  id: string
  title: string | null
  votes: number | null
  timestamp: string | null
}

// Define the overall response structure of list of posts
type ListPostsReturn = {
  posts: ListPostsElement[] | null // Array of posts or null if there's an error
  error: boolean // Indicates whether there was an error
}

// Function to return a list of posts
// TODO: Add parameter to filter based on topic
export async function listAllPosts(
  supabase: SupabaseClient,
  pageNumber: number = 1, //Default to page 1
  pageSize: number = 20 //Default to 20 entries per request
): Promise<ListPostsReturn> {
  // Query with rpc function
  const { data, error} = await supabase
    .rpc('list_forum_posts_with_aggregate_votes', {
      page_number: pageNumber,
      page_size: pageSize
    })

    if (error || !data) {
      return {
        posts: null,
        error: true,
      }
    }

    // Map the RPC response into the expected format
    const rpcPostsList: ListPostsElement[] = data.map((post: RpcListPostsResponse) => ({
      id: post.id,
      title: post.post_title || null,
      votes: post.average_vote || null,
      timestamp: post.created_at || null,
    }))

    return {
      posts: rpcPostsList,
      error: false,
    }
}
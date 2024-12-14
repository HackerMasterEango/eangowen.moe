'use server'
import { SupabaseClient } from '@supabase/supabase-js'


///////////////////////////////////////
//Read list of posts types
///////////////////////////////////////

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
  rating: number | null
  timestamp: string | null
}

// Define the overall response structure of list of posts
type ListPostsReturn = {
  posts: ListPostsElement[] | null // Array of posts or null if there's an error
  error: boolean // Indicates whether there was an error
}


///////////////////////////////////////
//Read list of posts function
///////////////////////////////////////

// Function to return a list of posts
// TODO: Add parameter to filter based on topic
export async function listPosts(
  supabase: SupabaseClient,
  pageNumber: number = 1, //Default to page 1
  pageSize: number = 20 //Default to 20 entries per request
): Promise<ListPostsReturn> {
  // Query with rpc function
  const {data, error} = await supabase
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
      rating: post.average_vote || null,
      timestamp: post.created_at || null,
    }))

    return {
      posts: rpcPostsList,
      error: false,
    }
}


///////////////////////////////////////
//Read single post types
///////////////////////////////////////

// Define the structure of the RPC response of comments list for post
type RpcReadPostCommentsResponse = {
  id: string
  user_id: string | null
  reply_id: string | null
  reply_content: string | null
  average_vote: number | null
  created_at: string | null
}

// Define the structure of the RPC response for post
/*type RpcReadPostResponse = {
  id: string
  user_id: string | null
  post_title: string | null
  post_content: string | null
  topic_id: string | null
  average_vote: number | null
  created_at: string | null
}*/

type ReadPostCommentsElement = {
  id: string
  userId: string | null
  replyId: string | null
  replyContent: string | null
  rating: string | null
  timestamp: string | null
}

// Define the structure of the RPC response for posts list
type ReadPostElement = {
  id: string
  userId: string | null
  postTitle: string | null
  postContent: string | null
  rating: number | null
  timestamp: string | null
  comments: ReadPostCommentsElement[] | null
}

// Define the overall response structure of read post
type ReadPostReturn = {
  post: ReadPostElement | null // A single post or null if there's an error
  error: boolean // Indicates whether there was an error
}


///////////////////////////////////////
//Read a single post function
///////////////////////////////////////

// Function to read a post by id
// returns post contents + comments + votes for both
export async function readPost(
  supabase: SupabaseClient,
  postId: string //uuid of post
): Promise<ReadPostReturn> {
  // Query comments with rpc function. Needs to loop until reply_id is null or limit reached
  const {data: postComments, error: postCommentsError} = await supabase
    .rpc('read_forum_post_comments_with_aggregate_votes', {
      post_id: postId
    })

    if (postCommentsError || !postComments) {
      return {
        post: null,
        error: true,
      }
    }

    // Map the RPC response into the expected format
    const rpcCommentsList: ReadPostCommentsElement[] = postComments.map((comment: RpcReadPostCommentsResponse) => ({
      id: comment.id,
      userId: comment.user_id || null,
      replyId: comment.reply_id || null,
      replyContent: comment.reply_content || null,
      rating: comment.average_vote || null,
      timestamp: comment.created_at || null
    }))

    //Query post with rpc function
    const {data: postData, error: postDataError} = await supabase
    .rpc('read_forum_post_with_aggregate_votes', {
      post_id: postId
    })

    if (postDataError || !postData) {
      return {
        post: null,
        error: true,
      }
    }

    const rpcPost: ReadPostElement = {
      id: postData.id,
      userId: postData.user_id,
      postTitle: postData.post_title,
      postContent: postData.post_content,
      rating: postData.average_vote,
      timestamp: postData.created_at,
      comments: rpcCommentsList
    }

    return {
      post: rpcPost,
      error: false
    }
}
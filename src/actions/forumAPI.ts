'use server'
import { PostgrestError, SupabaseClient } from '@supabase/supabase-js'


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
  error: PostgrestError | null // Indicates whether there was an error
}


///////////////////////////////////////
//Read list of posts function
///////////////////////////////////////

// Function to return a list of posts
export async function listAllPosts(
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
        error: error
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
      error: error
    }
}

///////////////////////////////////////
//Read list of posts by topic function
///////////////////////////////////////

// Function to return a list of posts
export async function listPostsByTopic(
  supabase: SupabaseClient,
  topicId: string,
  pageNumber: number = 1, //Default to page 1
  pageSize: number = 20 //Default to 20 entries per request
): Promise<ListPostsReturn> {
    // Query with rpc function
    const {data, error} = await supabase
    .rpc('list_forum_posts_by_topic_with_aggregate_votes', {
      topic_id: topicId,
      page_number: pageNumber,
      page_size: pageSize
    })

    if (error || !data) {
      return {
        posts: null,
        error: error
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
      error: error
    }
}


///////////////////////////////////////
//Read list of posts by user function
///////////////////////////////////////

// Function to return a list of posts
export async function listPostsByUser(
  supabase: SupabaseClient,
  userId: string,
  pageNumber: number = 1, //Default to page 1
  pageSize: number = 20 //Default to 20 entries per request
): Promise<ListPostsReturn> {
    // Query with rpc function
    const {data, error} = await supabase
    .rpc('list_forum_posts_by_user_with_aggregate_votes', {
      user_id: userId,
      page_number: pageNumber,
      page_size: pageSize
    })

    if (error || !data) {
      return {
        posts: null,
        error: error
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
      error: error
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

// Define the structure of the RPC response for post read
type ReadPostElement = {
  id: string
  userId: string | null
  postTitle: string | null
  postContent: string | null
  rating: number | null
  timestamp: string | null
  comments: ReadPostCommentsElement[] | null
}

// Define the overall response structure of read comments from post
type ReadPostCommentsReturn = {
  comments: ReadPostCommentsElement[] | null // A single post or null if there's an error
  error: PostgrestError | null // Indicates whether there was an error
}

// Define the overall response structure of read post
type ReadPostReturn = {
  post: ReadPostElement | null // A single post or null if there's an error
  postError: PostgrestError | null // Indicates whether there was an error from post request
  commentError: PostgrestError | null // Indicates whether there was an error from comments request
}

///////////////////////////////////////
//Read a single post comments function
///////////////////////////////////////

// Function to read a user's comments
export async function listCommentsByUser(
  supabase: SupabaseClient,
  userId: string, //uuid of post
  commentPageNumber: number = 1, //Page number of comments displayed
  commentPageSize: number = 20 //Page size of comments displayed
): Promise<ReadPostCommentsReturn> {
    // Query comments with rpc function
    const {data: postComments, error: postCommentsError} = await supabase
    .rpc('list_forum_comments_by_user_with_aggregate_votes', {
      user_id: userId,
      pageNumber: commentPageNumber, //Default to page 1
      pageSize: commentPageSize //Default to 20 entries per request
    })

    if (postCommentsError || !postComments) {
      return {
        comments: null,
        error: postCommentsError
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

    return {
      comments: rpcCommentsList,
      error: postCommentsError
    }
}


///////////////////////////////////////
//Read a single post comments function
///////////////////////////////////////

// Function to read a post's comments by id
// returns comments + votes for both
// used for reading new comment pages on a post
export async function readPostComments(
  supabase: SupabaseClient,
  postId: string, //uuid of post
  commentPageNumber: number = 1, //Page number of comments displayed
  commentPageSize: number = 20 //Page size of comments displayed
): Promise<ReadPostCommentsReturn> {
    // Query comments with rpc function
    const {data: postComments, error: postCommentsError} = await supabase
    .rpc('read_forum_post_comments_with_aggregate_votes', {
      post_id: postId,
      pageNumber: commentPageNumber, //Default to page 1
      pageSize: commentPageSize //Default to 20 entries per request
    })

    if (postCommentsError || !postComments) {
      return {
        comments: null,
        error: postCommentsError
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

    return {
      comments: rpcCommentsList,
      error: postCommentsError
    }
}

///////////////////////////////////////
//Read a single post function
///////////////////////////////////////

// Function to read a post by id
// returns post contents + comments + votes for both
export async function readPost(
  supabase: SupabaseClient,
  postId: string, //uuid of post
  commentPageNumber: number = 1, //Page number of comments displayed (most likely always 1)
  commentPageSize: number = 20 //Page size of comments displayed
): Promise<ReadPostReturn> {
    // Query comments with async comments function
    const readPostCommentsResults = await readPostComments(supabase, postId, commentPageNumber, commentPageSize)

    //Query post with rpc function
    const {data: postData, error: postDataError} = await supabase
    .rpc('read_forum_post_with_aggregate_votes', {
      post_id: postId
    })

    if (postDataError || !postData) {
      return {
        post: null,
        postError: postDataError,
        commentError: readPostCommentsResults.error
      }
    }

    const commentsList = readPostCommentsResults.error ? null : readPostCommentsResults.comments

    const rpcReadPost: ReadPostElement = {
      id: postData.id,
      userId: postData.user_id,
      postTitle: postData.post_title,
      postContent: postData.post_content,
      rating: postData.average_vote,
      timestamp: postData.created_at,
      comments: commentsList
    }

    return {
      post: rpcReadPost,
      postError: postDataError,
      commentError: readPostCommentsResults.error
    }
}


///////////////////////////////////////
//Update functions types
///////////////////////////////////////

// Define the overall response structure of post/comment updates
type UpdateReturn = {
  error: PostgrestError | null // Indicates whether there was an error
}


///////////////////////////////////////
//Write a post function
///////////////////////////////////////

// Function to write a single post
export async function writePost(
  supabase: SupabaseClient,
  userId: string,
  postTitle: string,
  postContent: string,
  topicId: string | null
): Promise<UpdateReturn> {
    const {error: writeError} = await supabase
    .from('forum.posts')
    .insert([
      {
        user_id: userId,
        post_title: postTitle,
        post_content: postContent,
        topic_id: topicId
      }
    ])

    return {error: writeError}
}


///////////////////////////////////////
//Write a comment on a post function
///////////////////////////////////////

// Function to write a single post
export async function writeCommentForPost(
  supabase: SupabaseClient,
  postId: string,
  userId: string,
  replyId: string | null, //comment being replied to
  replyContent: string
): Promise<UpdateReturn> {
    const {error: writeError} = await supabase
    .from('forum.comments')
    .insert([
      {
        post_id: postId,
        user_id: userId,
        reply_id: replyId,
        reply_content: replyContent
      }
    ])

    return {error: writeError}
}

///////////////////////////////////////////
//Soft delete a post function
///////////////////////////////////////////

// Function to update comment to have blank message
export async function softDeletePost(
  supabase: SupabaseClient,
  id: string
): Promise<UpdateReturn> {
    const {error: writeError} = await supabase
    .from('forum.posts')
    .update([
      {
        post_content: null
      }
    ])
    .eq('id', id)

    return {error: writeError}
}

///////////////////////////////////////////
//Soft delete a comment on a post function
///////////////////////////////////////////

// Function to update comment to have blank message
export async function softDeleteComment(
  supabase: SupabaseClient,
  id: string
): Promise<UpdateReturn> {
    const {error: writeError} = await supabase
    .from('forum.comments')
    .update([
      {
        reply_content: null
      }
    ])
    .eq('id', id)

    return {error: writeError}
}


///////////////////////////////////////////
//Hard delete a post function
///////////////////////////////////////////

// Function to completely remove post entry
export async function hardDeletePost(
  supabase: SupabaseClient,
  id: string
): Promise<UpdateReturn> {
    const {error: writeError} = await supabase
    .from('forum.posts')
    .delete()
    .eq('id', id)

    return {error: writeError}
}


///////////////////////////////////////////
//Hard delete a comment function
///////////////////////////////////////////

// Function to completely remove comment entry
export async function hardDeleteComment(
  supabase: SupabaseClient,
  id: string
): Promise<UpdateReturn> {
    const {error: writeError} = await supabase
    .from('forum.comments')
    .delete()
    .eq('id', id)

    return {error: writeError}
}
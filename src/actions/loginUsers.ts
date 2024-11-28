'use server'
import { supabaseServerClient } from '@/lib/supabase/serverClient'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const loginUser = async (_: unknown, formData: FormData) => {
  const supabase = await supabaseServerClient()

  const userIdentifier = formData.get('userIdentifier') as string //should change form name
  const password = formData.get('password') as string

  let success = true

  const email = userIdentifier
  //let email = userIdentifier
  if (!userIdentifier.includes('@')) {
    /* TODO: Add username authentication
    // If identifier is not an email, treat it as a username
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', userIdentifier)
      .single();

    if (profileError || !profileData) {
      success = false;
      console.log("Profile Error: ", profileError)
      return { success, fieldData: { userIdentifier, password } };
    }

    console.log("Id: ", profileData.id)

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData) {
      success = false;
      console.log("User Error: ", userError)
      return { success, fieldData: { userIdentifier, password } };
    }

    email = userData.user.email as string // Retrieve the associated email for the username
    console.log("Email: ", email)
    */
  }

  const { error: authError } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (authError) {
    success = false
  }

  revalidatePath('/', 'layout')

  return { success, fieldData: { email, password } }
}

//Expects email, username, and password in FormData
export const signUp = async (formData: FormData) => {
  const supabase = await supabaseServerClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (authError) {
    console.log("Auth Error: ", authError)
    redirect('/error')
  }

  //Might want to make this an atomic query
  const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData!.user!.id, // Extract the user ID from auth table update. Enforce non-null
            username: formData.get('username') ? (formData.get('username') as string) : undefined //Nullable defined in schema
          }
        ])

if (profileError) {
  console.log("Profile Error: ", profileError)
  redirect('/error')
}

  revalidatePath('/', 'layout')
  redirect('/')
}

export const logOut = async () => {
  const supabase = await supabaseServerClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
}

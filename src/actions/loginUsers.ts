'use server'
import { supabaseServerClient } from '@/lib/supabase/serverClient'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const resolveEmailFromIdentifier = async (identifier: string) => {
  //const supabase = await supabaseServerClient()
  // Default to treating the identifier as an email
  if (identifier.includes('@')) {
    return { email: identifier, error: null }
  }
  /* TODO: Implement solution from this:
  https://stackoverflow.com/questions/78550922/how-do-i-authorise-users-with-username-in-supabase
  // Treat the identifier as a username and fetch the associated email
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', identifier)
    .single();

  if (profileError || !profileData) {
    return { email: null, error: profileError || new Error('Username not found') };
  }

  return { email: profileData.email, error: null };*/

  return { email: identifier, error: null }
}

export const loginUser = async (_: unknown, formData: FormData) => {
  const supabase = await supabaseServerClient()

  const userIdentifier = formData.get('userIdentifier') as string //should change form name
  const password = formData.get('password') as string

  let success = true

  const email = (await resolveEmailFromIdentifier(userIdentifier)).email as string

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
  const { error: authError } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (authError) {
    console.log("Auth Error: ", authError)
    redirect('/error')
  }

  /* username is now updated by trigger
  //Might want to make this an atomic query
  const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData!.user!.id, // Extract the user ID from auth table update. Enforce non-null
            username: formData.get('username') as string //Nullable defined in schema
          }
        ])

if (profileError) {
  console.log("Profile Error: ", profileError)
  redirect('/error')
}
*/
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

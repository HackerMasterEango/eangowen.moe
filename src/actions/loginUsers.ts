'use server'
import { supabaseServerClient } from '@/lib/supabase/serverClient'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const loginUser = async (previousState: unknown, formData: FormData) => {
  const supabase = await supabaseServerClient()

  const identifier = formData.get('email') as string //should change form name
  const password = formData.get('password') as string

  let success = true

  let email = identifier
  if (!identifier.includes('@')) {
    // If identifier is not an email, treat it as a username
    const { data, error } = await supabase
      .from('profiles')
      .select('email')
      .eq('username', identifier)
      .single();

    if (error || !data) {
      success = false;
      return { success, fieldData: { identifier, password } };
    }

    email = data.email; // Retrieve the associated email for the username
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    success = false
  }

  revalidatePath('/', 'layout')

  return { success, fieldData: { email, password } }
}

export const signUp = async (formData: FormData) => {
  const supabase = await supabaseServerClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }

  const { data: authData, error: authError } = await supabase.auth.signUp(data)

  if (authError) {
    redirect('/error')
  }

  const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            user_id: authData!!.user!!.id, // Extract the user ID from auth table update
            username: formData.get('username') ? (formData.get('username') as string) : undefined //Think this makes it optional idk lel
          }
        ])

if (profileError) {
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

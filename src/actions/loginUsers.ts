'use server'
import { supabaseServerClient } from '@/lib/supabase/serverClient'
import { SupabaseClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

type ResolveEmailIdentifierResponse = {
  email: string | null
  error: boolean
}
const resolveEmailFromIdentifier = async (supabase: SupabaseClient,identifier: string):
Promise<ResolveEmailIdentifierResponse> => {

  // Default to treating the identifier as an email
  if (identifier.includes('@')) {
    return { email: identifier, error: false }
  }

  // Treat the identifier as a username and fetch the associated email
  const { data, error } = await supabase
    .from('profiles')
    .select('email')
    .eq('username', identifier)
    .single()

  if (error || !data) {
    return { email: null, error: true }
  }

  return { email: data.email, error: false }
}
export const loginUser = async (_: unknown, formData: FormData) => {
  const supabase = await supabaseServerClient()

  // TODO: add zod validation
  const userIdentifier = formData.get('userIdentifier') as string
  const password = formData.get('password') as string
  
  const { email, error: emailError } = await resolveEmailFromIdentifier(supabase, userIdentifier)
  if (emailError || !email) {
    return { success: false }
  }

  const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
  revalidatePath('/', 'layout')
  
  return {
    success: !authError,
    ...((!authError && { fieldData: { email, password } }) || {})
  }
}

// Expects email, username, and password in FormData
export const signUp = async (formData: FormData) => {
  const supabase = await supabaseServerClient()

  // TODO: use zod to validate form data
  const { error: authError } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      // NOTE: everything here will be synced in a public profiles table
      data: {
        username: formData.get('username') as string,
        email: formData.get('email') as string
      }
    }
  })

  if (authError) {
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

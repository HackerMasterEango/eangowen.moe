'use server'
import { supabaseServerClient } from '@/lib/supabase/serverClient'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const loginUser = async (previousState: unknown, formData: FormData) => {
  const supabase = await supabaseServerClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  let success = true

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

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

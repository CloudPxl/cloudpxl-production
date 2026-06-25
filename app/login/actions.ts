'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/server'

export type AuthResponse = { error?: string; success?: string }

export async function login(formData: FormData): Promise<AuthResponse> {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("Login Error:", error.message)
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/') 
}

export async function signup(formData: FormData): Promise<AuthResponse> {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string
  const name = formData.get('name') as string

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.' }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
    },
  })

  if (error) {
    return { error: error.message }
  }

  if (data.user && !data.session) {
    return { success: 'Enterprise environment provisioned. Please check your email to securely verify your account.' }
  }

  revalidatePath('/', 'layout')
  redirect('/') 
}

export async function resetPassword(formData: FormData): Promise<AuthResponse> {
  const supabase = await createClient()
  const email = formData.get('email') as string

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/login?view=reset`,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: 'Check your email for the reset link.' }
}

// THE FIX: Added callbackUrl parameter and mapped it to redirectTo
export async function signInWithOAuth(provider: 'google' | 'github', callbackUrl: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: callbackUrl, 
    },
  })

  if (error) {
    console.error("OAuth Error:", error.message)
    redirect(`/login?error=Could_not_authenticate_with_${provider}`)
  }

  if (data.url) {
    redirect(data.url) 
  }
}
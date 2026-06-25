import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  
  // We use the 'next' parameter if it exists, otherwise default to the root dashboard
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    
    // Trade the temporary ticket for a secure session cookie
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // SUCCESS: Hardcoded to your exact production domain to prevent cookie domain mismatch
      return NextResponse.redirect(`https://www.cloudpxl.com${next}`)
    } else {
      console.error('Auth Callback Token Exchange Error:', error.message)
    }
  }

  // FAILURE: If there's no code or the exchange failed, kick them back to login
  return NextResponse.redirect(`https://www.cloudpxl.com/login?error=auth_callback_failed`)
}
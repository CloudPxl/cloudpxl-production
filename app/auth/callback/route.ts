import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  
  const nextParam = searchParams.get('next')
  const next =
    nextParam && nextParam.startsWith('/') && !nextParam.startsWith('//')
      ? nextParam
      : '/'

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
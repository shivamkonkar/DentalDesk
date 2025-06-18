// src/app/auth/callback/route.ts
import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server' 
import { revalidatePath } from 'next/cache'; 

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  let next = requestUrl.searchParams.get('next');
  const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const defaultRedirectPath = '/dashboard';
  let redirectBaseUrl = NEXT_PUBLIC_BASE_URL;

  if (!redirectBaseUrl) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error("NEXT_PUBLIC_BASE_URL must be set in production");
    }
    console.error("NEXT_PUBLIC_BASE_URL is not set. Falling back to http://localhost:3000");
    redirectBaseUrl = 'http://localhost:3000';
  }

  let validatedNextPath = defaultRedirectPath;

  if (next) {
    if (next.startsWith('http://') || next.startsWith('https://')) {
      try {
        const nextUrl = new URL(next);
        const baseUrl = new URL(redirectBaseUrl);
        if (nextUrl.origin === baseUrl.origin) {
          validatedNextPath = nextUrl.pathname + nextUrl.search + nextUrl.hash;
        } else {
          console.warn(`Open redirect attempt blocked. Provided next URL (${next}) has a different origin than the allowed base URL (${redirectBaseUrl}). Using default redirect path (${defaultRedirectPath}) instead.`);
        }
      } catch (error) {
        console.warn(`Invalid next URL provided (${next}). Using default redirect path (${defaultRedirectPath}). Error: ${error}`);
      }
    } else if (next.startsWith('/')) {
      validatedNextPath = next;
    } else {
      console.warn(`Invalid next parameter provided (${next}). It should be a relative path starting with '/' or an absolute URL matching the base URL origin. Using default redirect path (${defaultRedirectPath}).`);
    }
  } else {
    // If next is null or empty, validatedNextPath will remain defaultRedirectPath
    next = defaultRedirectPath; // ensure 'next' variable itself is also updated for logging or other uses if any
    validatedNextPath = defaultRedirectPath;
  }


  if (code) {
    const supabase = await createClient();
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (!exchangeError) {
      revalidatePath('/', 'layout');
      const finalRedirectUrl = new URL(validatedNextPath, redirectBaseUrl).toString();
      return NextResponse.redirect(finalRedirectUrl);
    } else {
      console.error("Auth Callback - Error exchanging code for session:", exchangeError.message);

      // Ensure error redirect URL is also safe and within the application's domain
      const errorRedirectUrl = new URL('/signin', redirectBaseUrl);
      errorRedirectUrl.searchParams.set('error', 'authentication_failed');
      errorRedirectUrl.searchParams.set('error_reason', 'session_exchange_failed'); // Generic error reason
      return NextResponse.redirect(errorRedirectUrl.toString());
    }
  } else {
    console.warn("Auth Callback - No 'code' parameter found in URL.");
  }

  // Fallback error URL for cases where 'code' is missing or other unhandled scenarios
  // This already uses a generic message.
  const fallbackErrorUrl = new URL('/signin', redirectBaseUrl); // Use redirectBaseUrl here as well
  fallbackErrorUrl.searchParams.set('error', 'Invalid login link or link expired.');
  return NextResponse.redirect(fallbackErrorUrl.toString());
}
'use server'

import { createClient } from '@/lib/supabase/server'

export interface AuthActionResult {
  success: boolean;
  message?: string;
  error?: string;
}

export async function sendMagicLink(formData: FormData): Promise<AuthActionResult> {
  const supabase = await createClient();
  const email = formData.get('email') as string;

  
   if (!email || typeof email !== 'string') {
     return { success: false, error: 'Valid email is required.' };
   }
 
   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   if (!emailRegex.test(email.trim())) {
     return { success: false, error: 'Please enter a valid email address.' };
   }
 

  const sanitizedEmail = email.trim().toLowerCase();

  

  
  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    return { success: false, error: 'Configuration error. Please try again later. NEXT_PUBLIC_BASE_URL missing ' };
  }

  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_BASE_URL.startsWith('https://')) {
    return { success: false, error: 'Secure connection required.' };
  }

  const redirectTo = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`;

  const { error } = await supabase.auth.signInWithOtp({
    email: sanitizedEmail,
    options: {
      emailRedirectTo: redirectTo, 
      shouldCreateUser: true,
    },
  });

  if (error) {
    console.log("magic link error: ", error);
    return { success: false, error: `Failed to send login link. Please try again.` };
  }
  return { success: true, message: `Login link sent to ${sanitizedEmail}. Please check your inbox.` };
}

// --- OAuth Actions ---

export interface OAuthSignInResult extends AuthActionResult {
  url?: string | null; // URL for client-side redirection
}


async function generateOAuthSignInUrl(provider: 'google') {
  const supabase = await createClient();

  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    return { success: false, error: 'Configuration error. Please try again later.' };
  }

  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_BASE_URL.startsWith('https://')) {
    return { success: false, error: 'Secure connection required.' };
  }

  const redirectTo = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectTo,
    },
  });

  if (error) {
    console.error(`OAuth Error (${provider}):`, error);
    return { success: false, error: `Failed to initiate ${provider} sign-in: Please try again` };
  }

  if (!data.url) {
    return { success: false, error: `Could not get ${provider} sign-in URL.` };
  }

  return { success: true, url: data.url };
}

export async function signInWithGoogle() {
  return generateOAuthSignInUrl('google');
}

export async function signOut() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut({
      scope: 'global' 
    });
    
    if (error) {
      console.error('Signout error:', error);
      return { success: false, error: 'Sign out failed. Please try again.' };
    }
    
    return { success: true, message: 'Successfully signed out.' };
  } catch (err) {
    console.error('Unexpected signout error:', err);
    return { success: false, error: 'An unexpected error occurred during sign out.' };
  }
}


export async function refreshSession(){
  try{
    const supabase = await createClient();
    const { error } = await supabase.auth.refreshSession()
    if (error) {
      console.error('Refresh Failed', error);
      return { success: false, error: 'Refresh failed. sign in again.' };
    }
    return { success: true, message: 'Session Refreshed Successufully' };
  }
  catch (err) {
    console.error('Unexpected refresh token error:',err);
    return { success: false, error: 'An unexpected error occurred ' };
  }
}

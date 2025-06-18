"use client"; 

import GoogleIcon from "@/components/icons/GoogleIcon"; 
import { useState } from "react"; 
import React from "react"; 
import { OAuthButton } from "./OAuthButton";
import { MagicUrlForm } from "./MagicUrlForm";
import { sendMagicLink, AuthActionResult, signInWithGoogle, OAuthSignInResult } from '@/lib/actions/authActions';


export function AuthForm() {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);  
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');


  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailLoading(true);
    setMessage('');
    setError('');

    const formData = new FormData();
    formData.append('email', email);

    const result: AuthActionResult = await sendMagicLink(formData);

    if (result.success) {
      setMessage(result.message || 'Login link sent!');
      setEmail(''); 
    } else {
      setError('An error occurred.');
      console.error(error); 
    }
    setEmailLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
  
    try {
    
      const result: OAuthSignInResult = await signInWithGoogle();
      console.log(result);
      
      
      if (result.success && result.url) {
        const url = new URL(result.url);
  
        if (
          url.hostname.includes('supabase') ||
          url.hostname.includes('google')
        ) {
          window.location.href = result.url;
        } else {
          throw new Error('Invalid redirect URL');
        }
      } else {
        setError('Google sign-in failed. Please try again.');
        console.error(error);
        setGoogleLoading(false);
      }
    } catch (error) {
      setError('Authentication failed. Please try again.');
      console.error(error);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="space-y-6"> 
      <MagicUrlForm
        handleMagicLinkLogin={handleEmailSubmit} 
        isLoading={emailLoading} 
        email={email}
        setEmail={setEmail}
        submitButtonText= {"Sign in with Email"}
      />
      <div className="my-4 text-green-800 text-sm">
        {message === ""?null:message}
      </div>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <OAuthButton
        handleClick={handleGoogleSignIn}
        isLoading={googleLoading} 
        Icon={GoogleIcon}
        text="Google"
      />
    </div>
  );
}
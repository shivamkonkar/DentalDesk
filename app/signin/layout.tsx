import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server'; 
import React from 'react';


export default async function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const supabase = await createClient(); 
  const { data: { user }} = (await supabase.auth.getUser());
  const { data: {session}} = await supabase.auth.getSession();

  if (user && session){
    const { data } = await supabase.auth.getClaims(session?.access_token)
    
    if( data?.claims.app_metadata.onboarding_status === true ){
      redirect("/dashboard")
    }

    if( data?.claims.app_metadata.onboarding_status === false ){
      redirect("/onboarding")
    }
  }

  return (
    <>
      <main className="protected-layout-main"> 
        {children}
      </main>
    </>
  );
}
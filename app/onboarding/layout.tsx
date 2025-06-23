import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server'; 
import React from 'react';


export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const supabase = await createClient(); 
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  const { data: {session}, error: sessionError } = await supabase.auth.getSession();
  
  if (userError || !user || sessionError) {
    redirect("/signin")
  }

  if (user && session){
    const { data } = await supabase.auth.getClaims(session?.access_token)

    if( data?.claims.app_metadata.onboarding_status === true ){
      redirect("/dashboard")
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
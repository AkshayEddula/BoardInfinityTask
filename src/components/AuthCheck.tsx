'use client'

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login'); // Adjust this to your auth page route
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // Or your custom loading component
  }

  if (!user) {
    return null; // This prevents the protected content from flashing before redirect
  }

  return <>{children}</>;
}

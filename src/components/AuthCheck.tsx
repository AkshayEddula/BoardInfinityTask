'use client'

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthCheck({ children, excludeRoutes = [] }: { children: React.ReactNode, excludeRoutes?: string[] }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && !excludeRoutes.includes(pathname)) {
      router.push('/login');
    }
  }, [user, loading, router, pathname, excludeRoutes]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user && !excludeRoutes.includes(pathname)) {
    return null;
  }

  return <>{children}</>;
}

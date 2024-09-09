'use client'

import Navbar from "@/components/Navbar";
import AuthCheck from "@/components/AuthCheck";
import { usePathname } from 'next/navigation';

export default function LayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const noNavbarRoutes = ['/login', '/signup'];
  const showNavbar = !noNavbarRoutes.includes(pathname);

  return (
    <div className="flex h-screen bg-gray-200">
      {showNavbar && (
        <div className="w-48 m-5 mx-4">
          <Navbar />
        </div>
      )}
      <div className={`flex-1 overflow-auto ${!showNavbar ? 'w-full' : ''}`}>
        <AuthCheck excludeRoutes={noNavbarRoutes}>
          {children}
        </AuthCheck>
      </div>
    </div>
  );
}

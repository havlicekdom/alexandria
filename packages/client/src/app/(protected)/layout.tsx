"use client";

import routes from 'constants/routes';
import { useAppSelector } from 'store/hooks';
import { selectIsLoggedIn } from 'store/auth/authSlice';
import Navigation from 'components/shell/Navigation';
import TopBar from 'components/shell/TopBar';
import { ContentWrapper } from 'components/shell/ProtectedRoute/ProtectedRoute.styled';
import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push(`${routes.login}?from=${pathname}`);
    }
  }, [isLoggedIn, pathname]);

  return (
    <>
      <Navigation />
      <ContentWrapper>
        <TopBar />
        {children}
      </ContentWrapper>
    </>
  );
}

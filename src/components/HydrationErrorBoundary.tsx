'use client';

import { useEffect } from 'react';

export default function HydrationErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const onError = (e: ErrorEvent) => {
      if (e.message.includes('hydrat')) {
        window.location.reload();
      }
    };
    window.addEventListener('error', onError);
    return () => window.removeEventListener('error', onError);
  }, []);

  return <>{children}</>;
}
'use client';

import { useEffect, useState, ReactNode } from 'react';

interface ClientWrapperProps {
  children: ReactNode;
}

const ClientWrapper = ({ children }: ClientWrapperProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClient(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  if (!isClient) {
    return <div>
      Loading
    </div>;
  }

  return <>{children}</>;
};

export default ClientWrapper;
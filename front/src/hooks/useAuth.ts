import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function useAuth() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      setIsAuthenticated(!!token);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return {
    isAuthenticated,
    loading: isAuthenticated === null
  };
}

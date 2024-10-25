"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();
  const token = Cookies.get('jwt_token');

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);
  return token ? children : null;
};

export default ProtectedRoute;

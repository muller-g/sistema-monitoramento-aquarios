'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/template/header/header';

export default function ConditionalHeader() {
  const router: any = useRouter();
  const isLoginPage = router.pathname === '/login';

  return !isLoginPage ? <Header /> : null;
}

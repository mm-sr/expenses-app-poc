'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Settings } from 'lucide-react';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Expense Tracker
        </Link>
        <nav className="flex gap-2">
          <Button
            variant={pathname === '/' ? 'default' : 'ghost'}
            size="sm"
            asChild
          >
            <Link href="/">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </Link>
          </Button>
          <Button
            variant={pathname === '/settings' ? 'default' : 'ghost'}
            size="sm"
            asChild
          >
            <Link href="/settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
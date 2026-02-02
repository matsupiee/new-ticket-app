'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutList, TrendingUp, Clock, Settings } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
} from '@/shared/components/ui/sidebar';

const navItems = [
  { href: '/events', label: 'イベント一覧', icon: LayoutList },
  { href: '/sales', label: '売上確認', icon: TrendingUp },
  { href: '/analytics', label: 'お目当て分析', icon: Clock },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="none" className="border-r border-gray-200">
      <SidebarHeader className="px-4 py-5">
        <Link href="/events" className="text-lg font-bold text-gray-900">
          Ticket Dive
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/settings'}>
              <Link href="/settings">
                <Settings className="size-4" />
                <span>設定</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

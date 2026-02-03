'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutList,
  TrendingUp,
  Clock,
  Settings,
  Mail,
  Lock,
  Users,
  Ban,
  FileText,
  HelpCircle,
  LogOut,
  CreditCard,
} from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Settings className="size-4" />
                  <span>設定</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/settings/email" className="cursor-pointer">
                    <Mail className="size-4 mr-2" />
                    メールアドレスの変更
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings/password" className="cursor-pointer">
                    <Lock className="size-4 mr-2" />
                    パスワードの変更
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings/members" className="cursor-pointer">
                    <Users className="size-4 mr-2" />
                    管理メンバー
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings/ban" className="cursor-pointer">
                    <Ban className="size-4 mr-2" />
                    アカウントBAN
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/settings/bank-account"
                    className="cursor-pointer"
                  >
                    <CreditCard className="size-4 mr-2" />
                    銀行口座の登録
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings/billing" className="cursor-pointer">
                    <FileText className="size-4 mr-2" />
                    精算書の確認
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/help" className="cursor-pointer">
                    <HelpCircle className="size-4 mr-2" />
                    よくある質問
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 focus:text-red-600 cursor-pointer">
                  <LogOut className="size-4 mr-2" />
                  ログアウト
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

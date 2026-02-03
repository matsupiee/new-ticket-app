import { SidebarProvider, SidebarInset } from '@/shared/components/ui/sidebar';
import { AdminSidebar } from './_components/admin-sidebar';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="h-svh flex">
      <AdminSidebar />
      <SidebarInset className="bg-white">{children}</SidebarInset>
    </SidebarProvider>
  );
}

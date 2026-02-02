import { SidebarProvider, SidebarInset } from '@/shared/components/ui/sidebar';
import { AdminSidebar } from './_components/admin-sidebar';

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="h-svh">
      <AdminSidebar />
      <SidebarInset className="bg-white h-full">{children}</SidebarInset>
    </SidebarProvider>
  );
}

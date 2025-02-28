import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import UserProvider from '@/components/User-provider';
import { getLoggedInUser } from '@/lib/server/appwrite';

export default async function RegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getLoggedInUser();

  return (
    <SidebarProvider>
      <UserProvider value={user}>
        <AppSidebar />
        <section className='flex h-screen w-full flex-col'>
          <SidebarTrigger />
          {children}
        </section>
      </UserProvider>
    </SidebarProvider>
  );
}

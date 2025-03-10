import { AppSidebar } from '@/components/app-sidebar';
import UserProvider from '@/components/providers/User-provider';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { getConversations, getLoggedInUser } from '@/lib/server/appwrite';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getLoggedInUser();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['conversations'],
    queryFn: getConversations,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SidebarProvider>
        <UserProvider value={user}>
          <AppSidebar />
          <section className='flex h-screen w-full flex-col'>
            <SidebarTrigger />
            {children}
          </section>
        </UserProvider>
      </SidebarProvider>
    </HydrationBoundary>
  );
}

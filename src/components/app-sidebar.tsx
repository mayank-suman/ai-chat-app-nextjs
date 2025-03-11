'use client';

import { redirect } from 'next/navigation';
import { ChevronUp, PlusIcon, User2 } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getConversations, signOut } from '@/lib/server/appwrite';
import useUser from '@/hooks/use-user';
import { Button } from './ui/button';
import { useQuery } from '@tanstack/react-query';

const onSignOutButtonClick = async () => {
  await signOut();
  redirect('/');
};

export function AppSidebar() {
  const user = useUser();
  const { data: conversations } = useQuery({
    queryKey: ['conversations'],
    queryFn: getConversations,
  });

  return (
    <Sidebar collapsible='icon'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Button onClick={() => redirect('/dashboard')}>
                  <PlusIcon /> New chat
                </Button>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Recent</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {conversations?.documents.map((conversation) => (
                <SidebarMenuItem key={conversation.$id}>
                  <SidebarMenuButton asChild>
                    <a href={`/conversation/${conversation.$id}`}>
                      <span>{conversation.text}</span>
                    </a>
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
                  <User2 /> {user?.name}
                  <ChevronUp className='ml-auto' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side='top'
                className='w-[--radix-popper-anchor-width]'
              >
                <DropdownMenuItem>
                  <span onClick={onSignOutButtonClick}>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

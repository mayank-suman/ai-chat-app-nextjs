'use client';

import { redirect } from 'next/navigation';
import { ChevronUp, User2 } from 'lucide-react';
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
import { useEffect, useState } from 'react';
import { Models } from 'node-appwrite';
import useUser from '@/hooks/use-user';

const onSignOutButtonClick = async () => {
  await signOut();
  redirect('/');
};

export function AppSidebar() {
  const user = useUser();
  // TODO: use "use" hook instead of "useState" hook
  const [conversations, setConversations] = useState<Models.Document[]>([]);

  useEffect(() => {
    getConversations().then((data) => {
      setConversations(data.documents);
    });
  }, []);

  return (
    <Sidebar collapsible='icon'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Recent</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {conversations.map((conversation) => (
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

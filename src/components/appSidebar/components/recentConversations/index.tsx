import { Button } from '@/components/ui/button';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { getConversations } from '@/lib/server/appwrite';
import { getConversationsKey } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { TrashIcon } from 'lucide-react';
import { StyledAnchor } from './style';

function RecentConversations() {
  const { data: conversations } = useQuery({
    queryKey: getConversationsKey(),
    queryFn: getConversations,
  });

  const onDeleteConversation = async (id: string) => {};

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Recent</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {conversations?.documents.map((conversation) => (
            <SidebarMenuItem
              key={conversation.$id}
              className='relative'
            >
              <SidebarMenuButton asChild>
                <StyledAnchor
                  href={`/conversation/${conversation.$id}`}
                  className='block w-full'
                >
                  <span>{conversation.text}</span>
                  <Button
                    onClick={() => onDeleteConversation(conversation.$id)}
                  >
                    <TrashIcon />
                  </Button>
                </StyledAnchor>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export default RecentConversations;

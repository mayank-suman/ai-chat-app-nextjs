import { Button } from '@/components/ui/button';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { deleteConversation, getConversations } from '@/lib/server/appwrite';
import { getConversationsKey } from '@/lib/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { TrashIcon } from 'lucide-react';
import { StyledAnchor } from './style';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { MouseEvent, useState } from 'react';
import { redirect, useParams } from 'next/navigation';

function RecentConversations() {
  const param = useParams();
  const currentConversationId = param.id;
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const { data: conversations } = useQuery({
    queryKey: getConversationsKey(),
    queryFn: getConversations,
  });

  const onDeleteButtonClick = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: string,
  ) => {
    e.preventDefault();
    setConversationId(id);
    setIsDialogOpen(true);
  };

  const onConfirmDelete = async () => {
    if (!conversationId) {
      return;
    }

    await deleteConversation(conversationId);

    if (conversationId === currentConversationId) {
      redirect('/dashboard');
    }

    await queryClient.invalidateQueries({
      queryKey: getConversationsKey(),
    });

    setIsDialogOpen(false);
  };

  const onOpenChange = (open: boolean) => {
    setIsDialogOpen(open);

    if (!open) {
      setConversationId(null);
    }
  };

  return (
    <>
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
                      onClick={(e) => onDeleteButtonClick(e, conversation.$id)}
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

      <AlertDialog
        open={isDialogOpen}
        onOpenChange={onOpenChange}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirmDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default RecentConversations;

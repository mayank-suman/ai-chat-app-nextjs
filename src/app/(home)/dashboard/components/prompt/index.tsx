'use client';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { getAIResponse, getConversationTitle } from '@/lib/server/geminiAI';
import { createChat, createConversation } from '@/lib/server/appwrite';
import {
  FormSchema as GenericFormSchema,
  GenericPrompt,
} from '@/components/prompt';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { getConversationsKey } from '@/lib/utils';

export function Prompt() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  async function onSubmit(data: z.infer<typeof GenericFormSchema>) {
    try {
      const title = await getConversationTitle(data.userPrompt);
      const conversation = await createConversation({ text: title });
      const aiResponse = await getAIResponse(data.userPrompt, []);

      const chat = await createChat({
        userPrompt: data.userPrompt,
        aiResponse: aiResponse ?? '',
        conversationId: conversation.$id,
      });

      router.push(`/conversation/${conversation.$id}`);

      await queryClient.invalidateQueries({
        queryKey: getConversationsKey(),
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'An error occurred',
        description: <>{error}</>,
        variant: 'destructive',
      });
    }
  }

  return <GenericPrompt onSubmit={onSubmit} />;
}

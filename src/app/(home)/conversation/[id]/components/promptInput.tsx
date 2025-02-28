'use client';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { getAIResponse, getConversationTitle } from '@/lib/server/geminiAI';
import { createChat, createConversation } from '@/lib/server/appwrite';
import {
  FormSchema as GenericFormSchema,
  GenericPrompt,
} from '@/components/prompt';
import { useRouter, useSearchParams } from 'next/navigation';

export function PromptInput({ conversationId }: { conversationId: string }) {
  const { toast } = useToast();

  async function onSubmit(data: z.infer<typeof GenericFormSchema>) {
    try {
      const aiResponse = (await getAIResponse(data.userPrompt, [])) ?? '';

      if (!conversationId) {
        throw new Error('No conversation ID');
      }

      const chat = await createChat({
        userPrompt: data.userPrompt,
        aiResponse: aiResponse,
        conversationId: conversationId,
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

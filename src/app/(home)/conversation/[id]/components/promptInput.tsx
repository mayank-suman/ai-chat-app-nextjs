'use client';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { getAIResponse } from '@/lib/server/geminiAI';
import { createChat } from '@/lib/server/appwrite';
import {
  FormSchema as GenericFormSchema,
  GenericPrompt,
} from '@/components/prompt';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getConversationKeyById } from '@/lib/utils';
import { useAppLoader } from '@/hooks/use-app-loader';

export function PromptInput({ conversationId }: { conversationId: string }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { showLoader, hideLoader } = useAppLoader();

  const mutation = useMutation({
    mutationFn: (payload: {
      data: z.infer<typeof GenericFormSchema>;
      aiResponse: string;
    }) => {
      return createChat({
        userPrompt: payload.data.userPrompt,
        aiResponse: payload.aiResponse,
        conversationId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getConversationKeyById(conversationId),
      });
    },
    onSettled: () => {
      hideLoader();
    },
  });

  async function onSubmit(data: z.infer<typeof GenericFormSchema>) {
    try {
      showLoader();
      if (!conversationId) {
        throw new Error('No conversation ID');
      }

      const aiResponse = (await getAIResponse(data.userPrompt, [])) ?? '';

      mutation.mutate({ data: data, aiResponse: aiResponse });
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

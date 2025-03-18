'use client';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { getAIResponse } from '@/lib/server/geminiAI';
import { createChat, updateChat } from '@/lib/server/appwrite';
import {
  FormSchema as GenericFormSchema,
  GenericPrompt,
} from '@/components/prompt';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getConversationKeyById } from '@/lib/utils';
import { useAppLoader } from '@/hooks/use-app-loader';
import { useState } from 'react';

export function PromptInput({ conversationId }: { conversationId: string }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { showLoader, hideLoader } = useAppLoader();

  const newChatMutation = useMutation({
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
  });

  const updateChatMutation = useMutation({
    mutationFn: (payload: {
      chatId: string;
      data: z.infer<typeof GenericFormSchema>;
      aiResponse: string;
    }) => {
      return updateChat({
        chatId: payload.chatId,
        conversationId,
        userPrompt: payload.data.userPrompt,
        aiResponse: payload.aiResponse,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getConversationKeyById(conversationId),
      });
    },
  });

  async function onSubmit(formData: z.infer<typeof GenericFormSchema>) {
    try {
      showLoader();

      if (!conversationId) {
        throw new Error('No conversation ID');
      }

      const newChat = await newChatMutation.mutateAsync({
        data: formData,
        aiResponse: '',
      });

      const aiResponse = (await getAIResponse(formData.userPrompt, [])) ?? '';

      await updateChatMutation.mutateAsync({
        data: formData,
        chatId: newChat.$id,
        aiResponse: aiResponse,
      });
    } catch (error) {
      console.error(error);

      toast({
        title: 'An error occurred',
        description: <>{error}</>,
        variant: 'destructive',
      });
    } finally {
      hideLoader();
    }
  }

  return <GenericPrompt onSubmit={onSubmit} />;
}

'use client';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { getAIResponse } from '@/lib/server/geminiAI';
import {
  FormSchema as GenericFormSchema,
  GenericPrompt,
} from '@/components/prompt';
import { useAppLoader } from '@/hooks/use-app-loader';
import {
  useCreateChatMutation,
  useUpdateChatMutation,
} from '@/lib/queries/chat';

export function PromptInput({ conversationId }: { conversationId: string }) {
  const { toast } = useToast();
  const { showLoader, hideLoader } = useAppLoader();
  const newChatMutation = useCreateChatMutation();
  const updateChatMutation = useUpdateChatMutation();

  async function onSubmit(formData: z.infer<typeof GenericFormSchema>) {
    try {
      showLoader();

      if (!conversationId) {
        throw new Error('No conversation ID');
      }

      const newChat = await newChatMutation.mutateAsync({
        userPrompt: formData.userPrompt,
        aiResponse: '',
        conversationId,
      });

      const aiResponse = (await getAIResponse(formData.userPrompt, [])) ?? '';

      await updateChatMutation.mutateAsync({
        userPrompt: formData.userPrompt,
        chatId: newChat.$id,
        aiResponse: aiResponse,
        conversationId,
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

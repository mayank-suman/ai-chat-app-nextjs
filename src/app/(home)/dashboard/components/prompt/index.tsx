'use client';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { getAIResponse, getConversationTitle } from '@/lib/server/geminiAI';
import { createChat, createConversation } from '@/lib/server/appwrite';
import {
  FormSchema as GenericFormSchema,
  GenericPrompt,
} from '@/components/prompt';

export function Prompt() {
  const { toast } = useToast();

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

      console.log('🚀 ~ onSubmit ~ chat:', chat);

      toast({
        title: 'You submitted the following values:',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
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

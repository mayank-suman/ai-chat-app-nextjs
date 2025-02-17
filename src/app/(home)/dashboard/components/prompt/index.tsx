'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { getAIResponse, getConversationTitle } from '@/lib/server/geminiAI';
import { createChat, createConversation } from '@/lib/server/appwrite';

const FormSchema = z.object({
  bio: z
    .string()
    .min(10, {
      message: 'Bio must be at least 10 characters.',
    })
    .max(160, {
      message: 'Bio must not be longer than 30 characters.',
    }),
});

export function Prompt() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { isLoading } = form.formState;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const title = await getConversationTitle(data.bio);
      const conversation = await createConversation({ text: title });
      const aiResponse = await getAIResponse(data.bio, []);
      const chat = await createChat({
        userPrompt: data.bio,
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-2/3 space-y-6'
      >
        <FormField
          control={form.control}
          name='bio'
          defaultValue='Explain how AI works'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder='Enter a prompt here'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          disabled={isLoading}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

export const FormSchema = z.object({
  userPrompt: z.string().nonempty('Please enter a prompt'),
});

export function GenericPrompt({
  onSubmit,
}: {
  onSubmit: (data: z.infer<typeof FormSchema>) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { isLoading } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-2/3 space-y-6'
      >
        <FormField
          control={form.control}
          name='userPrompt'
          defaultValue='Explain how AI works'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='relative'>
                  <Textarea
                    placeholder='Enter a prompt here'
                    className='w-4/5 resize-none rounded-l-full border-r-0 pl-10 align-middle'
                    {...field}
                  />
                  <button
                    type='submit'
                    className='absolute right-3 top-0 h-full rounded-r-full bg-slate-900 px-4 text-white'
                    disabled={isLoading}
                  >
                    Submit
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

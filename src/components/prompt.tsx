'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import styled from 'styled-components';
import { motion } from 'motion/react';

const StyledInput = styled.div`
  position: relative;

  textarea {
    padding-left: 2.5rem;
    border-top-left-radius: 9999px;
    border-bottom-left-radius: 9999px;
    border-right-width: 0;
    width: 80%;
    vertical-align: middle;
    background-color: #000000;
    resize: none;

    &:focus-visible {
      --tw-ring-color: transparent;
    }
  }

  button {
    position: absolute;
    top: 0;
    right: 0;
    padding-left: 1rem;
    padding-right: 1rem;
    border-top-right-radius: 9999px;
    border-bottom-right-radius: 9999px;
    height: 100%;
    color: #ffffff;
    background-color: slateblue;
    width: 20%;
  }
`;

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
                <StyledInput>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Textarea
                      placeholder='Enter a prompt here'
                      {...field}
                    />
                    <motion.button
                      type='submit'
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            ease: 'linear',
                          }}
                        >
                          ↻
                        </motion.div>
                      ) : (
                        'Submit'
                      )}
                    </motion.button>
                  </motion.div>
                </StyledInput>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

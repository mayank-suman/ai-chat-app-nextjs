'use client';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { redirect, useRouter } from 'next/navigation';
import { getLoggedInUser, signIn } from '@/lib/server/appwrite';

export type Inputs = {
  fullName: string;
  email: string;
  password: string;
};

const formSchema = z.object({
  email: z.string().email().min(1, { message: 'This field is required' }),
  password: z.string().min(1, { message: 'This field is required' }),
});

function LoginForm() {
  const { toast } = useToast();
  const { push } = useRouter();

  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'mayankcsmn@gmail.com',
      password: 'password',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const session = await signIn(data);
      console.log(
        '🚀 ~ constonSubmit:SubmitHandler<Inputs>= ~ session:',
        session,
      );

      toast({
        variant: 'default',
        title: 'Successfully login',
      });

      // navigate to home screen
      push('/');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Form error',
        description: error.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className='space-y-6'
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input
                  placeholder='enter your email'
                  type='text'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder='enter new password'
                  type='password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <div
                className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                role='status'
              ></div>
            )}
            login
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default LoginForm;

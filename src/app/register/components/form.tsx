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
import { getLoggedInUser, signUp } from '@/lib/server/appwrite';

export type Inputs = {
  fullName: string;
  email: string;
  password: string;
};

const formSchema = z.object({
  fullName: z.string().min(1, { message: 'This field is required' }),
  email: z.string().email().min(1, { message: 'This field is required' }),
  password: z.string().min(1, { message: 'This field is required' }),
});

function SignupForm() {
  const { toast } = useToast();
  const { push } = useRouter();

  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await signUp(data);

      console.log(
        '🚀 ~ constonSubmit:SubmitHandler<Inputs>= ~ response:',
        response,
      );

      toast({
        variant: 'default',
        title: 'Account created',
        description: 'You have successfully created an account',
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
          name='fullName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='enter your name'
                  type='text'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* BUG: make controller component work */}
        {/* <ControlledField
      label='Full Name'
      inputProps={{
        placeholder: 'enter your name',
        type: 'text',
      }}
    /> */}
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
            Register
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default SignupForm;

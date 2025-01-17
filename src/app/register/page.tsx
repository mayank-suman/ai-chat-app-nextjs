'use client';
import Image from 'next/image';
import Link from 'next/link';
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
import { createAccount, getCurrentUser } from '@/lib/appwrite/account';
import { useToast } from '@/hooks/use-toast';
import { redirect, useRouter } from 'next/navigation';

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

function Register() {
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
      const response = await createAccount(data);

      console.log(
        '🚀 ~ constonSubmit:SubmitHandler<Inputs>= ~ response:',
        response,
      );

      toast({
        variant: 'default',
        title: 'Account created',
        description: 'You have successfully created an account',
      });

      // navigate to login screen
      push('/login');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Form error',
        description: error.message,
      });
    }
  };

  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();

      if (user) {
        redirect('/');
      }
    })();
  }, []);

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <Link href=''>
            <Image
              alt=''
              src='logo-light.svg'
              width={133}
              height={24}
              className='hidden'
            />
            <Image
              alt=''
              src='logo-dark.svg'
              width={133}
              height={24}
            />
          </Link>
          <div className='flex flex-col'>
            <h2 className=''>Create an account</h2>
            <p className=''>Register today</p>
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
          </div>
          <p className='mt-10 text-center text-sm/6 text-gray-500'>
            Allready have a account? &nbsp;
            <a
              href='/login'
              className='font-semibold text-indigo-600 hover:text-indigo-500'
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;

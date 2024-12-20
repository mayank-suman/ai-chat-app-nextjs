'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/ui/button';

// function Register() {
//   const submit = (formData: FormData) => {
//     console.log('🚀 ~ Register ~ formData:', formData);
//   };

//   return (
//     <div>
//       <div>
//         <Link href=''>
//           <Image
//             alt=''
//             src='logo-light.svg'
//             width={133}
//             height={24}
//           />
//           <Image
//             alt=''
//             src='logo-dark.svg'
//             width={133}
//             height={24}
//           />
//         </Link>
//         <div className=''>
//           <h2 className=''>Create an account</h2>
//           <p className=''>Register today</p>
//           <Form action={submit}></Form>
//         </div>
//       </div>
//     </div>
//   );
// }

type Inputs = {
  fullName: string;
  email: string;
  password: string;
};

const schema = yup
  .object()
  .shape({
    fullName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: yupResolver(schema), // yup, joi and even your own.
  });

  console.log('🚀 ~ Register ~ errors:', errors);
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
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
            <form
              className='space-y-6'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor='fullName'
                  className='block text-sm/6 font-medium'
                >
                  Full name
                </label>
                <div className='mt-2'>
                  <input
                    {...register('fullName')}
                    className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm/6 font-medium'
                >
                  Email address
                </label>
                <div className='mt-2'>
                  <input
                    {...register('email')}
                    className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                  />
                </div>
              </div>

              <div>
                <div className='flex items-center justify-between'>
                  <label
                    htmlFor='password'
                    className='block text-sm/6 font-medium'
                  >
                    Password
                  </label>
                </div>
                <div className='mt-2'>
                  <input
                    {...register('password')}
                    type='password'
                    className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                  />
                </div>
              </div>

              <div>
                {/* <button
                  type='submit'
                  className='flex w-full items-center justify-center space-x-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  {isSubmitting && (
                    <div
                      className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                      role='status'
                    ></div>
                  )}
                  <span className=''>Sign up</span>
                </button> */}
                <Button type='submit'>Click me</Button>
              </div>
            </form>
          </div>
          <p className='mt-10 text-center text-sm/6 text-gray-500'>
            Allready have a account?
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

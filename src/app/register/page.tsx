import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Form from 'next/form';

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

function Register() {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form
            action='#'
            method='POST'
            className='space-y-6'
          >
            <div>
              <label
                htmlFor='email'
                className='block text-sm/6 font-medium text-gray-900'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  required
                  autoComplete='email'
                  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm/6 font-medium text-gray-900'
                >
                  Password
                </label>
                <div className='text-sm'>
                  <a
                    href='#'
                    className='font-semibold text-indigo-600 hover:text-indigo-500'
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  required
                  autoComplete='current-password'
                  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Sign in
              </button>
            </div>
          </form>

          <p className='mt-10 text-center text-sm/6 text-gray-500'>
            Not a member?{' '}
            <a
              href='#'
              className='font-semibold text-indigo-600 hover:text-indigo-500'
            >
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
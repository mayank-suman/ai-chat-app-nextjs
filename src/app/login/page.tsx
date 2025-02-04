import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import LoginForm from './components/form';

// TODO: add forgot password link
// TODO: refactor logged in user logic into middleware
async function Login() {
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
            <h2 className=''>Login</h2>
            <p className=''>Enter your credentials</p>
            <LoginForm />
          </div>
          <p className='mt-10 text-center text-sm/6 text-gray-500'>
            Don't have a account? &nbsp;
            <a
              href='/register'
              className='font-semibold text-indigo-600 hover:text-indigo-500'
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;

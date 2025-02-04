import Image from 'next/image';
import Link from 'next/link';
import SignupForm from './components/form';
import { redirect } from 'next/navigation';
import { getLoggedInUser } from '@/lib/server/appwrite';

async function Register() {
  const user = await getLoggedInUser();
  if (user) {
    redirect('/');
  }

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
            <SignupForm />
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

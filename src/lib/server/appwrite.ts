'use server';
import { Client, Account, ID } from 'node-appwrite';
import { cookies } from 'next/headers';
import { Inputs } from '@/app/login/components/form';

const COOKIE_NAME = 'appwrite-session-cookie';

async function createSessionClient() {
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_AI_CHAT_APP_PROJECT_ID || '');

  const session = (await cookies()).get(COOKIE_NAME);
  if (!session || !session.value) {
    throw new Error('No session');
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}
async function createAdminClient() {
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_AI_CHAT_APP_PROJECT_ID || '')
    .setKey(process.env.NEXT_APPWRITE_KEY || '');

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}

export async function signUp({ email, password, fullName }: Inputs) {
  const { account } = await createAdminClient();

  await account.create(ID.unique(), email, password, fullName);
  const session = await account.createEmailPasswordSession(email, password);

  (await cookies()).set(COOKIE_NAME, session.secret, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  });

  return session;
}

export const signIn = async ({ email, password }: Inputs) => {
  const { account } = await createAdminClient();

  const session = await account.createEmailPasswordSession(email, password);

  (await cookies()).set(COOKIE_NAME, session.secret, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  });

  return session;
};

export async function signOut() {
  const { account } = await createSessionClient();

  (await cookies()).delete(COOKIE_NAME);
  await account.deleteSession('current');
}

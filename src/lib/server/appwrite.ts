'use server';

import { Client, Account, Databases } from 'node-appwrite';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'appwrite-session-cookie';

export async function createSessionClient() {
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
    get database() {
      return new Databases(client);
    },
  };
}

export async function createAdminClient() {
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

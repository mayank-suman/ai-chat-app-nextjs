'use server';
import { Client, Account, ID, Databases, Query } from 'node-appwrite';
import { cookies } from 'next/headers';
import { Inputs } from '@/app/(authentication)/login/components/form';
import { type Models } from 'node-appwrite';

interface Conversation extends Models.Document {
  $id: string;
  text: string;
}

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
    get database() {
      return new Databases(client);
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

export async function createConversation({ text }: { text: string }) {
  const { database } = await createSessionClient();
  const user = await getLoggedInUser();

  if (!user) {
    throw new Error('No user logged in');
  }

  return database.createDocument(
    process.env.NEXT_PUBLIC_AI_CHAT_APP_DATABASE_ID || '',
    'conversations',
    ID.unique(),
    { text: text, userId: user?.$id },
  );
}

export async function createChat({
  userPrompt,
  aiResponse,
  conversationId,
}: {
  userPrompt: string;
  aiResponse: string;
  conversationId: string;
}) {
  const { database } = await createSessionClient();
  const user = await getLoggedInUser();

  if (!user) {
    throw new Error('No user logged in');
  }

  return database.createDocument(
    process.env.NEXT_PUBLIC_AI_CHAT_APP_DATABASE_ID || '',
    'chats',
    ID.unique(),
    {
      user_prompt: userPrompt,
      ai_response: aiResponse,
      conversation: conversationId,
    },
  );
}

export async function getConversations() {
  const { database } = await createSessionClient();
  const user = await getLoggedInUser();

  if (!user) {
    throw new Error('No user logged in');
  }

  return database.listDocuments<Conversation>(
    process.env.NEXT_PUBLIC_AI_CHAT_APP_DATABASE_ID || '',
    'conversations',
    [Query.select(['$id', 'text'])],
  );
}

interface Chat extends Models.Document {
  user_prompt: string;
  ai_response: string;
}

interface DetailedConversation extends Models.Document {
  text: string;
  userId: string;
  chats: Chat[];
}

export async function getConversationById(conversationId: string) {
  const { database } = await createSessionClient();

  return database.getDocument<DetailedConversation>(
    process.env.NEXT_PUBLIC_AI_CHAT_APP_DATABASE_ID || '',
    'conversations',
    conversationId,
  );
}

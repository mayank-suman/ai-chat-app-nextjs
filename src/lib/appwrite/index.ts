import { Account, Client } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_AI_CHAT_APP_PROJECT_ID || '');

export const account = new Account(client);

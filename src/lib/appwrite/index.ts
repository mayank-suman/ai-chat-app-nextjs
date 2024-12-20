import { Account, Client } from 'appwrite';

const client = new Client();

client
  .setProject(process.env.AI_CHAT_APP_PROJECT_ID || '')
  .setEndpoint('https://cloud.appwrite.io/v1');

export const account = new Account(client);

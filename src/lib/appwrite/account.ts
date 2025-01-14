import { ID } from 'appwrite';
import { account } from '.';
import { Inputs } from '@/app/register/page';

export const createAccount = async ({ email, password, fullName }: Inputs) => {
  return await account.create(ID.unique(), email, password, fullName);
};

export const login = async ({ email, password }: Inputs) => {
  return account.createEmailPasswordSession(email, password);
};

export const getCurrentUser = async () => {
  return account.get();
};

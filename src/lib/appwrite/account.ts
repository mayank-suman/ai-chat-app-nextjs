import { ID } from 'appwrite';
import { account } from '.';
import { Inputs } from '@/app/register/page';

export const createAccount = async ({ email, password, fullName }: Inputs) => {
  return await account.create(ID.unique(), email, password, fullName);
};

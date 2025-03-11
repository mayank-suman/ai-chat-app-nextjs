'use client';
import { Models } from 'node-appwrite';
import React from 'react';

export const UserContext =
  React.createContext<Models.User<Models.Preferences> | null>(null);

type UserProviderProps = {
  children: React.ReactNode;
  value: Models.User<Models.Preferences> | null;
};

function UserProvider({ children, value }: UserProviderProps) {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;

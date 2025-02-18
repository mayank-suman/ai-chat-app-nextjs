import { UserContext } from '@/components/User-provider';
import React, { useContext } from 'react';

function useUser() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return userContext;
}

export default useUser;

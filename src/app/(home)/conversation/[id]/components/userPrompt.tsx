'use client';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import useUser from '@/hooks/use-user';
import { ArrowDown, ArrowUp } from 'lucide-react';
import React from 'react';
import * as motion from 'motion/react-client';

const getFirstLetters = (name: string) => {
  const [first, last] = name.split(' ');

  return `${first[0]}${last[0]}`;
};

function UserPrompt({ value }: { value: string }) {
  const user = useUser();
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className='user-prompt'
    >
      <Avatar>
        <AvatarFallback>{getFirstLetters(user.name)}</AvatarFallback>
      </Avatar>

      {isExpanded ? (
        <ArrowUp
          className='h-6 w-6'
          onClick={() => setIsExpanded((prev) => !prev)}
        />
      ) : (
        <ArrowDown
          className='h-6 w-6'
          onClick={() => setIsExpanded((prev) => !prev)}
        />
      )}
      <h2>{value}</h2>
    </motion.div>
  );
}

export default UserPrompt;

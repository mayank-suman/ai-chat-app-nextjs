import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import useUser from '@/hooks/use-user';
import { ArrowDown, ArrowUp } from 'lucide-react';
import React from 'react';

const getFirstLetters = (name: string) => {
  const [first, last] = name.split(' ');

  return `${first[0]}${last[0]}`;
};

function UserPrompt({ text }: { text: string }) {
  const user = useUser();
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

  return (
    <>
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
      <h2>{text}</h2>
    </>
  );
}

export default UserPrompt;

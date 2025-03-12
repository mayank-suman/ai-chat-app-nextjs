'use client';
import { getConversationById } from '@/lib/server/appwrite';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UserPrompt from './components/userPrompt';
import { PromptInput } from './components/promptInput';
import Response from './components/response';

function Container({ id }: { id: string }) {
  const { data: conversation } = useQuery({
    queryKey: ['conversation', id],
    queryFn: () => getConversationById(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return (
    <>
      <header>
        <h1>{conversation?.text}</h1>
      </header>
      <div className='chats'>
        {conversation?.chats.map((chat) => (
          <div
            className='chat'
            key={chat.$id}
          >
            <UserPrompt text={chat.user_prompt} />
            <Response text={chat.ai_response} />
          </div>
        ))}
      </div>
      <footer>
        <PromptInput conversationId={id} />
      </footer>
    </>
  );
}

export default Container;

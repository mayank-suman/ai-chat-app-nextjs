'use client';
import { getConversationById } from '@/lib/apis/appwrite';
import { useQuery } from '@tanstack/react-query';
import { use, useEffect } from 'react';
import UserPrompt from './components/userPrompt';
import { PromptInput } from './components/promptInput';
import Response from './components/response';
import { getConversationKeyById } from '@/lib/utils';
import { useAppLoader } from '@/hooks/use-app-loader';

function Container({ id }: { id: string }) {
  const { loadOrHideLoader } = useAppLoader();
  const { data: conversation, isFetching } = useQuery({
    queryKey: getConversationKeyById(id),
    queryFn: () => getConversationById(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    loadOrHideLoader(isFetching);
  }, [isFetching]);

  // Scroll to the bottom of the page when the conversation changes
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [conversation]);

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
            <UserPrompt value={chat.user_prompt} />
            <Response value={chat.ai_response} />
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

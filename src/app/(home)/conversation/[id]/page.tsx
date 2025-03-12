import { getConversationById } from '@/lib/server/appwrite';
import { dehydrate, HydrationBoundary, useQuery } from '@tanstack/react-query';
import { getQueryClient } from '@/components/getQueryClient';
import UserPrompt from './components/userPrompt';
import Response from './components/response';
import { PromptInput } from './components/promptInput';

async function Conversation({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const queryClient = getQueryClient();

  const conversation = await queryClient.fetchQuery({
    queryKey: ['conversation', id],
    queryFn: () => getConversationById(id),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
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
    </HydrationBoundary>
  );
}

export default Conversation;

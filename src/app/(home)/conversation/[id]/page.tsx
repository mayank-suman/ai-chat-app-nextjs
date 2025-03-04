import { getConversationById } from '@/lib/server/appwrite';
import UserPrompt from './components/userPrompt';
import { PromptInput } from './components/promptInput';
import Response from './components/response';

async function Conversation({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const conversation = await getConversationById(id);

  return (
    <>
      <header>
        <h1>{conversation.text}</h1>
      </header>
      <div className='chats'>
        {conversation.chats.map((chat: Record<string, any>) => (
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

export default Conversation;

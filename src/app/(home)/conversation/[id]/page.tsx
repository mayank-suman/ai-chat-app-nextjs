import React, { use } from 'react';
import Detail from './components/details';
import { getConversationById } from '@/lib/server/appwrite';

async function Conversation({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const conversation = await getConversationById(id);

  return (
    <>
      <Detail conversation={conversation} />
    </>
  );
}

export default Conversation;

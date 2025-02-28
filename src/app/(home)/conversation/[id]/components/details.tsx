'use client';
import React from 'react';
import UserPrompt from './userPrompt';
import { PromptInput } from './promptInput';

function Detail({
  conversation,
  id,
}: {
  conversation: Record<string, any>;
  id: string;
}) {
  console.log('🚀 ~ Detail ~ conversation:', conversation);
  return (
    <>
      <h1>{conversation.text}</h1>
      {conversation.chats.map((chat: Record<string, any>) => (
        <div key={chat.$id}>
          <UserPrompt text={chat.user_prompt} />
          <p>{chat.ai_response}</p>
        </div>
      ))}
      <PromptInput conversationId={id} />
    </>
  );
}

export default Detail;

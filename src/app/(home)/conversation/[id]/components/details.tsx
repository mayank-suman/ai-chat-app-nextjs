'use client';
import React from 'react';
import UserPrompt from './userPrompt';

function Detail({ conversation }: { conversation: Record<string, any> }) {
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
    </>
  );
}

export default Detail;

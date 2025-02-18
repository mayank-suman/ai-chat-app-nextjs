'use client';
import React from 'react';

function Detail({ conversation }: { conversation: Record<string, any> }) {
  //   console.log('🚀 ~ Detail ~ conversation:', conversation);

  return (
    <>
      <h1>{conversation.text}</h1>
      {conversation.chats.map((chat: Record<string, any>) => (
        <div key={chat.$id}>
          <h2>{chat.user_prompt}</h2>
          <p>{chat.ai_response}</p>
        </div>
      ))}
    </>
  );
}

export default Detail;

import { Zap } from 'lucide-react';
import React from 'react';

function Response({ text }: { text: string }) {
  return (
    <div className='ai-response'>
      <Zap size={24} />
      <p>{text}</p>
    </div>
  );
}

export default Response;

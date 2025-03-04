import React from 'react';
import StyledLayout from './StyledLayout';

function ConversationLayout({ children }: { children: React.ReactNode }) {
  return <StyledLayout>{children}</StyledLayout>;
}

export default ConversationLayout;

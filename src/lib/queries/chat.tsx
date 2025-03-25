import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createChat, updateChat } from '../apis/appwrite';
import { getConversationKeyById } from '../utils';

export const useCreateChatMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      userPrompt: string;
      aiResponse: string;
      conversationId: string;
    }) => {
      return createChat({
        userPrompt: payload.userPrompt,
        aiResponse: payload.aiResponse,
        conversationId: payload.conversationId,
      });
    },
    onSuccess: (data, { conversationId }) => {
      queryClient.invalidateQueries({
        queryKey: getConversationKeyById(conversationId),
      });
    },
  });
};

export const useUpdateChatMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      chatId: string;
      userPrompt: string;
      aiResponse: string;
      conversationId: string;
    }) => {
      return updateChat({
        chatId: payload.chatId,
        conversationId: payload.conversationId,
        userPrompt: payload.userPrompt,
        aiResponse: payload.aiResponse,
      });
    },
    onSuccess: (data, { conversationId }) => {
      queryClient.invalidateQueries({
        queryKey: getConversationKeyById(conversationId),
      });
    },
  });
};

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CONVERSATION_QUERY_KEY } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getConversationKeyById(id: string) {
  return [CONVERSATION_QUERY_KEY, id];
}

export function getConversationsKey() {
  return [CONVERSATION_QUERY_KEY];
}

import { getConversationById } from '@/lib/server/appwrite';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/components/getQueryClient';
import Container from './container';
import { getConversationKeyById } from '@/lib/utils';

async function Conversation({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: getConversationKeyById(id),
    queryFn: () => getConversationById(id),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container id={id} />
    </HydrationBoundary>
  );
}

export default Conversation;

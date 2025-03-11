import { getConversationById } from '@/lib/server/appwrite';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import Main from './main';

async function Conversation({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['conversation', id],
    queryFn: () => getConversationById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Main id={id} />
    </HydrationBoundary>
  );
}

export default Conversation;

import { getLoggedInUser } from '@/lib/server/appwrite';
import { redirect } from 'next/navigation';

async function HomeDashboard() {
  const user = await getLoggedInUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <>
      <pre></pre>
    </>
  );
}

export default HomeDashboard;

import Image from 'next/image';
import { redirect } from 'next/navigation';

export default function Home() {
  // TODO: implement dark mode toggle button
  return redirect('/dashboard');
}

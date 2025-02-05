import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login to your account',
};

export default function RegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}

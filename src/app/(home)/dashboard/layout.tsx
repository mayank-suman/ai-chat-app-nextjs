import { Metadata } from 'next';
import { StyledSection } from './styledLayout';

export const metadata: Metadata = {
  title: 'Create an account',
};

export default function RegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StyledSection>{children}</StyledSection>;
}

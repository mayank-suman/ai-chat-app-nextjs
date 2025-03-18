import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import StyledComponentsRegistry from '@/lib/styledComponentsReg';
import { ThemeProvider } from '@/components/providers/theme-provider';
import TanstackQueryProvider from '@/components/providers/tanstack-query-provider';
import { AppLoaderProvider } from '@/components/providers/app-loader-provider';
import AppLoader from '@/components/appLoader';

// If loading a variable font, you don't need to specify the font weight
const DMSans = DM_Sans({
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AI chat app',
  description:
    'AI chat app created using NextJs, Gemini, AppWrite and TailwindCSS',
  icons:
    'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=search',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
    >
      <body className={`${DMSans.className} antialiased`}>
        <TanstackQueryProvider>
          <StyledComponentsRegistry>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              <AppLoaderProvider>
                <main>
                  <AppLoader />
                  {children}
                  <Toaster />
                </main>
              </AppLoaderProvider>
            </ThemeProvider>
          </StyledComponentsRegistry>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NatNalProvider } from './context/NatNalContext';
import { WatchedLoadsProvider } from './context/WatchedLoadsContext';
import { SavedSearchesProvider } from './context/SavedSearchesContext';
import { SearchHistoryProvider } from './context/SearchHistoryContext';
import { UserProvider } from './context/UserContext';
import { BookedLoadsProvider } from './context/BookedLoadsContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  interactiveWidget: 'resizes-content',
};

export const metadata: Metadata = {
  title: "FreightPower",
  description: "Find and book loads near you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NatNalProvider>
          <UserProvider>
            <WatchedLoadsProvider>
              <SavedSearchesProvider>
                <SearchHistoryProvider>
                  <BookedLoadsProvider>
                    {children}
                  </BookedLoadsProvider>
                </SearchHistoryProvider>
              </SavedSearchesProvider>
            </WatchedLoadsProvider>
          </UserProvider>
        </NatNalProvider>
      </body>
    </html>
  );
}

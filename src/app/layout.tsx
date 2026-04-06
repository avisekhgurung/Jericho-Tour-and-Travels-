import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jericho Tour & Travels",
  description:
    "Discover and book premium travel services in Darjeeling with a modern, visually stunning UI that enhances user experience and trust.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex min-h-full flex-col bg-background text-foreground" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

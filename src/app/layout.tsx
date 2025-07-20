import type { Metadata } from "next";
import { QueryProvider } from '@/providers/query-provider';
import "./globals.css";
import "./sidebar.css";

export const metadata: Metadata = {
  title: "whatsapp API",
  description: "ATEF JS",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}


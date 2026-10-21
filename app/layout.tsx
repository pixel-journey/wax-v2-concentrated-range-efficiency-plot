import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Seconds inside a window',
  description: '100 of 400 seconds is 2500 bps. 1 of 3 truncates to 3333. No pool is read.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

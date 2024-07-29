import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Headbar from "@/components/headbar";
import { UserProvider } from "@/lib/context/user";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Ignis",
    default: "Ignis",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`remove-scrollbar ${inter.className} dark:bg-neutral-900`}
      >
        <Headbar />

        {children}
      </body>
    </html>
  );
}

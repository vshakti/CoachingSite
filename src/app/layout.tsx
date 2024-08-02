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
      <UserProvider>
        <body
          className={`remove-scrollbar ${inter.className} bg-gradient-to-bl from-zinc-950 via-neutral-950 to-zinc-950`}
        >
          <Headbar />

          {children}
        </body>
      </UserProvider>
    </html>
  );
}

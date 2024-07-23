import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Headbar from "@/components/headbar";
import { GetLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

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
      <body className={`remove-scrollbar ${inter.className}`}>
        <Headbar />
        {children}
      </body>
    </html>
  );
}

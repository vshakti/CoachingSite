import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import Headbar from "@/components/headbar";
import { UserProvider } from "@/lib/context/user";
import { ExerciseProvider } from "@/lib/context/exerciseAdd";
import { TemplateTypeProvider } from "@/lib/context/templateType";
import { UserAvatarProvider } from "@/lib/context/userAvatar";

const inter = Inter({ subsets: ["latin"] });
const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: {
    template: "%s - Nebula",
    default: "Nebula",
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
        <UserAvatarProvider>
          <ExerciseProvider>
            <TemplateTypeProvider>
              <body
                className={`remove-scrollbar ${inter.className} bg-gradient-to-br from-neutral-950 to-zinc-950`}
              >
                <Headbar />

                {children}
              </body>
            </TemplateTypeProvider>
          </ExerciseProvider>
        </UserAvatarProvider>
      </UserProvider>
    </html>
  );
}

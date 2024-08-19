import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import Headbar from "@/components/headbar";
import { UserProvider } from "@/lib/context/user";
import { ExerciseProvider } from "@/lib/context/exerciseAdd";
import { TemplateTypeProvider } from "@/lib/context/templateType";
import { UserAvatarProvider } from "@/lib/context/userAvatar";
import CoachingInvite from "@/components/coachingInvite/coachingInvite";
import { TrackingExerciseContextProvider } from "@/lib/context/exerciseTracking";
import { LoggedUserProvider } from "@/lib/context/loggedUser";

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
      <LoggedUserProvider>
        <UserProvider>
          <UserAvatarProvider>
            <ExerciseProvider>
              <TemplateTypeProvider>
                <TrackingExerciseContextProvider>
                  <body
                    className={`remove-scrollbar ${inter.className} bg-gradient-to-br from-neutral-950 to-zinc-950`}
                  >
                    <Headbar />
                    <CoachingInvite />

                    {children}
                  </body>
                </TrackingExerciseContextProvider>
              </TemplateTypeProvider>
            </ExerciseProvider>
          </UserAvatarProvider>
        </UserProvider>
      </LoggedUserProvider>
    </html>
  );
}

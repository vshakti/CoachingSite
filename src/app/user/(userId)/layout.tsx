import NavbarLayout from "@/components/userPage/navbar/navbarLayout";
import NavbarContent from "@/components/userPage/navbar/navbarContent";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavbarLayout />

      {children}
    </div>
  );
}

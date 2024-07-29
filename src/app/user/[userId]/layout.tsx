import NavbarLayout from "@/components/userPage/navbarLayout";
import NavbarProfile from "@/components/userPage/navbarProfile";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavbarLayout>
        <NavbarProfile />
      </NavbarLayout>
      {children}
    </div>
  );
}

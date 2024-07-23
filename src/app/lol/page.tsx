import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

import { signOut } from "@/lib/actions/user.actions";

export default async function HomePage() {
  const user = await getLoggedInUser();
  if (!user) redirect("/sign-in");

  return (
    <>
      <ul>
        <li>
          <strong>Email:</strong> {user.email}
        </li>
        <li>
          <strong>Name:</strong> {user.name}
        </li>
        <li>
          <strong>ID: </strong> {user.$id}
        </li>
      </ul>

      <form action={signOut}>
        <button type="submit">Sign out</button>
      </form>
    </>
  );
}

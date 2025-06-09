"use server";
import { auth } from "@/hooks/useAuth";
import Navbar from "./navbar";

export default async function NavBarProvider() {
  const session = await auth();

  return (
    <Navbar
      name={session?.user?.name}
      email={session?.user?.email}
      image={session?.user?.image}
    />
  );
}

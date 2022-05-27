import { signIn, signOut, useSession } from "next-auth/react";

export const Nav = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-orange-400">
      Weight tracker
      {session ? (
        <button onClick={() => signOut()}>Sign out</button>
      ) : (
        <button onClick={() => signIn("google")}>Sign in</button>
      )}
    </nav>
  );
};

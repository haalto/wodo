import { signIn, signOut, useSession } from "next-auth/react";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { Logo } from "./Logo";

export const Nav = () => {
  const { data: session } = useSession();
  const iconSize = 28;
  return (
    <nav className="h-12 flex justify-between mr-5 ml-5">
      <Logo />
      {session ? (
        <button onClick={() => signOut()}>
          <BiLogOut size={iconSize} />
        </button>
      ) : (
        <button onClick={() => signIn("google")}>
          <BiLogIn size={iconSize} />
        </button>
      )}
    </nav>
  );
};

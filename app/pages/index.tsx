import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  if (!session) {
    return <>Not signed in</>;
  }
  return <></>;
};

export default Home;

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    router.push("/");
  }

  return (
    <>
      <button onClick={() => signIn("google")}>Sign in</button>
    </>
  );
};

export default Login;

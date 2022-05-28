import { PropsWithChildren } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

enum Routes {
  Home = "/",
  Login = "/login",
}

const unprotectedRoutes: string[] = [Routes.Login];

export const RouteGuard = ({ children }: PropsWithChildren<{}>) => {
  const { data: session, status } = useSession();
  const isBrowser = () => typeof window !== "undefined";
  const router = useRouter();

  const pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

  if (status === "loading") {
    return <div>Loading</div>;
  }

  if (status === "unauthenticated" && isBrowser() && pathIsProtected) {
    router.push(Routes.Login);
  }

  return <>{children}</>;
};

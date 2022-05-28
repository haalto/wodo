import { PropsWithChildren } from "react";
import { Nav } from "./Nav";

export const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className="bg-slate-100 h-screen">
      <Nav />
      <div className="m-5">{children}</div>
    </div>
  );
};

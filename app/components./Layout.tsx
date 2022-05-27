import { PropsWithChildren } from "react";
import { Nav } from "./Nav";

export const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className="bg-500">
      <Nav />
      {children}
    </div>
  );
};

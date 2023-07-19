import React from "react";
import { ReactNode } from "react";
import Header from "../header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;

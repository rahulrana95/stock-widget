import React from "react";
import Header from "../header";

const Layout = ({
  children,
}: {
  children: React.ReactElement[] | React.ReactElement;
}) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;

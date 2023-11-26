import React from "react";
import Main from "@/components/layout/Main";

interface LayoutProps {
  children: React.ReactNode;
  auth: React.ReactNode;
  notification: React.ReactNode;
}

const Layout = ({ children, notification, auth }: LayoutProps) => {
  return (
    <Main>
      {auth}
      {/* {notification} */}
      {children}
    </Main>
  );
};

export default Layout;

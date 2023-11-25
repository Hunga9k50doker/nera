import React from "react";
import Main from "@/components/layout/Main";
// import "@/assets/styles/main.css";

interface LayoutProps {
  children: React.ReactNode;
  auth: React.ReactNode;
}

const Layout = ({ children, auth }: LayoutProps) => {
  return (
    <Main>
      {children}
      {auth}
    </Main>
  );
};

export default Layout;

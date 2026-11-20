import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";

const PageLayout = () => {
  return (
    <>
      <Navbar />
      <main className="shell py-10 sm:py-16">
        <Outlet />
      </main>
    </>
  );
};

export default PageLayout;

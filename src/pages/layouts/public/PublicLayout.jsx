import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Nav from "../common/Nav";
import Header from "./Header";

function PublicLayout() {
  return (
    <>
      <Nav />
      {/* <Header /> */}
      <section className="container-fluid">
        <Outlet />
      </section>
      <Footer />
    </>
  );
}

export default PublicLayout;

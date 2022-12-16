import React from "react";
import { useLocation } from "react-router";
import { Outlet, Navigate } from "react-router-dom";

import Footer from "./Footer";
import Nav from "../common/Nav";
import Header from "./Header";
import { getToken } from "../../../redux/utils";

function PrivateLayout() {
  const location = useLocation();
  const token = getToken();

  return token ? (
    <>
      <Nav />
      {/* <Header /> */}
      <Outlet />
      <Footer />
    </>
  ) : (
    <Navigate replace to="/login" state={{ from: location }} />
  );
}

export default PrivateLayout;

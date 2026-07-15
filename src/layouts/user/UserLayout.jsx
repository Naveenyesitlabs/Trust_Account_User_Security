import React from "react";
import { Outlet } from "react-router-dom";

import "../user/css/animation.css";
import "../user/css/bootstrap.min.css";
import "../user/css/dashboard.css";
import "../user/css/slick.css";
import "../user/css/style.css";
import UserSidebar from "../../components/sidebar/UserSidebar";

export default function UserLayout() {
  return (
    <>
      <UserSidebar />
      <Outlet />
    </>
  );
}


import { Outlet } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import "../layoutStyles/Layout.css";

const Layout = () => {
  return (
    <div className="layout">
      <header>
        <AppNavbar />
      </header>
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

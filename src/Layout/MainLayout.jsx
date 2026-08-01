import { Outlet } from "react-router-dom";
import NavbarApp from "../Components/Navbar/Navbar";
import FooterApp from "./../Components/Footer/Footer";

export default function MainLayout() {
  return (
    <>
      <NavbarApp />
      <main className=" min-h-dvh dark:bg-slate-900 py-10">
        {/* Child form main layout */}
        <Outlet />
      </main>
      <FooterApp />
    </>
  );
}

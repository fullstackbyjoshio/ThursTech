import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MobileActionBar from "./MobileActionBar";
import { ToastViewport } from "../ui/Toast";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <ToastViewport />
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileActionBar />
    </div>
  );
}

import { ReactNode } from "react";
import Sidebar from "../Custome Component/Sidebar";
import { SidebarProvider } from "../context/SidebarContext";
import { Outlet } from "react-router-dom";
import Navbar from "../Custome Component/Navbar";

interface LayoutProps {
  children?: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <Sidebar />
      <Navbar />
      <div>{children || <Outlet />}</div>
    </SidebarProvider>
  );
}

export default Layout;

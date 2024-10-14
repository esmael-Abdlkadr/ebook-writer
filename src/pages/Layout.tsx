import { ReactNode } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import { SidebarProvider } from "../contexts/SidebarContext";
import { Outlet } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";

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

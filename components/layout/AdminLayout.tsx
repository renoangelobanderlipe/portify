"use client";

import { AppSidebar } from "../shared/app-sidebar";
import { SiteHeader } from "../shared/site-header";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col ">
          <div className=" flex flex-1 flex-col gap-2">
            <div className="md:gap-6  h-full p-4 md:p-8">{children}</div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

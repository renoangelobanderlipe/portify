"use client";

import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

export function SiteHeader() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((s) => s && s !== "admin");

  if (segments.length === 0) return null;

  return (
    <header className="flex h-16 w-full shrink-0 items-center gap-2">
      <div className="flex w-full items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex w-full items-center justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              {segments.map((segment, index) => {
                const href = `/admin/${segments.slice(0, index + 1).join("/")}`;
                const label =
                  segment.charAt(0).toUpperCase() +
                  segment.slice(1).replace(/-/g, " ");
                const isLast = index === segments.length - 1;

                return (
                  <BreadcrumbItem key={href}>
                    {isLast ? (
                      <BreadcrumbPage>{label}</BreadcrumbPage>
                    ) : (
                      <>
                        <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                        <BreadcrumbSeparator className="hidden md:block" />
                      </>
                    )}
                  </BreadcrumbItem>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
          <AnimatedThemeToggler className="cursor-pointer" />
        </div>
      </div>
    </header>
  );
}

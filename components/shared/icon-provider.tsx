"use client";

import { IconFileAlert } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { memo } from "react";
import { cn } from "@/lib/utils";
import { TooltipComponent } from "../ui/tooltip";

interface BaseProps {
  provider: "tabler" | string;
  iconTag: string;
  size?: number;
  name: string;
  className?: string;
}

type IconProviderProps = BaseProps & React.HTMLAttributes<HTMLElement>;

/**
 * Turbopack-safe IconProvider component for Tabler icons or fallback icons.
 */
export function IconProvider({
  provider,
  iconTag,
  size = 24,
  name,
  className,
  ...props
}: IconProviderProps) {
  if (provider === "tabler") {
    // Convert iconTag string to PascalCase for file name
    const iconName = iconTag
      .replace(/^tabler[-:]?/, "")
      .replace(/(^[a-z])/, (m) => m.toUpperCase());

    // Dynamic import per icon file — Turbopack compatible
    const TablerIcon = dynamic<{ size?: number; className?: string }>(
      async () => {
        try {
          const mod = await import(
            /* webpackChunkName: "tabler-icon-[request]" */ `@tabler/icons-react/dist/esm/icons/${iconName}`
          );
          return mod[iconName] || (() => <IconFileAlert size={size} />);
        } catch (e) {
          console.error("Tabler icon load error:", e);
          return () => <IconFileAlert size={size} />;
        }
      },
      { ssr: false }, // optional: prevents SSR errors if needed
    );

    return (
      <TooltipComponent content={name}>
        <TablerIcon
          size={size}
          className={cn("align-middle", className)}
          {...props}
        />
      </TooltipComponent>
    );
  }

  // Fallback for unknown providers
  return (
    <span
      className={cn("text-muted-foreground inline-block", className)}
      style={{ width: size, height: size }}
    >
      <TooltipComponent content={name}>
        <IconFileAlert size={size} />
      </TooltipComponent>
    </span>
  );
}

export default memo(IconProvider);

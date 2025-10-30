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

export function IconProvider({
  provider,
  iconTag,
  size = 24,
  name,
  className,
  ...props
}: IconProviderProps) {
  if (provider === "tabler") {
    const iconName = iconTag
      .replace(/^tabler[-:]?/, "")
      .replace(/(^[a-z])/, (m) => m.toUpperCase());

    const TablerIcon = dynamic(async () => {
      try {
        const icons = await import("@tabler/icons-react");
        const iconKey = `${iconName}` as keyof typeof icons;

        const Component =
          (icons[iconKey] as React.FC<{ size?: number; className?: string }>) ??
          (() => (
            <span className="text-destructive">
              <TooltipComponent content="Icon Not Found">
                <IconFileAlert size={size} />
              </TooltipComponent>
            </span>
          ));

        return Component;
      } catch (e) {
        console.error("Tabler icon load error:", e);
        return () => <span className="text-destructive">?</span>;
      }
    });

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

  return (
    <span
      className={cn("text-muted-foreground inline-block", className)}
      style={{ width: size, height: size }}
    >
      <IconFileAlert size={size} />
    </span>
  );
}

export default memo(IconProvider);

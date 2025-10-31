"use client";

import { IconFileAlert } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { memo, useMemo } from "react";
import { cn } from "@/lib/utils";
import { toPascalCase } from "@/utils/stringHelper";
import { TooltipComponent } from "../ui/tooltip";

interface BaseProps {
  provider?: "tabler" | string;
  iconTag: string;
  size?: number;
  name?: string;
  hasTooltip?: boolean;
  className?: string;
}

type IconProviderProps = BaseProps & React.HTMLAttributes<HTMLElement>;

export const IconProvider = ({
  provider = "tabler",
  iconTag,
  size = 24,
  name,
  hasTooltip = true,
  className,
  ...props
}: IconProviderProps) => {
  const iconName = toPascalCase(iconTag);

  const TablerIcon = useMemo(() => {
    if (provider !== "tabler") {
      const Fallback: React.FC<{ size?: number; className?: string }> = ({
        size,
        className,
      }) => <IconFileAlert size={size} className={className} />;
      return Fallback;
    }
    return dynamic<{ size?: number; className?: string }>(async () => {
      try {
        const module = await import("@tabler/icons-react");
        // Pick the icon from the full module with a typed map to allow string indexing
        type TablerIconsMap = Record<
          string,
          React.FC<{ size?: number; className?: string }>
        >;
        const icons = module as unknown as TablerIconsMap;
        const IconComp = icons[iconName] || IconFileAlert;
        return IconComp;
      } catch (e) {
        console.error("Tabler icon load error:", e);
        return IconFileAlert;
      }
    });
  }, [provider, iconName]);

  if (provider === "tabler") {
    return (
      <>
        {hasTooltip ? (
          <TooltipComponent content={name ?? ""}>
            <TablerIcon
              size={size}
              className={cn("align-middle", className)}
              {...props}
            />
          </TooltipComponent>
        ) : (
          <TablerIcon
            size={size}
            className={cn("align-middle", className)}
            {...props}
          />
        )}
      </>
    );
  }

  // Fallback for unknown providers
  return (
    <TooltipComponent content={name ?? ""}>
      <span
        className={cn("text-muted-foreground inline-block", className)}
        style={{ width: size, height: size }}
      >
        <IconFileAlert size={size} />
      </span>
    </TooltipComponent>
  );
};

export default memo(IconProvider);

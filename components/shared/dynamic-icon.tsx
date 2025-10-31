"use client";

import type { IconProps } from "@tabler/icons-react";
import * as TablerIcons from "@tabler/icons-react";

export type DynamicIconName = keyof typeof TablerIcons;

interface DynamicIconProps extends Omit<IconProps, "ref"> {
  name: DynamicIconName | string;
  fallbackName?: DynamicIconName;
  className?: string;
}

export function DynamicIcon({
  name,
  fallbackName = "IconAlertCircle",
  className,
  ...props
}: DynamicIconProps) {
  const icons = TablerIcons as unknown as Record<string, React.FC<IconProps>>;

  const Icon = icons[name] ?? icons[fallbackName];

  if (!Icon) return null;

  return <Icon className={className ?? ""} {...props} />;
}

export default DynamicIcon;

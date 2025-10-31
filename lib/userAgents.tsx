import {
  IconDeviceDesktop,
  IconDeviceIpadHorizontal,
  IconDeviceMobile,
  type IconProps,
} from "@tabler/icons-react";
import type { ReactElement } from "react";
import { UAParser } from "ua-parser-js";

export interface ParsedDeviceInfo {
  label: string;
  icon: ReactElement<IconProps>;
}

export function parseUserAgent(userAgent?: string): ParsedDeviceInfo {
  if (!userAgent) {
    return {
      label: "Unknown Device",
      icon: <IconDeviceDesktop size={42} />,
    };
  }

  const parser = new UAParser(userAgent);
  const browser = parser.getBrowser();
  const os = parser.getOS();
  const device = parser.getDevice();

  const browserName = browser.name ?? "Unknown Browser";
  const osName = os.name ?? "Unknown OS";
  const osVersion = os.version ? ` ${os.version}` : "";
  const deviceType =
    device.type && device.vendor ? `${device.vendor} ${device.model}` : "";

  const label = deviceType
    ? `${browserName} on ${deviceType}`
    : `${browserName} on ${osName}${osVersion}`;

  let icon: ReactElement<IconProps> = <IconDeviceDesktop size={42} />;

  const type = device.type?.toLowerCase();
  const osLower = osName.toLowerCase();

  if (type === "mobile") icon = <IconDeviceMobile size={42} />;
  else if (type === "tablet") icon = <IconDeviceIpadHorizontal size={42} />;
  else if (["windows", "mac", "linux"].some((os) => osLower.includes(os)))
    icon = <IconDeviceDesktop size={42} />;

  return { label, icon };
}

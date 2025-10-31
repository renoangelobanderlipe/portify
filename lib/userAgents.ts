import { UAParser } from "ua-parser-js";

type ParsedDeviceInfo = {
  label: string;
  icon: string;
};

export function parseUserAgent(userAgent?: string): ParsedDeviceInfo {
  if (!userAgent) {
    return {
      label: "Unknown Device",
      icon: "lucide:help-circle",
    };
  }

  const parser = new UAParser(userAgent);
  const browser = parser.getBrowser();
  const os = parser.getOS();
  const device = parser.getDevice();

  const browserName = browser.name || "Unknown Browser";
  const osName = os.name || "Unknown OS";
  const osVersion = os.version ? ` ${os.version}` : "";
  const deviceType =
    device.type && device.vendor ? `${device.vendor} ${device.model}` : "";

  const label = deviceType
    ? `${browserName} on ${deviceType}`
    : `${browserName} on ${osName}${osVersion}`;

  let icon = "IconDeviceDesktop";

  const type = device.type?.toLowerCase();
  if (type === "mobile") icon = "IconDeviceMobile";
  else if (type === "tablet") icon = "IconDeviceIpadHorizontal";
  else if (osName?.toLowerCase().includes("windows"))
    icon = "IconDeviceDesktop";
  else if (osName?.toLowerCase().includes("mac")) icon = "IconDeviceDesktop";
  else if (osName?.toLowerCase().includes("linux")) icon = "IconDeviceLinux";

  return { label, icon };
}

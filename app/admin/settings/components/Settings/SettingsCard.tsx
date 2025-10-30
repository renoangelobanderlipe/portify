"use client";

import { DevicesCard } from "./DevicesCard";
import { EmailPasswordSettings } from "./EmailPassowrd";

export const SettingsCard = () => {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <EmailPasswordSettings />
      <DevicesCard />
    </div>
  );
};

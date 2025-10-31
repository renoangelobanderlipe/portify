"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsCard } from "./components/Settings/SettingsCard";
import TechStackCard from "./components/TechStack/TechStackCard";
import { ProfileCard } from "./components/UserProfile/ProfileCard";

export default function Page() {
  const tabs = [
    {
      value: "account",
      label: "Account",
      content: <ProfileCard />,
    },
    {
      value: "tech-stack",
      label: "Tech Stack",
      content: <TechStackCard />,
    },
    {
      value: "settings",
      label: "Settings",
      content: <SettingsCard />,
    },
  ];

  return (
    <Tabs defaultValue="account">
      <TabsList className="bg-transparent">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}

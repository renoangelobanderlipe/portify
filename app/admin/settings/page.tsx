"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsCard } from "./components/Settings/SettingsCard";
import TechStackCard from "./components/TechStack/TechStackCard";
import { ProfileCard } from "./components/UserProfile/ProfileCard";

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

export default function Page() {
  return (
    <Tabs defaultValue="settings">
      <TabsList className="bg-transparent">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="tech-stack">Tech Stack</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      {tabs.map((tab) => (
        <div key={tab.value} className="py-6">
          <TabsContent value={tab.value}>{tab.content}</TabsContent>
        </div>
      ))}
    </Tabs>
  );
}

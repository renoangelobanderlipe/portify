"use client";

import { ProfileInfo } from "./components/ProfileInfo";
import { UserProfile } from "./components/UserProfile";

export default function Page() {
  return (
    <div className="flex flex-col gap-6 xl:flex-row">
      <ProfileInfo />
      <UserProfile />
    </div>
  );
}

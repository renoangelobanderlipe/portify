"use client";

import { ProfileInfo } from "./components/ProfileInfo";
import { UserProfile } from "./components/UserProfile";

export default function Page() {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <div className="col-span-1">
        <ProfileInfo />
      </div>
      <div className="xl:col-span-2">
        <UserProfile />
      </div>
    </div>
  );
}

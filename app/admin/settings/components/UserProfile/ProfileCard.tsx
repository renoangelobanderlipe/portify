import { ProfileInfo } from "./ProfileInfo";
import { UserProfile } from "./UserProfile";

export const ProfileCard = () => {
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
};

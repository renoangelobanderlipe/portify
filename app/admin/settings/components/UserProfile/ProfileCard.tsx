import { useUser } from "@/hooks/use-user";
import { ProfileInfo } from "./ProfileInfo";
import { UserProfile } from "./UserProfile";

export const ProfileCard = () => {
  const { data: user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <div className="col-span-1">
        <ProfileInfo id={user.id} avatar={user.avatar} />
      </div>
      <div className="xl:col-span-2">
        <UserProfile user={user} />
      </div>
    </div>
  );
};

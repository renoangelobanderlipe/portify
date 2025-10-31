import { Card, CardContent } from "@/components/ui/card";
import { EmailSettings } from "./EmailSettings";
import { PasswordSettings } from "./PasswordSetting";

export const EmailPasswordSettings = () => {
  return (
    <div className="col-span-1">
      <Card>
        <CardContent className="flex flex-col gap-4">
          <EmailSettings />
          <PasswordSettings />
        </CardContent>
      </Card>
    </div>
  );
};

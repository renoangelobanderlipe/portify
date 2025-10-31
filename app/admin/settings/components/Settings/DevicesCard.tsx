"use client";

import { IconDeviceDesktopX, IconLogout } from "@tabler/icons-react";
import { useState } from "react";
import sessionsMock from "@/_mock/sessionsMock.json";
import { DeleteDialog } from "@/components/shared/delete-dialog";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { parseUserAgent } from "@/lib/userAgents";

export const DevicesCard = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOnDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // Handle delete logic here
    setOpenDialog(false);
  };

  if (!sessionsMock.length)
    <div className="flex flex-col items-center gap-4 p-14">
      <IconDeviceDesktopX size={54} />
      <p>No active sessions</p>
    </div>;

  return (
    <div>
      <Card>
        <form className="col-span-1">
          <CardContent className="flex flex-col gap-4">
            <CardTitle className="text-3xl font-extrabold tracking-tight text-balance">
              Connected Devices
            </CardTitle>

            <div className="flex flex-col gap-6 pt-4">
              {sessionsMock.map((session) => {
                const { icon } = parseUserAgent(session.user_agent);

                return (
                  <div
                    key={session.id}
                    className="flex items-center justify-between gap-6"
                  >
                    <div className="flex items-center justify-center gap-4">
                      {icon}
                      <div className="flex flex-col gap-1">
                        <div className="text-md font-medium">
                          {session.name}
                        </div>
                        <div className="text-sm">{session.ip_address}</div>
                      </div>
                    </div>
                    <IconLogout
                      size={26}
                      onClick={() => setOpenDialog(true)}
                      className="cursor-pointer transition-colors hover:text-red-500"
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </form>
      </Card>

      <DeleteDialog
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently disconnect the device."
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        handleOnClick={(event) => handleOnDelete(event)}
      />
    </div>
  );
};

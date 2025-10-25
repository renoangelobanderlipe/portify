"use client";

import { IconFolderCode } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
export const EmptyProject = () => {
  return (
    <div className="grid place-items-center h-full">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconFolderCode />
          </EmptyMedia>
          <EmptyTitle>No Projects Yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any projects yet. Get started by creating
            your first project.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Create Project</Button>
        </EmptyContent>
      </Empty>
    </div>
  );
};

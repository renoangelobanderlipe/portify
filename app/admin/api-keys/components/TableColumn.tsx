import type { Table } from "@tanstack/react-table";
import { ChevronDown, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Payment } from "./ApiKeyDataTable";
import { CreateApiKeyDialog } from "./CreateApiKeyDialog";

type ApiKeyTableColumnProps = {
  table: Table<Payment>;
};

export const ApiKeyTableColumn = ({ table }: ApiKeyTableColumnProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div className="flex justify-end gap-4 w-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <div>
          <Button className="ml-auto" onClick={() => setDialogOpen(true)}>
            Create API Keys <Plus />
          </Button>
        </div>
      </div>
      <CreateApiKeyDialog
        open={dialogOpen}
        close={() => setDialogOpen(false)}
      />
    </>
  );
};

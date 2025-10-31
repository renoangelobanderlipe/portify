import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Trash2 } from "lucide-react";
import { type MouseEvent, useState } from "react";
import { DeleteDialog } from "@/components/shared/delete-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useDeleteApiKey } from "@/features/apiKey/hooks/useDeleteApiKey";
import { maskText } from "@/utils/stringHelper";

export type Payment = {
  id: string;
  name: string;
  status: "active" | "inactive";
  api_key: string;
};

export const ApiColumns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "API Key Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "api_key",
    header: ({ column }) => {
      return (
        <div className="capitalize">
          {column.getIsSorted() === "asc" ? <ArrowUpDown /> : null} API Key
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{maskText(row.getValue("api_key"))}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const [openDialog, setOpenDialog] = useState(false);

      const { mutate: deleteApiKey } = useDeleteApiKey();

      const handleOnDelete = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        deleteApiKey(row.original.id, {
          onSuccess: () => {
            setOpenDialog(false);
          },
        });
      };

      return (
        <>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpenDialog(true)}>
              <Trash2 />
            </Button>
          </div>

          <DeleteDialog
            isOpen={openDialog}
            onClose={() => setOpenDialog(false)}
            handleOnClick={(event) => handleOnDelete(event)}
          />
        </>
      );
    },
  },
];

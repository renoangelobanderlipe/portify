"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, Trash2 } from "lucide-react";
import { type MouseEvent, useState } from "react";
import { DeleteDialog } from "@/components/shared/delete-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteApiKey } from "@/features/apiKey/hooks/useDeleteApiKey";
import { ApiKeyPagination } from "./Pagination";
import { ApiKeyTableColumn } from "./TableColumn";

const data: Payment[] = [
  {
    id: "m5gr84i9",
    name: "My Portfolio API Key",
    status: "active",
    api_key: "*********",
  },
  {
    id: "3u1reuv4",
    name: "My Other API Key",
    status: "inactive",
    api_key: "*********",
  },
];

export type Payment = {
  id: string;
  name: string;
  status: "active" | "inactive";
  api_key: string;
};

export const columns: ColumnDef<Payment>[] = [
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
      <div className="lowercase">{row.getValue("api_key")}</div>
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
          <div className="flex gap-2 justify-end">
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

export const ApiKeyDataTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <Card className="w-full p-6">
      <ApiKeyTableColumn table={table} />
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="**:data-[slot=table-cell]:first:w-8">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <ApiKeyPagination table={table} />
    </Card>
  );
};

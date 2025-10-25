"use client";

import data from "@/_mock/data.json";
import { ChartAreaInteractive } from "@/app/admin/dashboard/components/chart-area-interactive";
import { DataTable } from "@/app/admin/dashboard/components/data-table";

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </div>
  );
}

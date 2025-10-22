"use client";

import data from "@/_mock/data.json";
import { ChartAreaInteractive } from "@/app/admin/dashboard/components/chart-area-interactive";
import { DataTable } from "@/app/admin/dashboard/components/data-table";
import { SectionCards } from "@/app/admin/dashboard/components/section-cards";

export default function Page() {
  return (
    <>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </>
  );
}

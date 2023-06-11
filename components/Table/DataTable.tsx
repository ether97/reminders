"use client";

import { Reminder } from "@prisma/client";

declare module "@tanstack/table-core" {
  interface SortingFns {
    myCustomSorting: SortingFn<unknown>;
  }
}

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingFn,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMemo, useState } from "react";
import {
  useDeleteReminderMutation,
  useGetRemindersQuery,
} from "@/app/services/reminder";

interface DataTableProps {
  columns: ColumnDef<Partial<Reminder>>[];
  data: Partial<Reminder>[];
}

export function DataTable({ columns, data }: DataTableProps) {
  const [deleteReminder] = useDeleteReminderMutation();

  const prioritySort = useMemo(
    () =>
      (rowA: any, rowB: any, columnId: any): number => {
        const value = (A: string): number => {
          return A === "Low" ? 1 : A === "Medium" ? 2 : 3;
        };

        const Anum = value(rowA.original.priority);
        const Bnum = value(rowB.original.priority);

        if (Anum === Bnum) return 0;

        return Anum < Bnum ? 1 : -1;
      },
    []
  );

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    sortingFns: {
      myCustomSorting: prioritySort,
    },
  });

  return (
    <div className="rounded-md border my-3">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-center text-white">
                    {header.isPlaceholder ? null : (
                      <div onClick={() => header.column.toggleSorting()}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="text-center truncate max-w-[200px] text-white"
                    onClick={() => {
                      console.log(cell);
                      if (
                        cell.id.substring(2, cell.id.length) === "Delete" &&
                        row.original.id
                      ) {
                        deleteReminder(row.original.id);
                      }
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

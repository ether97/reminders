"use client";

import { Reminder } from "@/app/types/types";

declare module "@tanstack/table-core" {
  interface SortingFns {
    myCustomSorting: SortingFn<unknown>;
    myDeadlineSorting: SortingFn<unknown>;
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
  useDeleteReminderByIdMutation,
  useGetRemindersQuery,
} from "@/app/services/reminder";

interface DataTableProps {
  columns: ColumnDef<
    Pick<Reminder, "title" | "date" | "time" | "priority" | "id">
  >[];
  data: Pick<Reminder, "title" | "date" | "time" | "priority" | "id">[];
}

export function DataTable({ columns, data }: DataTableProps) {
  const [deleteReminder] = useDeleteReminderByIdMutation();

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

  const deadlineSort = useMemo(
    () =>
      (rowA: any, rowB: any, columnId: any): number => {
        if (!rowA.original.date && !rowB.original.date) return 0;
        if (!rowA.original.date) return 1;
        if (!rowB.original.date) return -1;
        if (!rowA.original.date === !rowB.original.date) {
          return new Date(rowA.original.time ?? "") <
            new Date(rowB.original.time ?? "")
            ? 1
            : -1;
        }
        return new Date(rowA.original.date ?? "") <
          new Date(rowB.original.date ?? "")
          ? 1
          : -1;
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
      myDeadlineSorting: deadlineSort,
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
                className={`${
                  row.original.date === "Expired"
                    ? "bg-zinc-600 cursor-not-allowed"
                    : ""
                }`}
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

// TableRegistro.tsx
'use client';
import React, { ReactNode } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Registro, columns } from "@/app/registros/RegistroColumns";

export default function TableRegistro({ registros }: { registros: Registro[] }) {
  return (
    <Table aria-label="Table of Registros">
      <TableHeader>
        {columns.map(column => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody emptyContent={"Não há registros disponíveis"}>
        {registros.map(registro => (
          <TableRow key={registro.id}>
            {columns.map(column => (
              <TableCell key={column.key}>
                {column.render ? column.render(registro) : (registro[column.key as keyof Registro] as ReactNode)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
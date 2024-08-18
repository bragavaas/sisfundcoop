'use client'
import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import { Campanha, columns } from "@/app/campanhas/CampanhaColumns";


export default function TableCampanha({campanhas}: {campanhas: Campanha[]}) {
  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={"Não há campanhas registradas no momento"} items={campanhas}>
        {(item) => (
          <TableRow key={item.nome}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

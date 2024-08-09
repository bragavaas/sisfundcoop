'use client'
import React from "react";
import { Table as NextTable, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";

// Define types for the props
type TableHeaderType = {
  key: string;
  label: string;
};

type TableRowType = {
  key: string;
  cells: React.ReactNode[];  // Ensure this is compatible with React elements
};

interface TableProps {
  headers: TableHeaderType[];
  rows: TableRowType[];
}

const Table: React.FC<TableProps> = ({ headers, rows }) => {
  return (
    <NextTable aria-label="Example static collection table">
      <TableHeader>
        {headers.map((header) => (
          <TableColumn key={header.key}>{header.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.key}>
            {row.cells.map((cell, index) => (
              <TableCell key={index}>{cell as React.ReactElement}</TableCell>
            ))}
            <TableCell key="action">
              <Button size="sm">Visualizar</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </NextTable>
  );
};

export default Table;

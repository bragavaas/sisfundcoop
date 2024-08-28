"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Button,
} from "@nextui-org/react";
import { Registro } from "../app/registros/RegistroColumns";

type SortDirection = "asc" | "desc";
type SortColumn = keyof Registro | null;

type TableRegistroProps = {
  registros: Registro[];
  onDelete: (id: string) => void;
};

const TableRegistro: React.FC<TableRegistroProps> = ({
  registros,
  onDelete,
}) => {
  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (column: SortColumn) => {
    const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);
  };

  const sortedRegistros = [...registros].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else if (aValue instanceof Date && bValue instanceof Date) {
      return sortDirection === "asc"
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
    }
    return 0;
  });

  return (
    <Table aria-label="Registro Table">
      <TableHeader>
        <TableColumn onClick={() => handleSort("nomeDoParticipante")}>
          Nome {sortColumn === "nomeDoParticipante" && (sortDirection === "asc" ? "↑" : "↓")}
        </TableColumn>
        <TableColumn onClick={() => handleSort("matriculaDoParticipante")}>
          Matrícula {sortColumn === "matriculaDoParticipante" && (sortDirection === "asc" ? "↑" : "↓")}
        </TableColumn>
        <TableColumn onClick={() => handleSort("dataRetirada")}>
          Data da Retirada {sortColumn === "dataRetirada" && (sortDirection === "asc" ? "↑" : "↓")}
        </TableColumn>
        <TableColumn onClick={() => handleSort("horarioRetirada")}>
          Horário da Retirada {sortColumn === "horarioRetirada" && (sortDirection === "asc" ? "↑" : "↓")}
        </TableColumn>
        <TableColumn>
          Campanha
        </TableColumn>
        <TableColumn>Ações</TableColumn>
      </TableHeader>
      <TableBody>
        {sortedRegistros.map((registro) => (
          <TableRow key={registro.id}>
            <TableCell>{registro.nomeDoParticipante}</TableCell>
            <TableCell>{registro.matriculaDoParticipante}</TableCell>
            <TableCell>{registro.dataRetirada}</TableCell>
            <TableCell>{registro.horarioRetirada}</TableCell>
            <TableCell>TUPY OFICIAL 2024</TableCell>
            <TableCell className="flex flex-row gap-4">
              {/* Add Edit and Delete buttons */}
              <Button
                color="danger"
                variant="ghost"
                onPress={() => onDelete(String(registro.id))}
              >
                Deletar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableRegistro;

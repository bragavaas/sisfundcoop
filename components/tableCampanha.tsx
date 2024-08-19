"use client";
import React from "react";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Button } from "@nextui-org/react";
// Import the type or interface if you have one
import { Campanha } from "../app/campanhas/CampanhaColumns";

type TableCampanhaProps = {
  campanhas: Campanha[];
  onEdit: (campanha: Campanha) => void;
  onDelete: (id: string) => void;
};

const TableCampanha: React.FC<TableCampanhaProps> = ({ campanhas, onEdit, onDelete }) => {
  return (
    <Table aria-label="Campanha Table">
      <TableHeader>
        <TableColumn>Nome</TableColumn>
        <TableColumn>Data de Início</TableColumn>
        <TableColumn>Data de Término</TableColumn>
        <TableColumn>Número de Participantes</TableColumn>
        <TableColumn>Ações</TableColumn>
      </TableHeader>
      <TableBody>
        {campanhas.map((campanha) => (
          <TableRow key={campanha.id}>
            <TableCell>{campanha.nome}</TableCell>
            <TableCell>{campanha.dataInicio}</TableCell>
            <TableCell>{campanha.dataTermino}</TableCell>
            <TableCell>{campanha.numeroParticipantes}</TableCell>
            <TableCell>
              {/* Add Edit and Delete buttons */}
              <Button color="primary" onPress={() => onEdit(campanha)}>Editar</Button>
              <Button color="danger" onPress={() => onDelete(campanha.id)}>Deletar</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableCampanha;
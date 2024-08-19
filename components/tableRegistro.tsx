"use client";
import React from "react";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Button } from "@nextui-org/react";
// Import the type or interface if you have one
import { Registro } from "../app/registros/RegistroColumns";

type TableRegistroProps = {
  registros: Registro[];
  onEdit: (registro: Registro) => void;
  onDelete: (id: string) => void;
};

const TableRegistro: React.FC<TableRegistroProps> = ({ registros, onEdit, onDelete }) => {
  return (
    <Table aria-label="Registro Table">
      <TableHeader>
        <TableColumn>Nome</TableColumn>
        <TableColumn>Matrícula</TableColumn>
        <TableColumn>Data da Retirada</TableColumn>
        <TableColumn>Horário da Retirada</TableColumn>
        <TableColumn>Campanha</TableColumn>
        <TableColumn>Ações</TableColumn>
      </TableHeader>
      <TableBody>
        {registros.map((registro) => (
          <TableRow key={registro.id}>
            <TableCell>{registro.nomeDoParticipante}</TableCell>
            <TableCell>{registro.matriculaDoParticipante}</TableCell>
            <TableCell>{registro.dataRetirada}</TableCell>
            <TableCell>{registro.horarioRetirada}</TableCell>
            <TableCell>{registro.campanha?.nome}</TableCell>
            <TableCell className="flex flex-row gap-4">
              {/* Add Edit and Delete buttons */}
              <Button color="danger" variant="ghost" onPress={() => onDelete(String(registro.id))}>Deletar</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableRegistro;
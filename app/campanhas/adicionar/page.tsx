"use client";
import React, { useState } from "react";
import {
  Card,
  Button,
  Input,
  Image,
  Table,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  getKeyValue,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Participante, columns } from "./tableColumns";

export default function Adicionar() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // State to manage the list of participants
  const [participantes, setParticipantes] = useState<Participante[]>([
    {
      id: 1,
      nome: "André",
      matricula: "2023823",
    },
    {
      id: 2,
      nome: "Bruno",
      matricula: "2023823",
    },
  ]);

  // State to manage the form input values
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");

  const handleAddCampanha = () => {
  
  };  
  const handleAddParticipante = () => {
    // Add the new participant to the list
    const newParticipante = {
      id: participantes.length + 1, // Simple ID generation
      nome,
      matricula,
    };
    setParticipantes([...participantes, newParticipante]);
    // Clear the form inputs
    setNome("");
    setMatricula("");
    onOpenChange();
  };

  return (
    <>
      <section style={{ width: "80vw" }}>
        <Card className="flex w-full gap-4 p-10">
        <h1 className="text-lg">Gerenciamento de Campanhas</h1>
        <div className="flex w-full flex-col gap-10">
          <div>
            <h3>Informações da Campanha</h3>
            <div className="flex w-full flex-row md:flex-nowrap gap-4">
              <div style={{ width: "20%" }} className="container mx-auto">
                <Image
                  width={300}
                  height="auto"
                  src="/uploads/mochila.webp"
                  alt="Default Image"
                />
              </div>
              <div style={{ width: "40%" }} className="flex flex-col gap-4">
                <Input
                  type="text"
                  label="Nome da Campanha"
                  placeholder="Insira o nome da Campanha"
                />
                <Input type="date" label="Data de Início" />
              </div>
              <div style={{ width: "40%" }} className="flex flex-col gap-4">
                <Input
                  type="text"
                  label="Brinde"
                  placeholder="Insira o nome do brinde"
                />
                <Input type="date" label="Data de Término" />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-4">
            <h2>Participantes</h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4">
                <Button color="primary" variant="bordered">
                  Importar via planilha
                </Button>
                <Button color="primary" variant="bordered" onPress={onOpen}>
                  Adicionar manualmente
                </Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">
                          Adicionar manualmente um participante
                        </ModalHeader>
                        <ModalBody>
                          <Input
                            autoFocus
                            placeholder="insira o nome do participante"
                            variant="bordered"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                          />
                          <Input
                            placeholder="insira a matricula do participante"
                            variant="bordered"
                            value={matricula}
                            onChange={(e) => setMatricula(e.target.value)}
                          />
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="danger"
                            variant="light"
                            onPress={onClose}
                          >
                            Fechar
                          </Button>
                          <Button color="primary" onPress={handleAddParticipante}>
                            Adicionar
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </div>
              <div style={{ width: "50%" }}>
                <Table aria-label="Example table with dynamic content">
                  <TableHeader columns={columns}>
                    {(column) => (
                      <TableColumn key={column.key}>{column.label}</TableColumn>
                    )}
                  </TableHeader>
                  <TableBody
                    emptyContent={
                      "Não há participantes registrados no momento"
                    }
                    items={participantes}
                  >
                    {(item) => (
                      <TableRow key={item.nome}>
                        {(columnKey) => (
                          <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="flex flex-row gap-4 justify-end">
                <Button color="danger" variant="bordered">
                  Cancelar
                </Button>
                <Button color="primary" variant="bordered" onClick={handleCreateCampanha}>
                  Cadastrar Campanha
                </Button>
            </div>
          </div>
        </div>
        </Card>
      </section>
    </>
  );
}

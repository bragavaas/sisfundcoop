"use client";
import React, { useState, useEffect } from "react";
import { Input, Button, Modal, useDisclosure, ModalContent, ModalHeader, ModalBody, ModalFooter, getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import TableCampanha from "@/components/tableCampanha";
import { Campanha, columns as campanhaColumns } from "./CampanhaColumns";
import { Participante, columns as participanteColumns } from "./adicionar/tableColumns";
import Link from "next/link";
import { SearchIcon } from "@/components/icons";

async function getCampanhas(): Promise<Campanha[]> {
  try {
    const response = await fetch('http://localhost:3000/api/campanhas');
    if (!response.ok) {
      throw new Error(`Error fetching campanhas: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default function CampanhaPage() {
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isNewOpen, onOpen: onNewOpen, onClose: onNewClose } = useDisclosure();
  const [campanhas, setCampanhas] = useState<Campanha[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCampanha, setSelectedCampanha] = useState<Campanha | null>(null);
  const [participantes, setParticipantes] = useState<Participante[]>([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedCampanhas = await getCampanhas();
      setCampanhas(fetchedCampanhas);
    }
    fetchData();
  }, []);

  const filteredCampanhas = campanhas.filter(campanha =>
    campanha.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (campanha: Campanha) => {
    setSelectedCampanha(campanha);
    onEditOpen();
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/campanhas?id=${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete campanha");
      }
  
      setCampanhas(campanhas.filter(c => c.id !== parseInt(id)));
    } catch (error) {
      console.error("Error deleting campanha:", error);
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedCampanha) return;

    try {
      const response = await fetch(`http://localhost:3000/api/campanhas?id=${selectedCampanha.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedCampanha),
      });

      if (!response.ok) {
        throw new Error("Failed to update campanha");
      }

      const updatedCampanha = await response.json();

      setCampanhas(campanhas.map(c => c.id === updatedCampanha.id ? updatedCampanha : c));
      onEditClose();
    } catch (error) {
      console.error("Error updating campanha:", error);
    }
  };

  return (
    <section style={{ width: '80vw' }} className="">
      <div className="flex flex-col space-y-5 text-left">
        <h1 className="text-lg">Gerenciamento de Campanhas</h1>
        <div className="flex flex-row w-full justify-between items-center" style={{ width: '80vw' }}>
          <div style={{ width: '30vw' }}>
            <Input
              aria-label="Search"
              classNames={{
                inputWrapper: "bg-default-100",
                input: "text-sm",
              }}
              labelPlacement="outside"
              placeholder="Pesquise..."
              startContent={<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />}
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="flex-grow"
            />
          </div>
          <div>
            <Link href="campanhas/adicionar">
              <Button className="ml-4" color="primary" variant="bordered" onPress={onNewOpen}>
                Novo Registro
              </Button>
            </Link>
          </div>
        </div>
        <div style={{ width: '80vw' }}>
          <TableCampanha campanhas={filteredCampanhas} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onOpenChange={onEditClose}>
        <ModalContent>
          <ModalHeader>Editar Campanha</ModalHeader>
          <ModalBody>
            {selectedCampanha && (
              <div className="flex flex-col gap-4">
                <Input
                  label="Nome da Campanha"
                  placeholder="Insira o nome da Campanha"
                  value={selectedCampanha.nome}
                  onChange={(e) => setSelectedCampanha({ ...selectedCampanha, nome: e.target.value })}
                />
                <Input
                  type="date"
                  label="Data de Início"
                  value={selectedCampanha.dataInicio}
                  onChange={(e) => setSelectedCampanha({ ...selectedCampanha, dataInicio: e.target.value })}
                />
                <Input
                  type="date"
                  label="Data de Término"
                  value={selectedCampanha.dataTermino}
                  onChange={(e) => setSelectedCampanha({ ...selectedCampanha, dataTermino: e.target.value })}
                />
                <Input
                  label="Número de Participantes"
                  placeholder="Insira o número de participantes"
                  value={selectedCampanha.numeroParticipantes.toString()}
                  onChange={(e) => setSelectedCampanha({ ...selectedCampanha, numeroParticipantes: parseInt(e.target.value, 10) })}
                />
          <Table aria-label="Participantes">
            <TableHeader columns={participanteColumns}>
              {(column) => (
                <TableColumn key={column.key}>
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody
              emptyContent={"Não há participantes registrados no momento"}
              items={selectedCampanha.participantes}  // Use selectedCampanha.participantes here
            >
              {(item) => (
                <TableRow key={item.matricula}>
                  {(columnKey) => (
                    <TableCell>
                      {item[columnKey as keyof Participante]}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onEditClose}>Fechar</Button>
            <Button color="primary" onPress={handleSaveEdit}>Salvar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
}

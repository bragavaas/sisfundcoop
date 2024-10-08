"use client"
import React, { useState } from "react";
import {
  Card,
  Button,
  Input,
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
import { useRouter } from 'next/navigation';
import * as XLSX from 'xlsx';

export default function Adicionar() {
  const router = useRouter(); 
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file){
      console.log("no file");
    }else{
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const rows = XLSX.utils.sheet_to_json(sheet);
          rows.forEach((row: any) => {
            const nome = row.NOME; // Trim spaces to avoid issues
            const matricula = row.MAT_SET;
            if (nome && matricula) {
              handleAddMultipleParticipantes(String(nome), String(matricula));
            }
          });
        }
      };
      reader.readAsBinaryString(file);
    }
  };
  

  const handleAddMultipleParticipantes = (nome: string, matricula: string) => {
    const newParticipante = {
      nome,
      matricula,
    };
    setParticipantes((prevParticipantes) => [...prevParticipantes, newParticipante]);
  };
  // State to manage the form input values for the campaign
  const [campanhaNome, setCampanhaNome] = useState("");
  const [campanhaBrinde, setCampanhaBrinde] = useState("");
  const [campanhaDataInicio, setCampanhaDataInicio] = useState("");
  const [campanhaDataTermino, setCampanhaDataTermino] = useState("");
  const [participantes, setParticipantes] = useState<Participante[]>([]);
  

  // State for new participant inputs
  const [novoParticipanteNome, setNovoParticipanteNome] = useState("");
  const [novoParticipanteMatricula, setNovoParticipanteMatricula] = useState("");

  const handleAddParticipante = () => {
      // Add the new participant to the list
      const newParticipante = {
        nome: novoParticipanteNome,
        matricula: novoParticipanteMatricula,
      };
      setParticipantes([...participantes, newParticipante]);

      // Clear the participant form inputs
      setNovoParticipanteNome("");
      setNovoParticipanteMatricula("");
  };

  const handleAddCampanha = async () => {
    const campanhaData = {
      nome: campanhaNome,
      brinde: campanhaBrinde,
      dataInicio: campanhaDataInicio, // Format date to ISO
      dataTermino: campanhaDataTermino, // Format date to ISO
      participantes: participantes,
      numeroParticipantes: participantes.length,
    };
  
    console.log("Campanha Data: ", JSON.stringify(campanhaData, null, 2));
  
    try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/campanhas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(campanhaData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add campanha");
      }
  
      const result = await response.json();
      console.log("Campanha added successfully:", result);
      
      router.push('/campanhas');
    } catch (error) {
      console.error("Error adding campanha:", error);
    }
  };
  

  const setNome = (value: string) => {
    setNovoParticipanteNome(value);
  };

  const setMatricula = (value: string) => {
    setNovoParticipanteMatricula(value);
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

                <div style={{ width: "40%" }} className="flex flex-col gap-4">
                  <Input
                    type="text"
                    label="Nome da Campanha"
                    placeholder="Insira o nome da Campanha"
                    value={campanhaNome}
                    onChange={(e) => setCampanhaNome(e.target.value)}
                  />
                  <Input
                    type="date"
                    label="Data de Início"
                    value={campanhaDataInicio}
                    onChange={(e) => setCampanhaDataInicio(e.target.value)}
                  />
                </div>
                <div style={{ width: "40%" }} className="flex flex-col gap-4">
                  <Input
                    type="text"
                    label="Brinde"
                    placeholder="Insira o nome do brinde"
                    value={campanhaBrinde}
                    onChange={(e) => setCampanhaBrinde(e.target.value)}
                  />
                  <Input
                    type="date"
                    label="Data de Término"
                    value={campanhaDataTermino}
                    onChange={(e) => setCampanhaDataTermino(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4">
              <h2>Participantes</h2>
              <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-4">
                
                <Button color="primary" variant="bordered">
                    Importar via planilha
                    <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} ></input>
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
                              placeholder="insira o nome do participante"
                              variant="bordered"
                              value={novoParticipanteNome}
                              onChange={(e) => setNome(e.target.value)}
                            />
                            <Input
                              placeholder="insira a matricula do participante"
                              variant="bordered"
                              value={novoParticipanteMatricula}
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
                            <Button
                              color="primary"
                              onPress={handleAddParticipante}
                            >
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
                        <TableColumn key={column.key}>
                          {column.label}
                        </TableColumn>
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
                            <TableCell>
                              {getKeyValue(item, columnKey)}
                            </TableCell>
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
                <Button
                  color="primary"
                  variant="bordered"
                  onClick={handleAddCampanha}
                >
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

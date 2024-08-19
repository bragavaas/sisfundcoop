"use client";
import { SearchIcon } from "@/components/icons";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import React, { useEffect, useState } from "react";
import TableRegistro from "@/components/tableRegistro";
import Card from "@/components/card";
import {
  BsFillPeopleFill,
  BsFillGiftFill,
  BsFileBarGraphFill,
  BsFillAwardFill,
} from "react-icons/bs";
import { Registro } from "./RegistroColumns";
import { useDisclosure } from "@nextui-org/modal";
import { useRouter } from "next/navigation";

export default function RegistrosPage() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const { isOpen: isNewOpen, onOpen: onNewOpen, onClose: onNewClose } = useDisclosure();
  const [selectedRegistro, setSelectedRegistro] = useState<Registro | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter(); // Moved useRouter inside the component

  const handleEdit = (registro: Registro) => {
    setSelectedRegistro(registro);
    onNewOpen();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/registros?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete registro");
      }

      setRegistros(registros.filter((c) => c.id !== parseInt(id)));
    } catch (error) {
      console.error("Error deleting registro:", error);
    }
  };

  const filteredRegistros = registros.filter((registro) =>
    registro.nomeDoParticipante.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetch data from API
  useEffect(() => {
    async function fetchRegistros() {
      try {
        const response = await fetch("http://localhost:3000/api/registros");
        if (!response.ok) {
          throw new Error("Failed to fetch registros");
        }
        const data = await response.json();
        setRegistros(data);
      } catch (error) {
        console.error("Error fetching registros:", error);
      }
    }

    fetchRegistros();
  }, []);

  return (
    <section style={{ width: "80vw" }} className="">
      <div className="flex flex-col space-y-5 text-left">
        <h1 className="text-lg">Gerenciamento de Retiradas</h1>
        <div
          className="flex flex-row w-full justify-between items-center"
          style={{ width: "80vw" }}
        >
          <div style={{ width: "30vw" }}>
            <Input
              aria-label="Search"
              classNames={{
                inputWrapper: "bg-default-100",
                input: "text-sm",
              }}
              labelPlacement="outside"
              placeholder="Pesquise..."
              startContent={
                <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
              }
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="flex-grow"
            />
          </div>
          <div>
            <Button
              className="ml-4"
              color="primary"
              variant="bordered"
              onPress={() => router.push('/registros/adicionar')}
            >
              Novo Registro
            </Button>
          </div>
        </div>
        <div style={{ width: "80vw" }}>
          <TableRegistro
            registros={filteredRegistros}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </section>
  );
}

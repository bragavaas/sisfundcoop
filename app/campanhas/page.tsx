"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import TableCampanha from "@/components/tableCampanha";
import { SearchIcon } from "@/components/icons";
import { Campanha } from "./CampanhaColumns";
import Link from "next/link";

const searchInput = (
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
    className="flex-grow"
  />
);

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
    return []; // Return an empty array or handle the error as needed
  }
}

export default function CampanhaPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [campanhas, setCampanhas] = useState<Campanha[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const modalSize = "5xl";

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

  return (
    <section style={{ width: '80vw' }} className="">
      <div className="flex flex-col space-y-5 text-left">
        <h1 className="text-lg">Gerenciamento de Campanhas</h1>
        <div className="flex flex-row w-full justify-between items-center" style={{ width: '80vw' }}>
          <div style={{ width: '30vw' }}>{searchInput}</div>
          <div>
            <Link href="campanhas/adicionar">
            <Button className="ml-4" color="primary" variant="bordered" onPress={onOpen}>
              Novo Registro
            </Button>
            </Link>
          </div>
        </div>
        <div style={{ width: '80vw' }}>
          <TableCampanha campanhas={filteredCampanhas} />
        </div>
      </div>
    </section>
  );
}

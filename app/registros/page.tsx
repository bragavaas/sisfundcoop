"use client";
import { SearchIcon } from "@/components/icons";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import React, { useEffect, useState } from "react";
import TableRegistro from "@/components/tableRegistro";
import Card from "@/components/card";
import { BsFillPeopleFill, BsFillGiftFill, BsFileBarGraphFill, BsFillAwardFill } from "react-icons/bs";

interface Registro {
  id: number;
  nomeDoParticipante: string;
  campanhaId: number;
  dataRetirada: string;
  horarioRetirada: string;
  campanha: {
    nome: string;
  };
}

export default function RegistrosPage() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  
  // Fetch data from API
  useEffect(() => {
    async function fetchRegistros() {
      const response = await fetch('http://localhost:3000/api/registros');
      const data = await response.json();
      setRegistros(data);
    }
    
    fetchRegistros();
  }, []);

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

  return (
    <section style={{ width: '80vw' }} className="">
      <div className="flex flex-col space-y-5 text-left">
        <div className="flex flex-row w-full gap-3.5">
          <Card
            icon={BsFillPeopleFill}
            iconColor="blue"
            backgroundColor="#E7EDFF"
            title="Participantes"
            info="1986"
          />
          <Card
            icon={BsFillGiftFill}
            iconColor="#FFBB38"
            backgroundColor="#FFF5D9"
            title="Retiradas"
            info="1547/1986"
          />
          <Card
            icon={BsFileBarGraphFill}
            iconColor="#FF82AC"
            backgroundColor="#FFE0EB"
            title="Porcentagem"
            info="77%"
          />
          <Card
            icon={BsFillAwardFill}
            iconColor="#16DBCC"
            backgroundColor="#DCFAF8"
            title="Campanhas Ativas"
            info="2"
          />
        </div>
        <h1 className="text-lg">Gerenciamento de Retiradas</h1>
        <div className="flex flex-row w-full justify-between items-center" style={{ width: '80vw' }}>
          <div style={{ width: '30vw' }}>{searchInput}</div>
          <div>
            <Button className="ml-4" color="primary" variant="bordered">
              Novo Registro
            </Button>
          </div>
        </div>
        <div style={{ width: '80vw' }}>
          <TableRegistro registros={registros} />
        </div>
      </div>
    </section>
  );
}

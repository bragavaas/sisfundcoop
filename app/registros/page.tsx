"use client";
import { SearchIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import { Input } from "@nextui-org/input";
import {Button, ButtonGroup} from "@nextui-org/button";
import React from "react";
import Table from "@/components/table";
import Card from "@/components/card";
import { BsFillPeopleFill, BsFillGiftFill, BsFileBarGraphFill, BsFillAwardFill   } from "react-icons/bs";


export default function RegistrosPage() {
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

  const headers = [
    { key: 'matricula', label: 'CAMPANHA' },
    { key: 'nome_cooperado', label: 'DATA DE INÍCIO' },
    { key: 'campanha', label: 'DATA DE TÉRMINO' },
    { key: 'data_retirada', label: 'PARTICIPANTES' },
    { key: 'horario_retirada', label: 'HORÁRIO RETIRADA' },
    { key: 'acoes', label: 'INFORMAÇÕES' },
  ];

  const rows = [
    { key: '1', cells: ['087254', 'Gerson dos Santos', 'Campanha Mochila', '29/07/2024', '16:54'] },
    { key: '2', cells: ['025698', 'Márcia Costa', 'Campanha Mochila', '29/07/2024', '16:11'] },
    { key: '3', cells: ['025478', 'Pedro Augusto', 'Campanha Mochila', '29/07/2024', '15:47'] },
    { key: '4', cells: ['154896', 'Camila Frizzeiro', 'Campanha Mochila', '29/07/2024', '15:42'] },
    { key: '5', cells: ['657872', 'Alex Rosa', 'Campanha Mochila', '29/07/2024', '15:32'] },
    { key: '6', cells: ['325897', 'Mateus Antunes', 'Campanha Mochila', '29/07/2024', '14:29'] },
    { key: '7', cells: ['987562', 'Paula Campos', 'Campanha Mochila', '29/07/2024', '14:20'] },
    { key: '8', cells: ['326857', 'Claudia Marques', 'Campanha Mochila', '29/07/2024', '10:11'] },
    { key: '9', cells: ['195487', 'João Alberto', 'Campanha Mochila', '29/07/2024', '10:02'] },
    { key: '10', cells: ['878996', 'Juliana Alves', 'Campanha Mochila', '29/07/2024', '09:20']}


  ];

  return (
    <section style={{width:'80vw'}} className="">
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
            title="Campanhas ativas"
            info="2"
          />
        </div>
        <h1 className="text-lg">Gerenciamento de Retiradas</h1>
        <div className="flex flex-row w-full justify-between items-center"  style={{width: '80vw'}}>
          <div style={{width: '30vw'}}>{searchInput}</div>
          <div>
            <Button className="ml-4" color="primary" variant="bordered">
                  Nova Campanha
                </Button>
          </div>
        </div>
        <div style={{width:'80vw'}}>
        <Table headers={headers} rows={rows} />
        </div>
      </div>
    </section>
  );
}

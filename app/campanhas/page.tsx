"use client";
import { SearchIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import { Input } from "@nextui-org/input";
import {Button, ButtonGroup} from "@nextui-org/button";
import React from "react";
import Table from "@/components/table";


export default function CampanhaPage() {
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
    { key: 'campanha', label: 'CAMPANHA' },
    { key: 'data_inicio', label: 'DATA DE INÍCIO' },
    { key: 'data_termino', label: 'DATA DE TÉRMINO' },
    { key: 'participantes', label: 'PARTICIPANTES' },
    { key: 'acoes', label: 'INFORMAÇÕES' },
  ];

  const rows = [
    { key: '1', cells: ['Campanha 1 Campanha 1 Campanha 1', '01/01/2021', '01/02/2021', '100'] },
    { key: '2', cells: ['Campanha 2', '01/01/2021', '01/02/2021', '100'] },
    { key: '3', cells: ['Campanha 3', '01/01/2021', '01/02/2021', '100'] },
    { key: '4', cells: ['Campanha 4', '01/01/2021', '01/02/2021', '100'] },
    { key: '5', cells: ['Campanha 5', '01/01/2021', '01/02/2021', '100'] },
    { key: '6', cells: ['Campanha 6', '01/01/2021', '01/02/2021', '100'] },
    { key: '7', cells: ['Campanha 7', '01/01/2021', '01/02/2021', '100'] },
    { key: '8', cells: ['Campanha 8', '01/01/2021', '01/02/2021', '100'] },
    { key: '9', cells: ['Campanha 9', '01/01/2021', '01/02/2021', '100'] },
    { key: '10', cells: ['Campanha 10', '01/01/2021', '01/02/2021', '100'] },
  ];

  return (
    <section style={{width:'inherit'}} className="">
      <div className="flex flex-col space-y-5 text-left">
        <h1 className="text-lg">Gerenciamento de Campanhas</h1>
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

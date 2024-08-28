"use client";
import React, { useEffect, useState } from "react";
import { Card, Button, Input, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Campanha, Participante } from "@prisma/client";
import { SearchIcon } from "@/components/icons";

export default function Adicionar() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [registroNomeDoParticipante, setregistroNomeDoParticipante] = useState("");
  const [registroMatricula, setregistroMatricula] = useState("");
  const [registroDataRetirada, setregistroDataRetirada] = useState("");
  const [registroHorarioRetirada, setregistroHorarioRetirada] = useState("");
  const [selectedCampanha, setSelectedCampanha] = useState<number | null>(null);
  const [campanhas, setCampanhas] = useState<(Campanha & { participantes: Participante[] })[]>([]);
  const [matriculaValid, setMatriculaValid] = useState<boolean | null>(null);
  const [participanteRegistrado, setParticipanteRegistrado] = useState<boolean | null>(null);

  useEffect(() => {
    fetchCampanhas();
  }, []);

  const handleCampanhaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value, 10);
    setSelectedCampanha(selectedId);
    console.log("Selected campanha:", selectedId);
  };

  const handleCancelBtn = () => {
    router.push("/registros");
  };

  const handleCheckMatricula = async () => {
    if (selectedCampanha === null || !registroMatricula) {
      setMatriculaValid(false);
      return;
    }

    const campanha = campanhas.find((c) => c.id === selectedCampanha);
    if (!campanha) {
      setMatriculaValid(false);
      return;
    }

    const participante = campanha.participantes.find(
      (p) => p.matricula === registroMatricula
    );
    try {
      const res_participante_registrado = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/check-registro?matricula=${registroMatricula}&campanhaId=${campanha.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data_participante_registrado = await res_participante_registrado.json();
      if (participante) {
        if(data_participante_registrado.participante_ja_retirou){
          setMatriculaValid(true);
          setParticipanteRegistrado(true);
          setregistroNomeDoParticipante(participante.nome);
          return;
        }else{
          setMatriculaValid(true);
          setParticipanteRegistrado(false);
          setregistroNomeDoParticipante(participante.nome);
        }
      } else {
        setMatriculaValid(false);
      }
    } catch (error) {
      console.error("Error checking matricula:", error);
    }
  }

  const fetchCampanhas = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/campanhas`);
      const data = await response.json();
      setCampanhas(data);
    } catch (error) {
      console.error("Error fetching campanhas:", error);
    }
  };

  const handleAddRegistro = async () => {
    if (selectedCampanha === null) {
      console.error("No campanha selected");
      return;
    }
    const now = new Date(); // Get the current date and time

    // Format the date in DD-MM-YYYY
    const currentDate = 
        `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;
    
    // Extract the time in HH:MM:SS format
    const currentTime = now.toTimeString().split(' ')[0];

    const registroData = {
      nomeDoParticipante: registroNomeDoParticipante,
      matriculaDoParticipante: registroMatricula,
      dataRetirada: currentDate, // Use formatted date
      horarioRetirada: currentTime, // Use formatted time
      campanhaId: selectedCampanha, // Use selectedCampanha for campanha ID
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/registros`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registroData),
      });

      if (!response.ok) {
        throw new Error("Failed to add Registro");
      }

      const result = await response.json();
      console.log("Registro added successfully:", result);

      router.push("/registros");

      setregistroNomeDoParticipante("");
      setregistroMatricula("");
      setregistroDataRetirada("");
      setregistroHorarioRetirada("");
      setSelectedCampanha(null);
    } catch (error) {
      console.error("Error adding registro:", error);
    }
  };

  return (
    <>
      <section style={{ width: "80vw" }}>
        <Card className="flex w-full gap-4 p-10">
          <h1 className="text-lg">Gerenciamento de Registros</h1>
          <div className="flex w-full flex-col gap-10">
            <div className="flex flex-col gap-4">
              <label htmlFor="campanha-select">Selecione a Campanha:</label>
              <select
                id="campanha-select"
                value={selectedCampanha ?? ""}
                onChange={handleCampanhaChange}
                className="border h-10 rounded p-2"
              >
                <option value="" disabled>
                  -- Selecione uma campanha --
                </option>
                {campanhas.map((campanha) => (
                  <option key={campanha.id} value={campanha.id}>
                    {campanha.nome}
                  </option>
                ))}
              </select>
            </div>
            {matriculaValid === true && (
              <p className="text-green-500">Matrícula válida, Cooperado está registrado na Campanha.</p>
            )}
            {matriculaValid === false && (
              <p className="text-red-500">Matrícula inválida, Cooperado não está registrado na Campanha.</p>
            )}
            {participanteRegistrado === true && (
              <p className="text-red-500">ATENÇÃO: Cooperado <b>JÁ RETIROU SEU BRINDE.</b></p>
            )}
            {participanteRegistrado === false && (
              <p className="text-green-500">Cooperado liberado para retirar o brinde.</p>
            )}
            <div className="flex flex-row gap-2">
              <Button
                className="p-7"
                isIconOnly
                variant="solid"
                color="primary"
                aria-label="Like"
                onClick={handleCheckMatricula}
              >
                <SearchIcon style={{ color: "white" }} className="size-6 text-base text-default-400 pointer-events-none flex-shrink-0" />
              </Button>
              <Input
                type="text"
                label="Matricula do Participante"
                value={registroMatricula}
                onChange={(e) => setregistroMatricula(e.target.value)}
              />
              <Input
                type="text"
                label="Nome do Participante"
                placeholder="Insira o nome do Participante"
                value={registroNomeDoParticipante}
                onChange={(e) => setregistroNomeDoParticipante(e.target.value)}
              />
            </div>

            <div className="flex flex-row gap-4 justify-end">
              <Button color="danger" variant="bordered" onClick={handleCancelBtn}>
                Cancelar
              </Button>
              <Button
                color="primary"
                variant="bordered"
                onClick={handleAddRegistro}
                disabled={participanteRegistrado === true}
              >
                Cadastrar Retirada
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
}

import { ReactNode } from 'react';

export type Registro = {
  id: number;
  nomeDoParticipante: string;
  matriculaDoParticipante: string; // Add this field as per the updated schema
  dataRetirada: string;
  horarioRetirada: string;
  campanha?: {
    nome: string;
  }; // Optional, to reflect that it may not always be present
};

export const columns = [
  {
    key: "nomeDoParticipante",
    label: "Nome do Participante",
    render: (registro: Registro): ReactNode => registro.nomeDoParticipante,
  },
  {
    key: "matriculaDoParticipante",
    label: "Matrícula do Participante", // Added new column for matrícula
    render: (registro: Registro): ReactNode => registro.matriculaDoParticipante,
  },
  {
    key: "dataRetirada",
    label: "Data de Retirada",
    render: (registro: Registro): ReactNode => registro.dataRetirada,
  },
  {
    key: "horarioRetirada",
    label: "Horário de Retirada",
    render: (registro: Registro): ReactNode => registro.horarioRetirada,
  },
  {
    key: "campanha",
    label: "Campanha",
    render: (registro: Registro): ReactNode => registro.campanha?.nome ?? 'N/A', // Safely handle null or undefined campanha
  },
];

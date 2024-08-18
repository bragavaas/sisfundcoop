// RegistroColumns.ts
import { ReactNode } from 'react';

export type Registro = {
  id: number;
  nomeDoParticipante: string;
  campanhaId: number;
  dataRetirada: string;
  horarioRetirada: string;
  campanha: {
    nome: string;
  };
};

export const columns = [
  {
    key: "nomeDoParticipante",
    label: "Nome do Participante",
    render: (registro: Registro): ReactNode => registro.nomeDoParticipante,
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
    render: (registro: Registro): ReactNode => registro.campanha.nome,
  },
];
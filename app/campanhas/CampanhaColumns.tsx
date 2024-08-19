export type Campanha = {
  id: number;
  nome: string;
  dataInicio: string;
  dataTermino: string;
  numeroParticipantes: number;
  brinde: string;
  participantes: Array<{ nome: string; matricula: string }>; // List of participants
};

export const columns = [
  {
    key: "nome",
    label: "Nome",
  },
  {
    key: "dataInicio",
    label: "Data de Início",
  },
  {
    key: "dataTermino",
    label: "Data de Término",
  },
  {
    key: "numeroParticipantes",
    label: "Número de Participantes",
  },
];
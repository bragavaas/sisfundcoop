export type Participante = {
    nome: string;
    matricula: string;
  };
  
  export const columns = [
    {
      key: "nome",
      label: "Nome",
    },
    {
      key: "matricula",
      label: "Matricula",
    }
  ];
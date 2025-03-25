export interface Contato {
  readonly id: number;
  clienteId: number;
  tipo: string;
  valor: string;
  observacao: string;
}

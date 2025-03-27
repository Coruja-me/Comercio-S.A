import { TipoContato } from "../enum/tipo-contato";

export interface Contato {
  readonly id: number;
  clienteId: number;
  tipo?: TipoContato;
  valor: string;
  observacao?: string;
}

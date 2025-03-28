import { DatePipe } from "@angular/common";
import { Endereco } from "./endereco";
import { Contato } from "./contato";

export interface Cliente {
  readonly id: number;
  nome: string;
  cpf: string;
  dataNascimento: Date;
  endereco?: Endereco;
  contatos: Contato[];
}

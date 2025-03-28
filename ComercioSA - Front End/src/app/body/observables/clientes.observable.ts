import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Cliente } from "src/app/modules/home/model/cliente";

@Injectable()
export class ClientesObservable extends Subject<Cliente[]> {

  constructor() {
    super();

  }
}

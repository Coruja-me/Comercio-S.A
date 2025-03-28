import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Contato } from "src/app/modules/home/model/contato";

@Injectable()
export class ContatoObservable extends Subject<Contato> {

  constructor() {
    super();

  }
}

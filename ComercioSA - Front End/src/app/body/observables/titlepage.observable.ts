import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class TitlePageObservable extends Subject<string> {

  constructor() {
    super();

  }
}

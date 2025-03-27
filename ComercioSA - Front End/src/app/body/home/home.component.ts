import { Component, EventEmitter, Output } from '@angular/core';
import { TitlePageObservable } from '../observables/titlepage.observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private titlePageObs: TitlePageObservable) { }

  ngOnInit(): void {
    this.titlePageObs.next("Home");
  }
}

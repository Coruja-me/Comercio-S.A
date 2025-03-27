import { Component } from '@angular/core';
import { TitlePageObservable } from '../observables/titlepage.observable';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  constructor(private titlePageObs: TitlePageObservable) { }

  ngOnInit(): void {
    this.titlePageObs.next("Sobre");
  }
}

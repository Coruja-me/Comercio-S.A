import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { TitlePageObservable } from './observables/titlepage.observable';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit, OnDestroy {
  titlePage: string = '';
  subscription: Subscription = new Subscription();

  constructor(private titlePageObs: TitlePageObservable) { }

  ngOnDestroy(): void {
    if(this.subscription) this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.titlePageObs.subscribe((title: string) => {
        this.titlePage = title;
      })
    )
  }
}

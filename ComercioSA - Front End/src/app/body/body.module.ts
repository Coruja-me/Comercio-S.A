import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BodyComponent } from './body.component';
import { BodyRoutingModule } from './body-routing.module';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { TitlePageObservable } from './observables/titlepage.observable';
import { ListaContatosComponent } from './lista-contatos/lista-contatos.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    BodyComponent,
    ListaClientesComponent,
    ListaContatosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BodyRoutingModule
  ],
  exports: [
    BodyComponent
  ],
  providers: [
    TitlePageObservable
  ]
})
export class BodyModule { }

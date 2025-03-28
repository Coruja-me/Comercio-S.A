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
import { ClienteObservable } from './observables/cliente.observable';
import { ContatoObservable } from './observables/contato.observable';
import { ClientesObservable } from './observables/clientes.observable';
import { ContatosObservable } from './observables/contatos.observable';

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
    TitlePageObservable,
    ClienteObservable,
    ContatoObservable,
    ClientesObservable,
    ContatosObservable
  ]
})
export class BodyModule { }

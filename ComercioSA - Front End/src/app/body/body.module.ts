import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BodyComponent } from './body.component';
import { BodyRoutingModule } from './body-routing.module';

@NgModule({
  declarations: [
    ListaClientesComponent,
    HomeComponent,
    AboutComponent,
    BodyComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BodyRoutingModule
  ],
  exports: [
    BodyComponent
  ]
})
export class BodyModule { }

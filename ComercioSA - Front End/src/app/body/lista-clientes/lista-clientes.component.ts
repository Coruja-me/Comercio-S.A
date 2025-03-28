import { ClienteObservable } from './../observables/cliente.observable';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { lastValueFrom, Subscription } from 'rxjs';
import { Cliente } from 'src/app/modules/home/model/cliente';
import { ClienteService } from 'src/app/modules/home/services/cliente.service';
import { TitlePageObservable } from '../observables/titlepage.observable';
import { ClientesObservable } from '../observables/clientes.observable';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss'],
})
export class ListaClientesComponent implements OnInit, OnDestroy {
  clientes: Cliente[] = [];

  clientesSub: Subscription = new Subscription();


  constructor(
    private service: ClienteService,
    private titlePageObs: TitlePageObservable,
    private csObs: ClientesObservable,
    private cObs: ClienteObservable
  ) {
    this.clientesSub = csObs.subscribe(c => this.clientes = c);
  }
  ngOnDestroy(): void {
    if(this.clientesSub) {
      this.clientesSub.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.getClientes();
    this.titlePageObs.next("Lista de Clientes e Contatos");
  }
  getClientes(): void {
    this.service.findAll().subscribe((clientesData) => {
      this.clientes = clientesData;
    });
  }

  public async deleteCliente(cliente: Cliente) {
    try {
      const confirmar = confirm("Deseja deletar esse cliente?");
      if (!confirmar) return;
      await lastValueFrom(this.service.delete(cliente.id));
      alert('Cliente deletado!')
      this.getClientes();
    } catch (err) {
      alert("Erro ao deletar!")
      console.error(err);
    }
  }

  handleClienteEdited(cliente: Cliente): void {
    this.cObs.next(cliente);
  }

}


import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { lastValueFrom, Subscription } from 'rxjs';
import { Contato } from 'src/app/modules/home/model/contato';
import { ContatoService } from 'src/app/modules/home/services/contato.service';
import { Cliente } from 'src/app/modules/home/model/cliente';
import { FormInput } from 'src/app/shared/form/form-input';
import { TipoContato } from 'src/app/modules/home/enum/tipo-contato';
import { ContatoObservable } from '../observables/contato.observable';
import { ContatosObservable } from '../observables/contatos.observable';

@Component({
  selector: 'app-lista-contatos',
  templateUrl: './lista-contatos.component.html',
  styleUrls: ['./lista-contatos.component.scss']
})
export class ListaContatosComponent implements OnChanges, OnDestroy {
  @Input() cliente!: Cliente;
  contatos: Contato[] = [];
  contatosSub: Subscription = new Subscription();
  
  showOverlayActions: boolean = false;
  
  tipoContato = Object.values(TipoContato).map(tipo => ({label: tipo, value: tipo}))
  
  constructor(
    private service: ContatoService,
    private cObs: ContatoObservable,
    private csObs: ContatosObservable
  ) {
    this.contatosSub = csObs.subscribe(c => this.contatos = c);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["cliente"].currentValue) this.getContatos();
  }
  getContatos(): void {
    this.service.findByCliente(this.cliente.id).subscribe(
      (contatosData) => this.contatos = contatosData,
      (err) => console.error(err)
    );
  }
  ngOnDestroy(): void {
    if(this.contatosSub) {
      this.contatosSub.unsubscribe();
    }
  }
  
  public async deleteContato(contato: Contato) {
    try {
      const confirmar = confirm("Deseja deletar esse contato?");
      if (!confirmar) return;
      await lastValueFrom(this.service.delete(contato.id));
      alert('Contato deletado!')
      this.getContatos();
    } catch (err) {
      alert("Erro ao deletar!")
      console.error(err);
    }
  }
  toggleOverlayActions(): void {
    this.showOverlayActions = !this.showOverlayActions;
  }

  handleContatoEdited(contato: Contato): void {
    this.cObs.next(contato);
  }
}

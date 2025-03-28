import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { lastValueFrom, Subscription } from 'rxjs';
import { TitlePageObservable } from './observables/titlepage.observable';
import { Cliente } from '../modules/home/model/cliente';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { Endereco } from '../modules/home/model/endereco';
import { FormInput } from '../shared/form/form-input';
import { TipoContato } from '../modules/home/enum/tipo-contato';
import { Contato } from '../modules/home/model/contato';
import { ListaContatosComponent } from './lista-contatos/lista-contatos.component';
import { RouterOutlet } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ShowOverlay } from '../shared/interface/ShowOverlay';
import { ClienteObservable } from './observables/cliente.observable';
import { ContatoObservable } from './observables/contato.observable';
import { ContatoService } from '../modules/home/services/contato.service';
import { ClienteService } from '../modules/home/services/cliente.service';
import { ClientesObservable } from './observables/clientes.observable';
import { ContatosObservable } from './observables/contatos.observable';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit, OnDestroy, AfterViewInit {
  titlePage: string = '';
  subscription: Subscription = new Subscription();

  editCliente: Subscription = new Subscription();
  editContato: Subscription = new Subscription();

  showOverlay: ShowOverlay = {
    createCliente: false,
    createContato: false,
    editCliente: false,
    editContato: false
  };

  tipoContato = Object.values(TipoContato).map(tipo => ({label: tipo, value: tipo}))

  cliente: Cliente = {
    id: 0,
    nome: '',
    cpf: '',
    dataNascimento: new Date,
    endereco: {
      logradouro: '',
      cep: '',
      bairro: '',
      estado: '',
      cidade: '',
      numero: ''
    } as Endereco,
    contatos: []
  };
  contato: Contato = {
    id: 0,
    clienteId: 0,
    tipo: undefined,
    valor: '',
    observacao: undefined
  }

  clienteFormFields: FormInput[] = [
    {
      name: 'nome', label: 'Nome', type: 'text', placeholder: 'John Doe', required: true,
    },
    {
      name: 'dataNascimento', label: 'Data de Nascimento', type: 'date', placeholder: 'dd/mm/yyyy', required: true,
    },
    {
      name: 'cpf', label: 'CPF', type: 'text', placeholder: '123.456.789-00', required: true, pattern: '\\d{3}\\.\\d{3}\\.\\d{3}\\-\\d{2}',
    }
  ]
  contatoFormFields: FormInput[] = [
    {
      name: 'clienteId', label: 'ID do Cliente', type: 'number', placeholder: 'John Doe', required: true,
    },
    {
      name: 'tipo', label: 'Tipo de Contato', type: 'select', placeholder: 'Selecione um tipo', required: true, options: this.tipoContato
    },
    {
      name: 'valor', label: 'Valor', type: 'text', placeholder: '', required: true,
    },
    {
      name: 'observacao', label: 'Observação', type: 'text', placeholder: 'Número de emergência', required: false,
    },
  ]

  constructor(
    private titlePageObs: TitlePageObservable,
    private clienteObs: ClienteObservable,
    private contatoObs: ContatoObservable,
    private contatoService: ContatoService,
    private clienteService: ClienteService,
    private clientesObs: ClientesObservable,
    private contatosObs: ContatosObservable
  ) { }

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
  ngAfterViewInit() {
    this.editCliente = this.clienteObs.subscribe(c => {
      this.cliente = c;
      this.switchOverlay('editCliente');
    })

    this.editContato = this.contatoObs.subscribe(con => {
      this.contato = con;
      this.switchOverlay('editContato');
    })
  }

  switchOverlay(options: string) {
    this.showOverlay[options] = !this.showOverlay[options];


    Object.keys(this.showOverlay).forEach(k => {
      if (k != options) {
        this.showOverlay[k] = false;
      }
    });

  }

  resetOverlays() {
    Object.keys(this.showOverlay).forEach(k => {
        this.showOverlay[k] = false;
    });
  }

  addCliente(event: {model: Cliente, form: NgForm}) {
    this.postCliente(event);
  }
  getClientes(): void {
    this.clienteService.findAll().subscribe(
      clientesData => this.clientesObs.next(clientesData),
      err => console.error(err)      
    );
  }
  updateCliente(event: {model: Cliente, form: NgForm}) {
    this.putCliente(event)
  }
  async postCliente(event: {model: Cliente, form: NgForm}) {
    try {
      const newCliente = await lastValueFrom(this.clienteService.create(event.model));

      if(newCliente) {
        alert("Cliente cadastrado!");
        this.getClientes();
        console.log(newCliente);
        this.resetOverlays();
        event.form.resetForm();
      } else {
        alert("Cliente não cadastrado, ocorreu um erro!");
      }
    } catch (error) {
      alert("Ocorreu um erro");
      console.error(error);
    }
  }

  async putCliente(event: {model: Cliente, form: NgForm}) {
    try {
      await lastValueFrom(this.clienteService.update(event.model.id, event.model));
      alert('Cliente atualizado!')
      this.getClientes();
      this.resetOverlays();
      event.form.resetForm();
    } catch (error) {
      alert('Erro ao atualizar o cliente!');
      console.error(error)
    }
  }

  addContato(event: {model: Contato, form: NgForm}) {
    this.postContato(event);
  }
  getContatos(): void {
    this.contatoService.findByCliente(this.cliente.id).subscribe(
      contatosData => this.contatosObs.next(contatosData),
      err => console.error(err)
    );
  }
  updateContato(event: {model: Contato, form: NgForm}) {
    this.putContato(event);
  }

  public async postContato(event: {model: Contato; form: NgForm}) {
    try {
      const newContato = await lastValueFrom(this.contatoService.create(event.model));

      if(newContato) {
        alert("Contato cadastrado!");
        this.getContatos();
        this.getClientes();
        console.log(newContato);
        this.resetOverlays();
        event.form.resetForm();
      } else {
        alert("Contato não cadastrado, ocorreu um erro!");
      }
    } catch (error) {
      alert("Ocorreu um erro");
      console.error(error);
    }
  }
  public async putContato(event: {model: Contato; form: NgForm}) {
    try {
      await lastValueFrom(this.contatoService.update(event.model.id, event.model));
      alert('Contato atualizado!')
      this.getContatos();
      this.getClientes();
      this.resetOverlays();
      event.form.resetForm();
    } catch (error) {
      alert('Erro ao atualizar o contato!');
      console.error(error)
    }
  }
}

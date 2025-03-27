import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Cliente } from 'src/app/modules/home/model/cliente';
import { Contato } from 'src/app/modules/home/model/contato';
import { Endereco } from 'src/app/modules/home/model/endereco';
import { ClienteService } from 'src/app/modules/home/services/cliente.service';
import { ContatoService } from 'src/app/modules/home/services/contato.service';
import { TitlePageObservable } from '../observables/titlepage.observable';
import { FormInput } from 'src/app/shared/form/form-input';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss'],
})
export class ListaClientesComponent implements OnInit {
  cliente!: Cliente;
  clientes: Cliente[] = [];

  showOverlayCreate: boolean = false;
  showOverlayFind: boolean = false;
  showOverlayEdit: boolean = false;

  contato!: Contato;
  contatos: Contato[] = [];

  clienteFormFields: FormInput[] = [
    {
      name: 'nome', label: 'Nome', type: 'text', placeholder: 'John Doe', required: true,
    },
    {
      name: 'dataNascimento', label: 'Data de Nascimento', type: 'date', placeholder: 'dd/mm/yyyy', required: true,
    },
    {
      name: 'cpf', label: 'CPF', type: 'text', placeholder: '123.456.789-00', required: true, pattern: '\\d{3}\\.\\d{3}\\.\\d{3}\\-\\d{2}',
    },
    {
      name: 'endereco.logradouro', label: 'Logradouro', type: 'text', placeholder: 'Rua dos Bobos, Av. Paulista', required: false,
    },
    {
      name: 'endereco.cep', label: 'CEP', type: 'text', placeholder: '12345-000', required: false, pattern: '\\d{5}-\\d{3}',
    },
    {
      name: 'endereco.bairro', label: 'Bairro', type: 'text', placeholder: 'Vila Mara', required: false,
    },
    {
      name: 'endereco.estado', label: 'Estado', type: 'text', placeholder: 'SP', required: false, minlength: 2, maxlength: 2, pattern: '^[A-Z]{2}$'
    },
    {
      name: 'endereco.cidade', label: 'Cidade', type: 'text', placeholder: 'São Paulo', required: false,
    },
    {
      name: 'endereco.numero', label: 'Número', type: 'number', placeholder: '100', required: false
    }
  ]
  ngOnInit(): void {
    this.getClientes();
    this.titlePageObs.next("Lista de Clientes e Contatos");
  }
  getClientes(): void {
    this.service.findAll().subscribe((clientesData) => {
      this.clientes = clientesData;
    });
  }
  constructor(private service: ClienteService, private titlePageObs: TitlePageObservable) {
    this.cliente = {
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
    this.contato = {
      id: 0,
      clienteId: 0,
      tipo: undefined,
      valor: '',
      observacao: undefined
    }
  }
  public async addCliente({model, form}: {model: Cliente; form: NgForm}) {
    try {
      const newCliente = await lastValueFrom(this.service.create(model));

      if(newCliente) {
        alert("Cliente cadastrado!");
        this.getClientes();
        console.log(newCliente);
        form.resetForm()
      } else {
        alert("Cliente não cadastrado, ocorreu um erro!");
      }
    } catch (error) {
      alert("Ocorreu um erro");
      console.error(error);
    }
  }
  public async updateCliente({model, form}: {model: Cliente; form: NgForm}) {
    try {
      await lastValueFrom(this.service.update(model.id, model));
      alert('Cliente atualizado!')
      this.getClientes();
      this.toggleOverlayEdit();
      form.resetForm();
    } catch (error) {
      alert('Erro ao atualizar o cliente!');
      console.error(error)
    }
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

  toggleOverlayCreate() {
    this.showOverlayCreate = !this.showOverlayCreate;
    if (this.showOverlayCreate) this.showOverlayEdit = false;
  }
  toggleOverlayFind() {
    this.showOverlayFind = !this.showOverlayFind;
  }
  toggleOverlayEdit() {
    this.showOverlayEdit = !this.showOverlayEdit;
    if (this.showOverlayEdit) this.showOverlayCreate = false;
  }

  handleClienteEdited(item: Cliente): void {
    this.cliente = { ...item };
    this.toggleOverlayEdit();
  }
}


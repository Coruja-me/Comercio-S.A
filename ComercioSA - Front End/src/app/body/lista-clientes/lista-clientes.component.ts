import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Cliente } from 'src/app/modules/home/model/cliente';
import { Contato } from 'src/app/modules/home/model/contato';
import { Endereco } from 'src/app/modules/home/model/endereco';
import { ClienteService } from 'src/app/modules/home/services/cliente.service';
import { ContatoService } from 'src/app/modules/home/services/contato.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss']
})
export class ListaClientesComponent implements OnInit {
  cliente!: Cliente;
  clientes: Cliente[] = [];
  clientesFilter: Cliente[] = [];
  showOverlayCreate: boolean = false;
  showOverlayFind: boolean = false;
  showOverlayEdit: boolean = false;

  contato!: Contato;
  contatos: Contato[] = [];

  @Output() itemEdited: any;
  itemDeleted: any;

  editItem(item: any): void{
    this.itemEdited.emit(item);
  }
  deleteItem(item: any): void{
    this.itemDeleted.emit(item);
  }
  ngOnInit(): void {
    this.getClientes();
  }
  getClientes(): void {
    this.service.findAll().subscribe((clientesData) => {
      this.clientes = clientesData;
      this.clientesFilter = clientesData;

      this.getContatos();
    });
  }
  getContatos(): void {
    const contactRequests = this.clientes.map(cliente =>
      this.contatoService.findByCliente(cliente.id).toPromise().then(contatos => {
        cliente.contatos = contatos || [];
      })
    );

    Promise.all(contactRequests).then(() => {
      console.log('Todos os contatos foram carregados!');
    }).catch(err => {
      console.error('Erro ao carregar os contatos:', err);
    });
  }
  constructor(private service: ClienteService, private contatoService: ContatoService) {
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

  filtroChoose(evento: {tipo: string, valor: string}) {
    if (!evento.tipo || !evento.valor) {
      this.clientesFilter = [...this.clientes];
      return;
    }

    switch (evento.tipo) {
      case 'id':
        const id = Number(evento.valor);
        this.service.findById(id).subscribe(
          (cliente) => {
            this.clientesFilter = cliente ? [cliente] : [];
          },
          (err) => {
            console.error("Erro ao buscar ID:", err);
            this.clientesFilter = [];
          }
        );
        break;

      case 'nome':
        this.service.findByNome(evento.valor).subscribe(
          (cliente) => {
            this.clientesFilter = cliente ? [cliente] : [];
          },
          (err) => {
            console.error("Erro ao buscar Nome:", err);
            this.clientesFilter = [];
          }
        );
        break;

      case 'cpf':
        this.service.findByCpf(evento.valor).subscribe(
          (cliente) => {
            this.clientesFilter = cliente ? [cliente] : [];
          },
          (err) => {
            console.error("Erro ao buscar CPF:", err);
            this.clientesFilter = [];
          }
        );
        break;

      default:
        this.clientesFilter = [...this.clientes];
        break;
    }
  }
  handleItemEdited(item: Cliente): void {
    this.cliente = { ...item };
    this.toggleOverlayEdit();
  }
}

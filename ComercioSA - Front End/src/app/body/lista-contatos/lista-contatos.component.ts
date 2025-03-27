import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Contato } from 'src/app/modules/home/model/contato';
import { Endereco } from 'src/app/modules/home/model/endereco';
import { ContatoService } from 'src/app/modules/home/services/contato.service';
import { TitlePageObservable } from '../observables/titlepage.observable';
import { Cliente } from 'src/app/modules/home/model/cliente';
import { FormInput } from 'src/app/shared/form/form-input';

@Component({
  selector: 'app-lista-contatos',
  templateUrl: './lista-contatos.component.html',
  styleUrls: ['./lista-contatos.component.scss']
})
export class ListaContatosComponent implements OnChanges, OnInit {
  contato!: Contato;
  contatos: Contato[] = [];

  showOverlayCreate: boolean = false;
  showOverlayFind: boolean = false;
  showOverlayEdit: boolean = false;

  @Input() cliente!: Cliente;

  contatoFormFields: FormInput[] = [
    {
      name: 'clienteId', label: 'ID do Cliente', type: 'number', placeholder: 'John Doe', required: true,
    },
    {
      name: 'dataNascimento', label: 'Data de Nascimento', type: 'date', placeholder: 'dd/mm/yyyy', required: true,
    },
    {
      name: 'cpf', label: 'CPF', type: 'text', placeholder: '123.456.789-00', required: true, pattern: '\\d{3}\\.\\d{3}\\.\\d{3}\\-\\d{2}',
    },
  ]
  ngOnInit(): void {
    this.titlePageObs.next("Lista de Contatos e Contatos");
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["cliente"].currentValue) this.getContatos();
  }
  getContatos(): void {
    this.service.findByCliente(this.cliente.id).subscribe((contatosData) => {
      this.contatos = contatosData;
    });

    Promise.all(this.contatos).then(() => {
      console.log('Todos os contatos foram carregados!');
    }).catch(err => {
      console.error('Erro ao carregar os contatos:', err);
    });
  }
  constructor(private service: ContatoService, private titlePageObs: TitlePageObservable) {
    this.contato = {
      id: 0,
      clienteId: 0,
      tipo: undefined,
      valor: '',
      observacao: undefined
    }
  }
  public async addContato({model, form}: {model: Contato; form: NgForm}) {
    try {
      const newContato = await lastValueFrom(this.service.create(model));

      if(newContato) {
        alert("Contato cadastrado!");
        this.getContatos();
        console.log(newContato);
        form.resetForm()
      } else {
        alert("Contato não cadastrado, ocorreu um erro!");
      }
    } catch (error) {
      alert("Ocorreu um erro");
      console.error(error);
    }
  }
  public async updateContato({model, form}: {model: Contato; form: NgForm}) {
    try {
      await lastValueFrom(this.service.update(model.id, model));
      alert('Contato atualizado!')
      this.getContatos();
      this.toggleOverlayEdit();
      form.resetForm();
    } catch (error) {
      alert('Erro ao atualizar o contato!');
      console.error(error)
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

  handleContatoEdited(item: Contato): void {
    this.contato = { ...item };
    this.toggleOverlayEdit();
  }
}

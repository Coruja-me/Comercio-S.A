import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormInput } from './form-input';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() model: any;
  @Input() formFields: FormInput[] = [];
  @Input() formEndereco: boolean = false;
  @Output() formSubmit = new EventEmitter<{model: any, form: NgForm}>();


  enderecoFormFields: FormInput[] = [
    {
      name: 'logradouro', label: 'Logradouro', type: 'text', placeholder: 'Rua dos Bobos, Av. Paulista', required: true,
    },
    {
      name: 'cep', label: 'CEP', type: 'text', placeholder: '12345-000', required: true, pattern: '\\d{5}-\\d{3}',
    },
    {
      name: 'bairro', label: 'Bairro', type: 'text', placeholder: 'Vila Mara', required: true,
    },
    {
      name: 'estado', label: 'Estado', type: 'text', placeholder: 'SP', required: true, minlength: 2, maxlength: 2, pattern: '^[A-Z]{2}$'
    },
    {
      name: 'numero', label: 'Número', type: 'number', placeholder: '100', required: true
    }
  ]

  validFormEndereco(){
    if (this.formEndereco === false) {
      this.enderecoFormFields = [
        {
          name: 'logradouro', label: 'Logradouro', type: 'text', placeholder: 'Rua dos Bobos, Av. Paulista', required: false,
        },
        {
          name: 'cep', label: 'CEP', type: 'text', placeholder: '12345-000', required: false, pattern: '\\d{5}-\\d{3}',
        },
        {
          name: 'bairro', label: 'Bairro', type: 'text', placeholder: 'Vila Mara', required: false,
        },
        {
          name: 'estado', label: 'Estado', type: 'text', placeholder: 'SP', required: false, minlength: 2, maxlength: 2, pattern: '^[A-Z]{2}$'
        },
        {
          name: 'numero', label: 'Número', type: 'number', placeholder: '100', required: false
        }
      ]
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      alert("Há registros pendentes!");
      return;
    }
    this.formSubmit.emit({model: this.model, form});
  }


}

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

  onSubmit(form: NgForm) {
    if (form.invalid) {
      alert("Há registros pendentes!");
      return;
    }
    this.formSubmit.emit({model: this.model, form});
  }


}

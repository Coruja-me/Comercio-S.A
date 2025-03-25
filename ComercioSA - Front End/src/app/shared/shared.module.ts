import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './logo/logo.component';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { FormComponent } from './form/form.component';



@NgModule({
  declarations: [HeaderComponent, LogoComponent, ButtonComponent, FormComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    FormComponent,
    ButtonComponent
  ]
})
export class SharedModule { }

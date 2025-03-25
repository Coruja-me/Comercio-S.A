import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() typeBtn: string = '';
  @Input() routerLink: string = '';
  @Input() disabled: boolean | null = false ;
  @Output() onClick = new EventEmitter<MouseEvent>();

  constructor(private router: Router) {}

  onClickBtn(event: any) {
    this.onClick.emit(event);
  }

  getClassBtn(): string {
    const base = `btn ${this.typeBtn}`
    return base
  }
  navigateRoutes() {
    if (this.routerLink && this.routerLink.length ) { this.router.navigate([this.routerLink]); }
  }
}

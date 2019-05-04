import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuDirective } from './menu.directive';

@NgModule({
  declarations: [MenuDirective],
  imports: [
    CommonModule
  ],
  exports:[
    MenuDirective
  ]
})
export class MatMenuModule { }

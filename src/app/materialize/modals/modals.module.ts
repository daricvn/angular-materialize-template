import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalsDirective } from './modals.directive';

@NgModule({
  declarations: [ModalsDirective],
  imports: [
    CommonModule
  ],
  exports:[
    ModalsDirective
  ]
})
export class MatModalsModule { }

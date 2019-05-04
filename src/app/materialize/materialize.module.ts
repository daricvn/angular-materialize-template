import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from './menu/menu.module';
import { MatModalsModule } from './modals/modals.module';
import { MatParallaxModule } from './parallax/parallax.module';
import { MatTooltipsModule } from './tooltips/tooltips.module';
import { MatButtonModule } from './button/button.module';
import { MatSelectModule } from './select/select.module';

@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatModalsModule,
    MatParallaxModule,
    MatTooltipsModule,
    MatSelectModule,
    MatButtonModule
  ],
  exports:[
    MatMenuModule,
    MatModalsModule,
    MatParallaxModule,
    MatTooltipsModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class MaterializeModule { }

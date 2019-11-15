import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardComponent} from './components/card/card.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [CardComponent, ModalComponent],
  imports: [
    CommonModule
  ],
  exports: [CardComponent, ModalComponent]
})
export class CommonComponentsModule {
}

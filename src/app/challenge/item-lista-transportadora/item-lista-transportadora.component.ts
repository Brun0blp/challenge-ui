import { Component, Input } from '@angular/core';
import { Transportadora } from '../shared/model/transportadora';

@Component({
  selector: 'app-item-lista-transportadora',
  templateUrl: './item-lista-transportadora.component.html',
  styleUrls: ['./item-lista-transportadora.component.scss']
})
export class ItemListaTransportadoraComponent {

  @Input()
  transportadora: Transportadora;

  constructor() { }

  formatarFones(fone: string): string {
    const tamanho = fone.length;
    return `(${fone.substring(0, 2)}) ${fone.substring(2, tamanho)}`;
  }

}

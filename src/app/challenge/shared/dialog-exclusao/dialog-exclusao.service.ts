import { Injectable } from '@angular/core';
import { TransportadoraRepository } from '../transportadora.repository';
import { Observable } from 'rxjs';
import { Transportadora } from '../model/transportadora';

@Injectable()
export class DialogExclusaoService {

  constructor(private _repository: TransportadoraRepository) { }

  excluir(transportadora: Transportadora): Observable<void> {
    return this._repository.excluir(transportadora.id);
  }
}

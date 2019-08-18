import { Injectable } from '@angular/core';
import { TransportadoraRepository } from './transportadora.repository';
import { Observable } from 'rxjs';
import { Transportadora } from './model/transportadora';

@Injectable()
export class TransportadoraService {

  constructor(private _respository: TransportadoraRepository) { }

  listar(): Observable<Transportadora[]> {
    return this._respository.listarTransportadoras();
  }

  detalhar(): Observable<Transportadora> {return null; }

  cadastrar(transportadora: Transportadora): Observable<Transportadora> {
    return this._respository.cadastrar(transportadora);
  }
}

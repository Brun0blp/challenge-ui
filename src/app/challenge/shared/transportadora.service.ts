import { Injectable } from '@angular/core';
import { TransportadoraRepository, FiltrosDaListaDeTransportadoras } from './transportadora.repository';
import { Observable } from 'rxjs';
import { Transportadora } from './model/transportadora';
import { MatDialog } from '@angular/material/dialog';
import { DialogExclusaoComponent } from './dialog-exclusao/dialog-exclusao.component';

@Injectable()
export class TransportadoraService {

  constructor(private _respository: TransportadoraRepository, private _dialog: MatDialog) { }

  listar(filtros: FiltrosDaListaDeTransportadoras): Observable<Transportadora[]> {
    return this._respository.listarTransportadoras(filtros);
  }

  detalhar(id: number): Observable<Transportadora> {
    return this._respository.detalhar(id);
  }

  cadastrar(transportadora: Transportadora): Observable<Transportadora> {
    return this._respository.cadastrar(transportadora);
  }

  atualizar(transportadora: Transportadora): Observable<Transportadora> {
    return this._respository.atualizar(transportadora);
  }

  iniciarExclusao(transportadora: Transportadora): Observable<boolean> {
    const data = { transportadora };
    return this._dialog.open(DialogExclusaoComponent, { data }).afterClosed();
  }
}

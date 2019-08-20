import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transportadora } from './model/transportadora';
import { TipoUf } from './model/tipo-uf.enum';
import { TipoModal } from './model/tipo-modal.enum';
import { ContadorUf } from './model/contador-uf';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUri = '/api/transportadoras';

export interface FiltrosDaListaDeTransportadoras {

    q?: string;

    cidade?: string;

    estado?: TipoUf;

    modal?: TipoModal;
}

@Injectable()
export class TransportadoraRepository {

    constructor(private _http: HttpClient) { }

    listarTransportadoras(filtros: FiltrosDaListaDeTransportadoras): Observable<Transportadora[]> {
        return this._http.get<Transportadora[]>(apiUri, { params: {...this._setFiltros(filtros)} });
    }

    contarUfs(): Observable<ContadorUf[]> {
      const uri = apiUri + '/ufs';
      return this._http.get<ContadorUf[]>(uri);
    }

    detalhar(transportadoraId: number): Observable<Transportadora> {
        const uri = apiUri + '/' + transportadoraId;
        return this._http.get<Transportadora>(uri);
    }

    cadastrar(transportadora: Transportadora): Observable<Transportadora> {
        return this._http.post<Transportadora>(apiUri, transportadora, httpOptions);
    }

    atualizar(transportadora: Transportadora): Observable<Transportadora> {
        const uri = apiUri + '/' + transportadora.id;
        return this._http.put<Transportadora>(uri, transportadora, httpOptions);
    }

    excluir(transportadoraId: number): Observable<void> {
        const uri = apiUri + '/' + transportadoraId;
        return this._http.delete<void>(uri, httpOptions);
    }

    private _setFiltros(filtros: FiltrosDaListaDeTransportadoras): FiltrosDaListaDeTransportadoras {
        const { q, cidade, estado, modal } = filtros;
        let novoFiltro = {};

        if (q) {
            novoFiltro = {q, ...novoFiltro };
        }

        if (cidade) {
            novoFiltro = {cidade, ...novoFiltro };
        }

        if (estado) {
            novoFiltro = {estado, ...novoFiltro };
        }

        if (modal) {
            novoFiltro = {modal, ...novoFiltro };
        }

        return novoFiltro;
    }

}

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transportadora } from './model/transportadora';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUri = '/api/transportadoras/';

@Injectable()
export class TransportadoraRepository {

    constructor(private _http: HttpClient) { }

    listarTransportadoras(): Observable<Transportadora[]> {
        return this._http.get<Transportadora[]>(apiUri);
    }

    detalhar(transportadoraId: number): Observable<Transportadora> {
        return this._http.get<Transportadora>(apiUri + transportadoraId);
    }

    cadastrar(transportadora: Transportadora): Observable<Transportadora> {
        return this._http.post<Transportadora>(apiUri, transportadora, httpOptions);
    }

    atualizar(transportadora: Transportadora): Observable<Transportadora> {
        return this._http.put<Transportadora>(apiUri + transportadora.id, transportadora, httpOptions);
    }

    excluir(transportadoraId: number): Observable<void> {
        return this._http.delete<void>(apiUri + transportadoraId, httpOptions);
    }

}

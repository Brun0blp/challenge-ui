import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Transportadora } from './model/transportadora';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUri = '/api/transportadoras';

@Injectable()
export class TransportadoraRepository {

    constructor(private _http: HttpClient) { }

    listarTransportadoras(): Observable<Transportadora[]> {
        return this._http.get<Transportadora[]>(apiUri);
    }

    detalhar(): Observable<Transportadora> {
        return null;
    }

    cadastrar(transportadora: Transportadora): Observable<Transportadora> {
        return this._http.post<Transportadora>(apiUri, transportadora, httpOptions);
    }


    private _handleError<T>(operacao = 'operacao', resultado?: T) {
        return (error: any): Observable<T> => {
            return of(resultado as T);
        };
    }

}

import { Component, OnInit } from '@angular/core';
import { TransportadoraService } from './shared/transportadora.service';
import { Transportadora } from './shared/model/transportadora';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {

  listaDeTransportadoras: Transportadora[];

  filtros: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _service: TransportadoraService,
    private _snackBar: MatSnackBar) {

      this.filtros = this._fb.group({
        q: null,
        cidade: null,
        estado: null,
        modal: null,
      });

    }

  ngOnInit() {

    this._service.listar(this.filtros.value)
      .subscribe({
        next: lista => this.listaDeTransportadoras = lista,
        error: err =>  this._snackBar.open('Erro ao obter lista de transportadoras', '', { duration: 4000 })
      });

    this.filtros.valueChanges
      .pipe(debounceTime(1000))
      .pipe(switchMap(filtros => this._service.listar(filtros)))
      .subscribe({
        next: lista => this.listaDeTransportadoras = lista,
        error: err =>  this._snackBar.open('Erro ao obter lista de transportadoras', '', { duration: 4000 })
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { TransportadoraService } from './shared/transportadora.service';
import { Transportadora } from './shared/model/transportadora';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {

  listaDeTransportadoras: Transportadora[];

  filtros: FormGroup;

  constructor(
    private _router: Router,
    private _service: TransportadoraService) { }

  ngOnInit() {
    this._service.listar()
      .subscribe({
        next: lista => this.listaDeTransportadoras = lista,
        error: err => console.log(err)
      });
  }

}

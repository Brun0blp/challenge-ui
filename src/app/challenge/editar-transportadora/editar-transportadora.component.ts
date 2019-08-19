import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransportadoraService } from '../shared/transportadora.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Transportadora } from '../shared/model/transportadora';
import { Endereco } from '../shared/model/endereco';
import { switchMap, filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-editar-transportadora',
  templateUrl: './editar-transportadora.component.html',
  styleUrls: ['./editar-transportadora.component.scss']
})
export class EditarTransportadoraComponent implements OnInit {

  formDeEdicao: FormGroup;

  transportadora: Transportadora;

  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _service: TransportadoraService,
    private _snackBar: MatSnackBar,
  ) {

    this.formDeEdicao = this._fb.group({
      nome: [null, Validators.required],
      empresa: [null, [Validators.required, Validators.minLength(4)]],
      email: [null, Validators.email],
      telefoneCodigo: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      telefoneNumero: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      celularCodigo: [null, Validators.pattern('^[0-9]*$')],
      celularNumero: [null, Validators.pattern('^[0-9]*$')],
      whatsAppCodigo: [null, Validators.pattern('^[0-9]*$')],
      whatsAppNumero: [null, Validators.pattern('^[0-9]*$')],
      modal: [null, Validators.required],
      cep: [null, Validators.pattern('^[0-9]*$')],
      estado: [null, Validators.required],
      cidade: [null, Validators.required],
      bairro: [null, Validators.required],
      rua: [null, Validators.required],
      numero: [null, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {

    this._route.paramMap
      .pipe(switchMap(params => {
        return this._service.detalhar(+params.get('transportadoraId'));
      }))
      .subscribe({
        next: transportadora => {
          this.transportadora = transportadora;
          this._inicializarFormulario();
        },
        error: err => this._snackBar.open('Erro ao obter detalhes da transportadora', '', { duration: 4000 })
      });

  }

  private _inicializarFormulario() {
    this.formDeEdicao.setValue({
      nome: this.transportadora.nome && this.transportadora.nome,
      empresa: this.transportadora.empresa && this.transportadora.empresa,
      email: this.transportadora.email && this.transportadora.email,
      telefoneCodigo: this.transportadora.telefone && this.transportadora.telefone !== '0' ?
        `${ this.transportadora.telefone.substring(0, 2) }` : null,
      telefoneNumero: this.transportadora.telefone && this.transportadora.telefone !== '0' ?
        `${ this.transportadora.telefone.substring(2, this.transportadora.telefone.length) }` : null,
      celularCodigo: this.transportadora.celular && this.transportadora.celular !== '0' ?
        `${ this.transportadora.celular.substring(0, 2) }` : null,
      celularNumero: this.transportadora.celular && this.transportadora.celular !== '0' ?
        `${ this.transportadora.celular.substring(2, this.transportadora.celular.length) }` : null,
      whatsAppCodigo: this.transportadora.whatsApp && this.transportadora.whatsApp !== '0' ?
        `${ this.transportadora.whatsApp.substring(0, 2) }` : null,
      whatsAppNumero: this.transportadora.whatsApp && this.transportadora.whatsApp !== '0' ?
        `${ this.transportadora.whatsApp.substring(2, this.transportadora.whatsApp.length) }` : null,
      modal: this.transportadora.modal && this.transportadora.modal,
      cep: this.transportadora.endereco.cep && this.transportadora.endereco.cep,
      estado: this.transportadora.endereco.estado && this.transportadora.endereco.estado,
      cidade: this.transportadora.endereco.cidade && this.transportadora.endereco.cidade,
      bairro: this.transportadora.endereco.bairro && this.transportadora.endereco.bairro,
      rua: this.transportadora.endereco.rua && this.transportadora.endereco.rua,
      numero: this.transportadora.endereco.numero && this.transportadora.endereco.numero,
    });

  }

  atualizar() {

    const { nome, empresa, email, telefoneCodigo, telefoneNumero, celularCodigo, celularNumero,
      whatsAppCodigo, whatsAppNumero, modal, cep, estado, cidade, bairro, rua, numero } = this.formDeEdicao.value;

    const transportadora = new Transportadora({
      id: this.transportadora.id,
      nome,
      empresa,
      email,
      telefone: telefoneCodigo + telefoneNumero,
      celular: celularCodigo + celularNumero,
      whatsApp: whatsAppCodigo + whatsAppNumero,
      modal,
      endereco: new Endereco({
        cep,
        estado,
        cidade,
        bairro,
        rua,
        numero
      }),
    });

    this._service.atualizar(transportadora)
      .subscribe({
        next: () => this._snackBar.open('Atualizado com sucesso', '', { duration: 4000 }),
        error: err => this._snackBar.open('Erro ao tentar atualizar dados', '', { duration: 4000 })
      });
  }

  excluir() {
    this._service.iniciarExclusao(this.transportadora)
      .pipe(filter(res => !!res))
      .subscribe({
        next: () => this._router.navigate(['../..']),
      });
  }

}

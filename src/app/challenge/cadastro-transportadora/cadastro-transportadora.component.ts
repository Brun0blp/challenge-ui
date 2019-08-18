import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransportadoraService } from '../shared/transportadora.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Transportadora } from '../shared/model/transportadora';
import { Endereco } from '../shared/model/endereco';

@Component({
  selector: 'app-cadastro-transportadora',
  templateUrl: './cadastro-transportadora.component.html',
  styleUrls: ['./cadastro-transportadora.component.scss']
})
export class CadastroTransportadoraComponent {

  cadastroForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _service: TransportadoraService,
  ) {

    this.cadastroForm = this._fb.group({
      nome: ['', Validators.required],
      empresa: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', Validators.email],
      telefoneCodigo: ['', [Validators.required]],
      telefoneNumero: ['', [Validators.required]],
      celularCodigo: [''],
      celularNumero: [''],
      whatsAppCodigo: [''],
      whatsAppNumero: [''],
      modal: ['', Validators.required],
      cep: [''],
      estado: ['', Validators.required],
      cidade: ['', Validators.required],
      bairro: ['', Validators.required],
      rua: ['', Validators.required],
      numero: [null, [Validators.required, Validators.min(1)]],
      aceitarTermos: [false, Validators.required],
    });
  }

  cadastrar() {

    const { nome, empresa, email, telefoneCodigo, telefoneNumero, celularCodigo, celularNumero,
      whatsAppCodigo, whatsAppNumero, modal, cep, estado, cidade, bairro, rua, numero } = this.cadastroForm.value;

    const transportadora = new Transportadora({
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

    this._service.cadastrar(transportadora)
      .subscribe({
        next: transportadoraCadastrada => {
          alert('Cadastro feito');
          this.cadastroForm.reset();
        },
        error: err => console.log(err)
      });
  }

}

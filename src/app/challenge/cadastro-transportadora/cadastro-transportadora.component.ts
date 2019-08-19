import { Component, OnInit } from '@angular/core';
import { TransportadoraService } from '../shared/transportadora.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Transportadora } from '../shared/model/transportadora';
import { Endereco } from '../shared/model/endereco';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxViacepService, Endereco as EnderecoResp } from '@brunoc/ngx-viacep';
import { filter, debounceTime } from 'rxjs/operators';
import { listaUfs } from '../shared/model/tipo-uf.enum';

@Component({
  selector: 'app-cadastro-transportadora',
  templateUrl: './cadastro-transportadora.component.html',
  styleUrls: ['./cadastro-transportadora.component.scss']
})
export class CadastroTransportadoraComponent implements OnInit {

  formDeCadastro: FormGroup;

  listaDeUfs = listaUfs;

  constructor(
    private _fb: FormBuilder,
    private _service: TransportadoraService,
    private _validaCepService: NgxViacepService,
    private _snackBar: MatSnackBar
  ) {

    this.formDeCadastro = this._fb.group({
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
      cep: [null, [Validators.pattern('^[0-9]*$'), Validators.minLength(8)]],
      estado: [null, Validators.required],
      cidade: [null, Validators.required],
      bairro: [null, Validators.required],
      rua: [null, Validators.required],
      numero: [null, [Validators.required, Validators.min(1)]],
      aceitarTermos: [false, Validators.required],
    });
  }

  ngOnInit() {

    this.formDeCadastro.get('cep').valueChanges
      .pipe(debounceTime(1000))
      .pipe(filter(cep => !!cep))
      .subscribe(cep => {

        this._validaCepService.buscarPorCep(cep)
          .then((endereco: EnderecoResp) => this._setEndereco(endereco))
          .catch(err => {});
      });
  }
      
  private _setEndereco(endereco: any) {
    this.formDeCadastro.patchValue({
      bairro: endereco.bairro ? endereco.bairro : null,
      cidade: endereco.localidade ? endereco.localidade : null,
      rua: endereco.logradouro ? endereco.logradouro : null,
      estado: endereco.uf ? endereco.uf : null,
    }, { emitEvent: false });
  }

  cadastrar() {

    const { nome, empresa, email, telefoneCodigo, telefoneNumero, celularCodigo, celularNumero,
      whatsAppCodigo, whatsAppNumero, modal, cep, estado, cidade, bairro, rua, numero } = this.formDeCadastro.value;

    const transportadora = new Transportadora({
      nome,
      empresa,
      email,
      telefone: telefoneCodigo && telefoneNumero ? telefoneCodigo + telefoneNumero : null,
      celular: celularCodigo && celularNumero ? celularCodigo + celularNumero : null,
      whatsApp: whatsAppCodigo && whatsAppNumero ? whatsAppCodigo + whatsAppNumero : null,
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
          this._snackBar.open('Cadastro realizado com sucesso', '', { duration: 4000 });
          this.formDeCadastro.reset();
        },
        error: err => this._snackBar.open('Erro ao tentar cadastrar transportadora', '', { duration: 4000 })
      });
  }

}

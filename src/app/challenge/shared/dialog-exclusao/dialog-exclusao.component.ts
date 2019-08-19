import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogExclusaoService } from './dialog-exclusao.service';
import { Transportadora } from '../model/transportadora';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DadosDeEntrada {
  transportadora?: Transportadora;
}

@Component({
  selector: 'app-dialog-exclusao',
  templateUrl: './dialog-exclusao.component.html',
  styleUrls: ['./dialog-exclusao.component.scss']
})
export class DialogExclusaoComponent {

  transportadora: Transportadora;

  constructor(
    private _dialogRef: MatDialogRef<DialogExclusaoComponent>,
    private _service: DialogExclusaoService,
    @Inject(MAT_DIALOG_DATA) data: DadosDeEntrada,
    private _snackBar: MatSnackBar,
  ) {
    this.transportadora = data.transportadora;
  }

  excluir() {
    this._service.excluir(this.transportadora)
      .subscribe({
        next: () => {
          this._snackBar.open('Excluido com sucesso', '', { duration: 4000 });
          this._dialogRef.close(true);
        },
        error: err => this._snackBar.open('Algo deu errado', '', { duration: 4000 })
      });
  }

}

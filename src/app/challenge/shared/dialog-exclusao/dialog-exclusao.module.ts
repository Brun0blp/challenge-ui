import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogExclusaoComponent } from './dialog-exclusao.component';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogExclusaoService } from './dialog-exclusao.service';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [DialogExclusaoComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  entryComponents: [DialogExclusaoComponent],
  providers: [DialogExclusaoService]
})
export class DialogExclusaoModule { }

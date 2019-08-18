import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChallengeRoutingModule } from './challenge.routing';
import { ChallengeComponent } from './challenge.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TransportadoraService } from './shared/transportadora.service';
import { TransportadoraRepository } from './shared/transportadora.repository';
import { ItemListaTransportadoraComponent } from './item-lista-transportadora/item-lista-transportadora.component';
import { RouterModule } from '@angular/router';
import { CadastroTransportadoraComponent } from './cadastro-transportadora/cadastro-transportadora.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ChallengeRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  declarations: [ChallengeComponent, ItemListaTransportadoraComponent, CadastroTransportadoraComponent],
  providers: [
    TransportadoraService,
    TransportadoraRepository,
  ]
})
export class ChallengeModule { }

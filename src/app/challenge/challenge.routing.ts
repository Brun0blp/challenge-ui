import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChallengeComponent } from './challenge.component';
import { CadastroTransportadoraComponent } from './cadastro-transportadora/cadastro-transportadora.component';
import { EditarTransportadoraComponent } from './editar-transportadora/editar-transportadora.component';


const routes: Routes = [
  {
    path: '',
    component: ChallengeComponent,
  },
  {
    path: 'c',
    component: CadastroTransportadoraComponent,
  },
  {
    path: 'e/:transportadoraId',
    component: EditarTransportadoraComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallengeRoutingModule { }

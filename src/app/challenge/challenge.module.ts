import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChallengeRoutingModule } from './challenge.routing';
import { ChallengeComponent } from './challenge.component';


@NgModule({
  imports: [
    CommonModule,
    ChallengeRoutingModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  declarations: [ChallengeComponent],
})
export class ChallengeModule { }

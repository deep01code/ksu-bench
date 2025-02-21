import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalRoutingModule } from './approval-routing.module';
import {RouterModule} from '@angular/router';
import {NouisliderModule} from 'ng2-nouislider';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {TagInputModule} from 'ngx-chips';
import {MaterialModule} from '../app.module';
import {ChartsModule} from 'ng2-charts';
import { Gam709Component } from './components/gam709/gam709.component';
import {Gam709Service} from './services/gam709.service';

@NgModule({
  imports: [
    CommonModule,
      RouterModule.forChild(ApprovalRoutingModule),
      FormsModule,
      ChartsModule,
      HttpClientModule,
      MaterialModule,
      MatInputModule,
      HttpModule,
      ReactiveFormsModule,
      NouisliderModule,
      TagInputModule,
  ],
  declarations: [Gam709Component],
    providers: [Gam709Service]

})
export class ApprovalModule { }

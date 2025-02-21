import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import {CommonComponentsModule} from '../common-components/common-components.module';
import {HttpClientModule} from '@angular/common/http';
import {TableModule} from 'ngx-easy-table';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../app.module';
import {ViewDevicesComponent} from './view-devices/view-devices.component';
import {PlmRoutes} from './plm.routing';

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild(PlmRoutes),
      CommonComponentsModule,
      HttpClientModule,
      TableModule,
      FormsModule,
      MaterialModule
  ],
  declarations: [
      ViewDevicesComponent
  ],
  providers: [

  ]
})
export class PlmModule { }

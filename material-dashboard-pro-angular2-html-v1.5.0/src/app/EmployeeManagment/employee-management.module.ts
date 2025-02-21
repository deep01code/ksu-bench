import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee/component/employee.component';
import { RouterModule} from '@angular/router';
import {EmployeeManagementRoutes} from './employee-managment.routing';
import {CommonComponentsModule} from '../common-components/common-components.module';
import {HttpClientModule} from '@angular/common/http';
import {TableModule} from 'ngx-easy-table';
import { EmployeeHistoryComponent } from './employee-history/component/employee-history.component';
import {EmployeeManagementService} from './sharedService/employee-management.service';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../app.module';
import { ExceptionsComponent } from './Exceptions/component/exceptions.component';
import { ViewExceptionsComponent } from './view-exceptions/component/view-exceptions.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EmployeeManagementRoutes),
    CommonComponentsModule,
    HttpClientModule,
    TableModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
      EmployeeComponent,
      EmployeeHistoryComponent,
      ExceptionsComponent,
      ViewExceptionsComponent
  ],
  providers: [
      EmployeeManagementService
  ]
})
export class EmployeeManagementModule { }

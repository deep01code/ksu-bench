import { MatInputModule } from '@angular/material';
import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';
import {AttendanceRoutes} from './attendance.routing';
import { Gam50Component } from './components/gam50/gam50.component';
import { Gam50Service } from './services/gam50/gam50.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Forms } from '../forms/forms.module';
import {MaterialModule} from '../app.module';
import {TagInputModule} from 'ngx-chips';
import {NouisliderModule} from 'ng2-nouislider';
import { Gam51Component } from './components/gam51/gam51.component';
import { Gam52Component } from './components/gam52/gam52.component';
import { FormService } from './services/commonServices/formService/form-service.service';
import {FormComponent} from './components/commonComponents/form/form.component';
import {Gam52Service} from './services/gam52/gam52.service';
import { Gam64Service } from './services/gam64/gam64.service';
import { Gam64Component } from './components/gam64/gam64.component';
import {Formv2Service} from './services/commonServices/formService/formv2.service';
import { Gam238Component } from './components/gam238/gam238.component';
import {Formv2Component} from './components/commonComponents/formv2/formv2.component';
import {TokenInterceptorService} from '../services/token-interceptor/token-interceptor.service';
import { Gam704Component } from './gam704/gam704.component';
import {Gam704Service} from './gam704/gam704.service';
import { Gam788Component } from './components/gam788/gam788.component';
import {Gam788Service} from './services/gam788/gam788.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { Gam883Component } from './gam883/gam883.component';
import { ResponsibleFormComponent } from './gam883/responsible-form/responsible-form.component';
import { ProjectFormComponent } from './gam883/project-form/project-form.component';
import { BillingRoleFormComponent } from './gam883/billing-role-form/billing-role-form.component';
import { BudgetFormComponent } from './gam883/budget-form/budget-form.component';
import {Gam883Service} from './gam883/gam883.service';
import { ProgramFormComponent } from './program/program-form/program-form.component';
import { DepartmentFormComponent } from './program/department-form/department-form.component';
import { ProgramDetailsComponent } from './program/program-details/program-details.component';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AttendanceRoutes),
    FormsModule,
    Forms,
    ChartsModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    NouisliderModule,
    TagInputModule,
    MaterialModule,
    NgxPaginationModule,
    MatInputModule
  ],
  declarations: [
      Gam50Component,
      Gam51Component,
      Gam52Component,
      FormComponent,
      Formv2Component,
      Gam64Component,
      Gam238Component,
      Gam704Component,
      Gam788Component,
      Gam883Component,
      ResponsibleFormComponent,
      ProjectFormComponent,
      BillingRoleFormComponent,
      BudgetFormComponent,
      ProgramFormComponent,
      DepartmentFormComponent,
      ProgramDetailsComponent,
  ],
  providers: [
	  Gam50Service,
      Gam50Service,
      Gam52Service,
      Gam64Service,
      FormService,
      Formv2Service,
      Gam704Service,
      Gam788Service,
      Gam883Service,
      {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptorService,
          multi: true
      }
  ]
})

export class AttendanceServiceModule { }

import { SubContractComponent, SubContractDetails } from './components/project-management/sub-contract/sub-contract.component';
import { ProjectViewComponent } from './components/project-management/project-view/project-view.component';
import { ProjectApiService } from './services/project/project-api.service';
import { VendorContact } from 'app/PST/classes/vendor-contact';
import { LoVService } from './services/LoV/LoVService';
import { SystemDomainDetailsComponent } from './components/system-domain/system-domain-details/system-domain-details.component';
import { ProjectDetailsComponent, ContractDetails } from './components/project-management/project-details/project-details.component';
import { SystemDomainService } from './services/system-domain/system-domain.service';
import { SystemDomainComponent } from './components/system-domain/system-domain/system-domain.component';
import { VendorContactFormComponent } from './components/vendor-management/VendorContactForm/VendorContactForm.component';
import { VendorFormComponent } from './components/vendor-management/VendorForm/VendorForm.component';
import { VednorApisService } from './services/Vendor/VednorApis.service';
import { VendorDetailsComponent } from './components/vendor-management/VendorDetails/VendorDetails.component';
import { VendorMainViewComponent } from './components/vendor-management/VendorMainView/VendorMainView.component';
import { VendorProjectsViewComponent } from './components/vendor-management/VendorProjectsView/VendorProjectsView.component';
import { GdDetailsComponent } from './components/gd-management/gd-details/gd-details.component';
import { EmployeeDetailsComponent } from './components/employee/EmployeeDetails/EmployeeDetails.component';
import { ViewEmployeesComponent } from './components/employee/view-employees/view-employees.component';
import { GdManagementComponent, EditGeneralDepartment } from './components/gd-management/gd-management.component';
import { CreateEmployeeComponent } from './components/employee/CreateEmployee/CreateEmployee.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { PstRoutes } from './pst.routing';
import { MaterialModule } from '../app.module';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';
import { MatInputModule } from '@angular/material';
import { TokenInterceptorService } from '../services/token-interceptor/token-interceptor.service';
import { TableModule } from 'ngx-easy-table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {
  AddBenefits,
  UpsertAttendance,
  UpsertEmployeeComponent,
} from './components/edit-employee/upsert-employee.component';
import {EmployeeService} from "./services/Employee/employee.service";
import { ReportManagmentComponent } from './components/report-managment/report-managment.component';
import {AddAgreementComponent} from "../UserService/components/structure/entry-components/add-agreement/add-agreement.component";
import {UserServiceModule} from "../UserService/user-service.module";
import {StructureService} from "../UserService/services/structureServices/structure.service";
import {AddContactComponent} from "../UserService/components/structure/entry-components/add-contact/add-contact.component";
import { SiteUpdateComponent } from './components/site-update/site-update.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PstRoutes),
    FormsModule,
    ChartsModule,
    HttpClientModule,
    MaterialModule,
    MatInputModule,
    HttpModule,
    ReactiveFormsModule,
    NouisliderModule,
    TagInputModule,
    FormsModule,
    MatTooltipModule,
    MatDialogModule,


  ],
  declarations: [
    CreateEmployeeComponent,
    GdManagementComponent,
    ViewEmployeesComponent,
    EmployeeDetailsComponent,
    GdDetailsComponent,
    EditGeneralDepartment, 
    VendorMainViewComponent,
    VendorProjectsViewComponent, 
    VendorDetailsComponent,
    VendorFormComponent,
    VendorContactFormComponent, 
    SystemDomainComponent,
    SystemDomainDetailsComponent,
    ProjectDetailsComponent,
    ProjectViewComponent,
    ContractDetails,
    AddBenefits,
    UpsertAttendance,
    SubContractComponent,
    SubContractDetails,
    UpsertEmployeeComponent,
    ReportManagmentComponent,
    AddAgreementComponent,
    AddContactComponent,
    SiteUpdateComponent,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }, VednorApisService, 
    SystemDomainService,
    LoVService,
    ProjectApiService,
    EmployeeService,
    StructureService
  ],
  entryComponents: [EditGeneralDepartment,AddBenefits, ContractDetails, SubContractDetails,AddAgreementComponent,AddContactComponent,UpsertAttendance],

  exports:[
      VendorMainViewComponent,
    VendorProjectsViewComponent,
    VendorDetailsComponent,
    VendorFormComponent,
    VendorContactFormComponent,


  ]
})

export class PstModule { }
